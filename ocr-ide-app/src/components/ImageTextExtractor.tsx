import React, { useState } from 'react';
import { extractTextFromImage } from '../utility/textExtractor';

interface ImageTextExtractorProps {
      onExtractComplete: (text: string) => void;
}

const ImageTextExtractor: React.FC<ImageTextExtractorProps> = ({ onExtractComplete }) => {
      const [imageFile, setImageFile] = useState<File | null>(null);
      const [isLoading, setIsLoading] = useState(false);

      const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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