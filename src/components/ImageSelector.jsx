import React, { useState, useCallback, useEffect } from 'react';
import Cropper from 'react-easy-crop';
import getCroppedImg from '../components/getCroppedImg';

function ImageSelector({ setSelectedImages, setRealTimeCroppedImage }) {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  // Handle image file selection
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
  };

  // Select an image to crop
  const handleSelectImage = (image) => {
    setSelectedImage(image);
  };

  // Capture the cropped area pixels
  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  // Real-time cropping preview
  useEffect(() => {
    const updateRealTimePreview = async () => {
      if (selectedImage && croppedAreaPixels) {
        const objectUrl = URL.createObjectURL(selectedImage);
        try {
          const croppedImage = await getCroppedImg(objectUrl, croppedAreaPixels);
          setRealTimeCroppedImage(croppedImage); 
        } catch (error) {
          console.error('Error while cropping the image in real-time:', error);
        } finally {
          URL.revokeObjectURL(objectUrl);
        }
      }
    };

    updateRealTimePreview();
  }, [selectedImage, croppedAreaPixels, setRealTimeCroppedImage]);

  // Finalize cropping and send to canvas
  const handleSendToCanvas = async () => {
    const objectUrl = URL.createObjectURL(selectedImage);
    try {
      const croppedImage = await getCroppedImg(objectUrl, croppedAreaPixels);
      setSelectedImages((prev) => [...prev, croppedImage]); 
      setRealTimeCroppedImage(null); 
      setSelectedImage(null); 
    } catch (error) {
      console.error('Error while cropping the image:', error);
    } finally {
      URL.revokeObjectURL(objectUrl);
    }
  };

  return (
    <div className="border p-4 rounded-lg shadow-lg">
      <label className="block mb-2">Select Images</label>
      <input
        type="file"
        multiple
        onChange={handleImageChange}
        className="mb-4 p-2 w-full border border-gray-300 rounded"
      />
      <div className="grid grid-cols-3 gap-4">
        {/* Display selected images */}
        {images.map((image, index) => (
          <img
            key={index}
            src={URL.createObjectURL(image)}
            alt={`img-${index}`}
            onClick={() => handleSelectImage(image)}
            className="w-full h-24 object-cover cursor-pointer hover:opacity-75"
          />
        ))}
      </div>

      {/* Cropper tool when an image is selected */}
      {selectedImage && (
        <div className="my-4">
          <h3 className="mb-2">Resize Selected Image</h3>
          <div className="relative w-full h-64 bg-gray-200">
            <Cropper
              image={URL.createObjectURL(selectedImage)}
              crop={crop}
              zoom={zoom}
              aspect={4 / 3}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
            />
          </div>
          <button
            onClick={handleSendToCanvas}
            className="bg-blue-500 text-white py-2 px-4 rounded mt-4"
          >
            Send to Canvas
          </button>
        </div>
      )}
    </div>
  );
}

export default ImageSelector;
