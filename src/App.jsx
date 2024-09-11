import React, { useState } from 'react';
import ImageSelector from '../src/components/ImageSelector';
import CanvasDisplay from '../src/components/CanvasDisplay';

function App() {
  const [selectedImages, setSelectedImages] = useState([]);
  const [realTimeCroppedImage, setRealTimeCroppedImage] = useState(null); // For real-time updates

  return (
    <div className="flex flex-col items-center py-8 bg-blue-600 text-white min-h-screen">
      <div className="w-full max-w-6xl flex flex-col lg:flex-row justify-between space-y-8 lg:space-y-0 lg:space-x-8">
        {/* Image Selector Component */}
        <div className="w-full bg-white text-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-6">Select and Resize Images</h2>
          <ImageSelector 
            setSelectedImages={setSelectedImages}
            setRealTimeCroppedImage={setRealTimeCroppedImage} // Pass real-time update function
          />
        </div>

        {/* Canvas Display Component */}
        <div className="w-full bg-white text-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-6">Canvas Display</h2>
          <CanvasDisplay 
            selectedImages={selectedImages}
            realTimeCroppedImage={realTimeCroppedImage} // Pass real-time cropped image
          />
        </div>
      </div>
    </div>
  );
}

export default App;
