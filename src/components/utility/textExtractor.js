import Tesseract from 'tesseract.js';

export async function extractTextFromImage(imageFile) {
      const result = await Tesseract.recognize(imageFile, 'eng', {
            logger: m => console.log(m)
      });

      const cleanText = result.data.paragraphs
            .map(p => p.text.trim())
            .join('\n');

      return cleanText;
}
