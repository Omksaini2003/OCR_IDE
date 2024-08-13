import Tesseract from 'tesseract.js';

export async function extractTextFromImage(imageFile: File): Promise<string> {
      const result = await Tesseract.recognize(imageFile, 'eng', {
            logger: m => console.log(m)
      });

      const cleanText = result.data.paragraphs
            .map(p => p.text.trim())
            .join('\n\n');

      return cleanText;
}