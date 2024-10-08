import React, { useState } from 'react';
import ImageSelector from '../src/components/ImageSelector';
import CanvasDisplay from '../src/components/CanvasDisplay';

function App() {
  const [selectedImages, setSelectedImages] = useState([]);
  const [realTimeCroppedImage, setRealTimeCroppedImage] = useState(null); 

  return (
    <div className="flex flex-col items-center py-8 bg-blue-600 text-white min-h-screen">
      <div className="w-full max-w-8xl flex flex-col lg:flex-row justify-between space-y-8 lg:space-y-0 lg:space-x-8">
        {/* Image Selector Component */}
        <div className="w-full bg-white text-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-6">Select and Resize Images</h2>
          <ImageSelector 
            setSelectedImages={setSelectedImages}
            setRealTimeCroppedImage={setRealTimeCroppedImage} 
          />
        </div>

        {/* Canvas Display Component */}
        <div className="w-full bg-white text-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-6">Canvas Display</h2>
          <CanvasDisplay 
            selectedImages={selectedImages}
            realTimeCroppedImage={realTimeCroppedImage} 
          />
        </div>
      </div>
    </div>
  );
}

export default App;
