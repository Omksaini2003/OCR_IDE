import React, { useRef, useState } from 'react'
import { Box, HStack } from '@chakra-ui/react'
import { Editor } from "@monaco-editor/react"
import LanguageSelector from "./LanguageSelector"
import { CODE_SNIPPETS } from '../constants'
import Output from './Output'
import ImageTextExtractor from './ImageTextExtractor'


const CodeEditor = () => {
	const editorRef = useRef()
	const [language, setLanguage] = useState("python");
	const [value, setValue] = useState('');

	// const [extractedText, setExtractedText] = useState('');


	const onMount = (editor) => {
		editorRef.current = editor;
		editor.focus();
		console.log(editorRef.current);
	}

	const onSelect = (language) => {
		setLanguage(language);
		// setValue(CODE_SNIPPETS[language])
	}

	return (
		<Box>
			<ImageTextExtractor onExtractComplete={setValue} />
			<HStack>
				<Box w="50%">
					<LanguageSelector language={language} onSelect={onSelect} />
					<Editor
						height="75vh"
						theme="vs-dark"
						// path={file.name}
						language={language}
						// defaultValue={snippet.language}
						onMount={onMount}
						value={value}
						onChange={(value) => setValue(value)}
					/>
				</Box>
				<Output editorRef={editorRef} language={language} />
			</HStack>

		</Box>
	)
}

export default CodeEditor