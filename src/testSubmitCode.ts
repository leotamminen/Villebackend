import axios from "axios";
import { checkSubmission } from "./check_function";

/*
The courseId and exerciseId for testing.
submittedCode `const x = 10;\\nconsole.log(x);`
is correct atm for courseId = 1; exerciseId = 102; ...

For example `const x = 10;\\nconsole.log(x); K`
gives partial,
`const x = Incorrect code`
gives incorrect. etc
*/

// This can be changed for testing with different exercises
const courseId = 1;
const exerciseId = 102;

// This can be changed also
const submittedCode = `
const x = 10;\\nconsole.log(x);
`;

interface Exercise {
  id: number;
  name: string;
  description: string;
  programmingLanguage: string;
  Exercise_code: string;
  Submitted_code: string;
}

async function submitCode(): Promise<void> {
  try {
    // Make a PUT request to the backend to submit the code
    const response = await axios.put(
      `http://localhost:3000/courses/${courseId}/exercises/${exerciseId}/submit`,
      {
        submittedCode: submittedCode,
      }
    );

    // Log the response from the server
    console.log("Response:", response.data);

    // Test the submitted code against the correct answer
    await testCheck(exerciseId, submittedCode);
  } catch (error: any) {
    // Handle errors
    if (error.response) {
      console.error("Error Response:", error.response.data);
    } else {
      console.error("Error:", error.message);
    }
  }
}

// Call the function to submit the code
submitCode();

async function testCheck(exerciseId: number, submittedCode: string) {
  console.log(`Testing submitted code for exercise ID ${exerciseId}...`);
  const result = await checkSubmission(exerciseId, submittedCode);
  console.log("Check result:", result);
}
