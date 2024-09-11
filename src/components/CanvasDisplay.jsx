import React from 'react';

function CanvasDisplay({ selectedImages, realTimeCroppedImage }) {
  return (
    <div className="border p-4 rounded-lg shadow-lg">
      <div className="flex flex-wrap gap-4">
        {/* If no images are selected */}
        {selectedImages.length === 0 && !realTimeCroppedImage && (
          <p className="text-gray-500">No images selected</p>
        )}

        {/* Display real-time cropped image if it hasn't been added to selectedImages */}
        {realTimeCroppedImage && (
          <div className="relative">
            <img
              src={realTimeCroppedImage}
              alt="cropped-preview"
              className={`w-48 h-48 object-cover`}
            />
          </div>
        )}

        {/* Render the final selected/cropped images */}
        {selectedImages.map((image, index) => (
          <div key={index} className="relative">
            <img
              src={image}
              alt={`canvas-img-${index}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default CanvasDisplay;
