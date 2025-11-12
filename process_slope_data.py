import rasterio
import numpy as np
from geojson import Feature, FeatureCollection, Polygon
import os
from rasterio.windows import Window
from rasterio.warp import transform_bounds
from scipy import ndimage

# Vail resort approximate bounds (in WGS84/EPSG:4326)
VAIL_BOUNDS = {
    'left': -106.40828513505717,    # Western longitude
    'right': -106.27695356082792,   # Eastern longitude
    'bottom': 39.555240257396434,    # Southern latitude
    'top': 39.65331863419732        # Northern latitude
}

def calculate_slope(elevation, cell_size_meters=30):
    """Calculate slope angles from elevation data."""
    # Fill NaN values with interpolated values from surrounding cells
    elevation_filled = ndimage.gaussian_filter(
        np.nan_to_num(elevation, nan=np.nanmean(elevation)), sigma=1)
    
    dy, dx = np.gradient(elevation_filled, cell_size_meters)
    slope = np.degrees(np.arctan(np.sqrt(dx*dx + dy*dy)))
    return slope

def slope_to_color(slope_angle):
    """Convert slope angle to color and opacity based on steepness."""
    if slope_angle > 17:
        return "#cc0000", 0.4  # Double black (>17°)
    elif slope_angle > 10:
        return "#000000", 0.35  # Black (10-17°)
    elif slope_angle > 5:
        return "#4444ff", 0.3  # Blue (5-10°)
    elif slope_angle > 2:
        return "#44aa44", 0.25  # Green (2-5°)
    else:
        return "#88cc88", 0.2  # Very gentle (<2°)

def get_window_from_bounds(src, bounds):
    """Convert geographic bounds to pixel window"""
    # Get the transform matrix
    transform = src.transform
    
    # Convert bounds to pixel coordinates
    col_start, row_start = ~transform * (bounds['left'], bounds['top'])
    col_end, row_end = ~transform * (bounds['right'], bounds['bottom'])
    
    # Convert to integers
    col_start, col_end = int(col_start), int(col_end)
    row_start, row_end = int(row_start), int(row_end)
    
    # Ensure correct order
    col_start, col_end = min(col_start, col_end), max(col_start, col_end)
    row_start, row_end = min(row_start, row_end), max(row_start, row_end)
    
    # Create window
    window = Window(col_start, row_start, 
                   col_end - col_start,
                   row_end - row_start)
    
    return window

def process_slopes(input_tif, output_js, cell_size=5):
    """Process slope data from TIF into GeoJSON features."""
    print("Starting slope processing...")
    
    with rasterio.open(input_tif) as src:
        print("\nTIF file metadata:")
        print(f"Driver: {src.driver}")
        print(f"Shape: {src.shape}")
        print(f"Bounds: {src.bounds}")
        print(f"CRS: {src.crs}")
        
        # Get the window for Vail area
        print("\nCropping to Vail resort area...")
        window = get_window_from_bounds(src, VAIL_BOUNDS)
        
        # Read only the data within the window
        elevation_data = src.read(1, window=window)
        transform = src.window_transform(window)
        
        print(f"Cropped shape: {elevation_data.shape}")
        print("\nElevation statistics:")
        print(f"Min elevation: {np.nanmin(elevation_data):.2f}m")
        print(f"Max elevation: {np.nanmax(elevation_data):.2f}m")
        print(f"Mean elevation: {np.nanmean(elevation_data):.2f}m")
        
        # Calculate slope angles
        print("\nCalculating slopes...")
        slope_data = calculate_slope(elevation_data)
        
        features = []
        rows, cols = slope_data.shape
        
        # Track slope statistics
        all_slopes = []
        feature_count = 0
        
        # Process in chunks
        for i in range(0, rows, cell_size):
            if i % 100 == 0:  # Progress indicator
                print(f"Processing row {i}/{rows}")
                
            for j in range(0, cols, cell_size):
                # Get average slope for this cell
                cell = slope_data[i:i+cell_size, j:j+cell_size]
                if cell.size == 0:
                    continue
                    
                avg_slope = np.mean(cell)  # Use mean instead of nanmean to ensure coverage
                if np.isnan(avg_slope):
                    avg_slope = 0  # Default to flat for truly invalid data
                
                all_slopes.append(avg_slope)
                
                # Get coordinates for cell corners
                x1, y1 = transform * (j, i)
                x2, y2 = transform * (j + cell_size, i + cell_size)
                
                # Create polygon coordinates
                coords = [[
                    [x1, y1],
                    [x2, y1],
                    [x2, y2],
                    [x1, y2],
                    [x1, y1]
                ]]
                
                color, opacity = slope_to_color(avg_slope)
                
                # Create feature
                feature = Feature(
                    geometry=Polygon(coords),
                    properties={
                        "steepness": float(avg_slope),
                        "color": color,
                        "opacity": opacity
                    }
                )
                features.append(feature)
                feature_count += 1
                
                # Print debug info every 1000 features
                if feature_count % 1000 == 0:
                    print(f"Created {feature_count} features...")
        
        # Print slope statistics
        if all_slopes:
            print(f"\nFinal slope statistics:")
            print(f"Min slope: {min(all_slopes):.2f}°")
            print(f"Max slope: {max(all_slopes):.2f}°")
            print(f"Average slope: {np.mean(all_slopes):.2f}°")
            print(f"Number of features created: {len(features)}")
            
            # Print distribution
            for threshold in [10, 20, 30, 40]:
                count = sum(1 for s in all_slopes if s > threshold)
                percent = (count / len(all_slopes)) * 100
                print(f"Slopes > {threshold}°: {count} ({percent:.1f}%)")
        
        # Create FeatureCollection
        print("\nCreating GeoJSON FeatureCollection...")
        feature_collection = FeatureCollection(features)
        
        # Write to JavaScript file
        print(f"Writing to {output_js}...")
        with open(output_js, 'w') as f:
            f.write('const slopeData = ')
            f.write(str(feature_collection).replace("'", '"'))
            f.write(';')
        
        print("Done! File has been written.")

if __name__ == '__main__':
    script_dir = os.path.dirname(os.path.abspath(__file__))
    input_file = os.path.join(script_dir, 'output_USGS10m.tif')
    output_file = os.path.join(script_dir, 'Data', 'slopeData.js')
    
    print(f"Processing slope data...")
    print(f"Reading from: {input_file}")
    print(f"Writing to: {output_file}")
    
    process_slopes(input_file, output_file) 