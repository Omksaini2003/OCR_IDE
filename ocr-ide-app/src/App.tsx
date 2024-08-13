import React, { useState } from 'react';
import './App.css';
import ImageTextExtractor from './components/ImageTextExtractor';

const App: React.FC = () => {
	const [extractedText, setExtractedText] = useState('');

	return (
		<div className="grid grid-rows-2 bg-white justify-center">
			<div className='row-span-1 bg-black'>
				<ImageTextExtractor onExtractComplete={setExtractedText} />
			</div>
			<div className='row-span-1'>
				<div className="text-editor" contentEditable="true" style={{ textAlign: 'left' }}>
					<pre style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
						{extractedText}
					</pre>
				</div>
			</div>
		</div>
	);
};

export default App;