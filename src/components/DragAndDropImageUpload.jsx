import React, { useState } from 'react';

const DragAndDropImageUpload = ({setImageFile}) => {
  const [image, setImage] = useState(null);
  const [error, setError] = useState('');

  const handleDrop = (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;

    if (files.length > 0) {
      const file = files[0];
      if (file.type.startsWith('image/')) {
        setImageFile(file);
        const reader = new FileReader();
        reader.onload = (e) => {
          setImage(e.target.result);
          setError('');
        };
        reader.readAsDataURL(file);
      } else {
        setError('Please drop an image file.');
      }
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      style={{
        width: '300px',
        height: '200px',
        border: '2px dashed #ccc',
        borderRadius: '10px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '20px',
        margin: '20px auto',
        cursor: 'pointer',
        backgroundColor: '#f9f9f9',
      }}
    >
      {image ? (
        <img
          src={image}
          alt="Uploaded"
          style={{ maxWidth: '100%', maxHeight: '100%' }}
        />
      ) : (
        <p>Drag & drop an image here, or click to select</p>
      )}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default DragAndDropImageUpload;
