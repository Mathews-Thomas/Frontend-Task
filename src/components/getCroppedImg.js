export const getCroppedImg = (imageSrc, croppedAreaPixels) => {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.src = imageSrc;
  
      image.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
  
        // Set the canvas dimensions based on the cropped area
        canvas.width = croppedAreaPixels.width;
        canvas.height = croppedAreaPixels.height;
  
        // Draw the image on the canvas at the specified cropped area
        ctx.drawImage(
          image,
          croppedAreaPixels.x,
          croppedAreaPixels.y,
          croppedAreaPixels.width,
          croppedAreaPixels.height,
          0,
          0,
          croppedAreaPixels.width,
          croppedAreaPixels.height
        );
  
        // Convert canvas to Blob and return the URL
        canvas.toBlob((blob) => {
          resolve(URL.createObjectURL(blob));
        }, 'image/jpeg');
      };
  
      // Handle image loading errors
      image.onerror = (error) => {
        reject(new Error("Failed to load the image: " + error));
      };
    });
  };
  export default getCroppedImg
  