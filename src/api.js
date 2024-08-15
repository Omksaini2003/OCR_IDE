// import axios from 'axios';
// import { LANGUAGE_VERSIONS } from "./constants";

// const API = axios.create({
//     baseURL: "https://emkc.org/api/v2/piston",
// });

// export const executeCode = async (language, sourceCode) => {
//     try {
//         const response = await API.post("/execute", {
//             language: language,
//             version: LANGUAGE_VERSIONS[language],
//             files: [
//                 {
//                     content: sourceCode,
//                 }
//             ],
//         });
//         return response.data;
//     } catch (error) {
//         console.error("Error executing code:", error);
//         throw error; // Rethrow the error to be handled by the calling function
//     }
// };

import axios from 'axios';
import { LANGUAGE_VERSIONS } from "./constants";

const API = axios.create({
    baseURL: "https://emkc.org/api/v2/piston",
});

export const executeCode = async (language, sourceCode, input = "") => {
    try {
        const response = await API.post("/execute", {
            language: language,
            version: LANGUAGE_VERSIONS[language],
            files: [
                {
                    content: sourceCode,
                }
            ],
            stdin: input, // Pass the input data here
        });
        return response.data;
    } catch (error) {
        console.error("Error executing code:", error);
        throw error; // Rethrow the error to be handled by the calling function
    }
};
