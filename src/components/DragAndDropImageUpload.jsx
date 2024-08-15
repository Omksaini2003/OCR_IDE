import React, { useState, useEffect } from 'react';

const DragAndDropImageUpload = ({ imageFile, setImageFile, handleExtract }) => {
	const [image, setImage] = useState(imageFile ? URL.createObjectURL(imageFile) : null);
	const [error, setError] = useState('');

	useEffect(() => {
		if (imageFile) {
			const reader = new FileReader();
			reader.onload = (e) => {
				setImage(e.target.result);
				setError('');
			};
			reader.readAsDataURL(imageFile);
		} else {
			setImage(null);
		}
	}, [imageFile]);

	const handleDrop = (e) => {
		e.preventDefault();
		const files = e.dataTransfer.files;
		handleFiles(files);
	};

	const handleDragOver = (e) => {
		e.preventDefault();
	};

	const handleRemoveImage = (e) => {
		e.stopPropagation();
		setImage(null);
		setImageFile(null);
		setError('');
	};

	const handleClick = () => {
		if (!imageFile) {
			document.getElementById('fileInput').click();
		}
	};

	const handleFileInputChange = (e) => {
		const files = e.target.files;
		handleFiles(files);
	};

	const handleFiles = (files) => {
		if (files.length > 0) {
			const file = files[0];
			if (file.type.startsWith('image/')) {
				setImageFile(file);
			} else {
				setError('Please select an image file.');
			}
		}
	};

	return (
		<div
			onDrop={handleDrop}
			onDragOver={handleDragOver}
			onClick={handleClick}
			style={{
				width: '100%',
				height: '200px',
				border: '2px dashed #ccc',
				borderRadius: '10px',
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
				textAlign: 'center',
				padding: '20px',
				margin: '20px auto',
				cursor: 'pointer',
				backgroundColor: '#f9f9f9',
				position: 'relative',
			}}
		>
			<input
				id="fileInput"
				type="file"
				accept="image/*"
				onChange={handleFileInputChange}
				style={{ display: 'none' }}
			/>
			{image && (
				<button
					onClick={handleRemoveImage}
					style={{
						position: 'absolute',
						top: '5px',
						right: '5px',
						background: 'rgba(255, 255, 255, 0.7)',
						border: 'none',
						borderRadius: '50%',
						width: '40px',
						height: '40px',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						cursor: 'pointer',
						fontSize: '35px',
						fontWeight: 'bold',
						color: 'red',
					}}
				>
					×
				</button>
			)}
			{image ? (
				<img
					src={image}
					alt="Uploaded"
					style={{ maxWidth: '100%', maxHeight: '100%' }}
				/>
			) : (
				<p style={{color:'black'}}>Drag & drop an image here, or click to select</p>
			)}
			{error && <p style={{ color: 'red' }}>{error}</p>}
		</div>
	);
};

export default DragAndDropImageUpload;