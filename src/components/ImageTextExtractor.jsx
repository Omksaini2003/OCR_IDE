import React, { useEffect, useState } from 'react';
import { extractTextFromImage } from './utility/textExtractor';
import SnippingTool from './SnippingTool';
import DragAndDropImageUpload from './DragAndDropImageUpload';

const ImageTextExtractor = ({onExtractComplete }) => {
      // const [draggedImageFile, setDraggedImageFile] = useState(null);
      const [imageFile, setImageFile] = useState(null);
      const [isLoading, setIsLoading] = useState(false);

      // useEffect(() => {
      //       if (draggedImageFile) {
      //             setImageFile(draggedImageFile);
      //       }
      // },[draggedImageFile]);

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
                  <DragAndDropImageUpload setImageFile={setImageFile} />
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
