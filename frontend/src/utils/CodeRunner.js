import axios from 'axios';

const API_KEY = `941c4ae924msh38f7827da41851dp1c30e3jsn1cbef3be8a42`;
const API_BASE_URL = `https://onecompiler-apis.p.rapidapi.com/api/v1`;

/*
  singleRun -> single source-code executed for single input 
  eg. sourceCode: #include <stdio.h> int main() {int num; scanf("%d", &num); printf("num = %d", num);}
      input: 4

  batchRun -> single source-code executed for multiple inputs, and outputs are array of objs
    sourceCode: same...
    input: [4, 5, 2]

*/

async function singleRun(language, fileName, sourceCode, input) {
    //console.log(API_KEY);
    const options = {
        method: 'POST',
        url: `${API_BASE_URL}/run`,
        headers: {
          'x-rapidapi-key': `${API_KEY}`,
          'x-rapidapi-host': 'onecompiler-apis.p.rapidapi.com',
          'Content-Type': 'application/json'
        },
        data: {
          language: language,
          stdin: input,
          files: [
            {
              name: fileName,
              content: sourceCode
            }
          ]
        }
    };
    
    
    const response = await axios.request(options);
    return response.data;
}

async function batchRun(language, inputs, sourceCode, fileName) {

  const options = {
    method: 'POST',
    url: `${API_BASE_URL}/run`,
    headers: {
      'x-rapidapi-key': `${API_KEY}`,
      'x-rapidapi-host': 'onecompiler-apis.p.rapidapi.com',
      'Content-Type': 'application/json'
    },
    data: {
      language: language,
      stdin: inputs, //[input1, intput2, etc..]
      files: [
        {
          name: fileName,
          content: sourceCode
        }
      ]
    }
  };

  const response = await axios.request(options);
  return response.data; // [output1, output2, output3]
} 

export {singleRun, batchRun};