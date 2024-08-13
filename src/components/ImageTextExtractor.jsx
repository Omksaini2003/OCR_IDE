import React, { useState } from 'react';
import { extractTextFromImage } from './utility/textExtractor';

const ImageTextExtractor = ({ onExtractComplete }) => {
      const [imageFile, setImageFile] = useState(null);
      const [isLoading, setIsLoading] = useState(false);

      const handleImageChange = (e) => {
            if (e.target.files && e.target.files[0]) {
                  setImageFile(e.target.files[0]);
            }
      };

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

      return (
            <div>
                  <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        disabled={isLoading}
                  />
                  <button
                        onClick={handleExtract}
                        disabled={isLoading || !imageFile}
                  >
                        {isLoading ? 'Extracting...' : 'Extract Text'}
                  </button>
            </div>
      );
};

export default ImageTextExtractor;
