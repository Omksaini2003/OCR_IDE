import React, { useState } from 'react';
import { extractTextFromImage } from './utility/textExtractor';
import DragAndDropImageUpload from './DragAndDropImageUpload';

const ImageTextExtractor = ({ onExtractComplete }) => {
      const [imageFile, setImageFile] = useState(null);
      const [isLoading, setIsLoading] = useState(false);

      const handleExtract = async () => {
            if (!imageFile) {
                  alert('Please select an image first.');
                  return;
            }

            setIsLoading(true);
            try {
                  const text = await extractTextFromImage(imageFile);
                  onExtractComplete(text);
            } catch (error) {
                  console.error('Error extracting text:', error);
                  onExtractComplete('Error extracting text. Please try again.');
            } finally {
                  setIsLoading(false);
            }
      };

      const handleImageFileChange = (file) => {
            setImageFile(file);
      };

      return (
            <div style={{ color: 'white' }}>
                  <DragAndDropImageUpload
                        setImageFile={handleImageFileChange}
                        imageFile={imageFile}
                        handleExtract={handleExtract}
                  />
                  <button
                        onClick={handleExtract}
                        disabled={isLoading || !imageFile}
                  >
                        {isLoading ? 'Extracting...' : ' Extract Text '}
                  </button>
            </div>
      );
};

export default ImageTextExtractor;