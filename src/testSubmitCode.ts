import axios from 'axios';

// The courseId and exerciseId you want to test with
const courseId = 1; // Replace with your actual course ID
const exerciseId = 102; // Replace with your actual exercise ID

// The code you want to submit
const submittedCode = `
console.log("Submitted code");
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
    const response = await axios.put(`http://localhost:3000/courses/${courseId}/exercises/${exerciseId}/submit`, {
      submittedCode: submittedCode,
    });

    // Log the response from the server
    console.log('Response:', response.data);
  } catch (error: any) {
    // Handle errors
    if (error.response) {
      console.error('Error Response:', error.response.data);
    } else {
      console.error('Error:', error.message);
    }
  }
}

// Call the function to submit the code
submitCode();
