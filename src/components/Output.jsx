// import { Box, Button, Text, useToast } from '@chakra-ui/react'
// import React from 'react'
// import { executeCode } from '../api';

// const Output = ({editorRef,language}) => {
//     const toast=useToast();
//     const [output, setOutput] = React.useState(null)
//     const [loading, setLoading] = React.useState(false)
//     const [isError, setIsError] = React.useState(false)
//     const runCode=async()=>{
//         const sourceCode = editorRef.current.getValue();
//         if(!sourceCode) return;
//         try {
//             setLoading(true);
//             const {run:result}=await executeCode(language,sourceCode)
//             setOutput(result.output.split("\n"))
//             result.stderr? setIsError(true):setIsError(false)
//         } catch (error) {
//             console.log(error);
//             toast({
//                 title: 'An Error Occured',
//                 description:error.message || "Unable to Run Code",
//                 status:"error",
//                 duration: 6000,
//             })
//         }
//         finally{
//             setLoading(false);
//         }
//     }



//   return (
//     <Box w="50%">
//         <Text mb={2} fontSize="lg">
//            Output 
//         </Text>
//         <Button 
//         variant="outline"
//         colorScheme='green'
//         mb={4}  
//         isLoading={loading}
//         onClick={runCode}      
//         >
//             Run Code
//         </Button>
//         <Box height="75vh"
//         p={2}
//         color={isError?"red.400":""}
//         border="1px solid"
//         borderRadius={4}
//         borderColor={isError?"red.500":"#333"}
//         >
//            {
//             output?
//             output.map((line,index)=><Text key={index}>{line}</Text>)
//             : "Click \"Run Code\" to  see Output"
//            }

//         </Box>
//     </Box>
//   )
// }

// export default Output



import { Box, Button, Text, useToast } from '@chakra-ui/react'
import React from 'react'
import { executeCode } from '../api';

const Output = ({ editorRef, language, input }) => {
    const toast = useToast();
    const [output, setOutput] = React.useState(null)
    const [loading, setLoading] = React.useState(false)
    const [isError, setIsError] = React.useState(false)

    const runCode = async () => {
        const sourceCode = editorRef.current.getValue();
        if (!sourceCode) return;
        try {
            setLoading(true);
            const { run: result } = await executeCode(language, sourceCode, input) // Pass input to the execution function
            setOutput(result.output.split("\n"))
            result.stderr ? setIsError(true) : setIsError(false)
        } catch (error) {
            console.log(error);
            toast({
                title: 'An Error Occurred',
                description: error.message || "Unable to Run Code",
                status: "error",
                duration: 6000,
            })
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <Box w="50%">
            <Text mb={2} fontSize="lg">
                Output
            </Text>
            <Button
                variant="outline"
                colorScheme='green'
                mb={4}
                isLoading={loading}
                onClick={runCode}
            >
                Run Code
            </Button>
            <Box height="75vh"
                p={2}
                color={isError ? "red.400" : ""}
                border="1px solid"
                borderRadius={4}
                borderColor={isError ? "red.500" : "#333"}
            >
                {
                    output ?
                        output.map((line, index) => <Text key={index}>{line}</Text>)
                        : "Click \"Run Code\" to see Output"
                }

            </Box>
        </Box>
    )
}

export default Output;
