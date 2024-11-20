export const exercises: {
  [key: number]: {
    id: number;
    name: string;
    description: string;
    programmingLanguage: string;
    Exercise_code: string;
    Submitted_code: string;
  }[];
} = {
  1: [
    {
      id: 101,
      name: "Hello World",
      description: 'Write a program that prints "Hello, World!"',
      programmingLanguage: "JavaScript",
      Exercise_code: 'console.log("Hello, World!");',
      Submitted_code: "",
    },
    {
      id: 102,
      name: "Variables and Types",
      description:
        "Declare variables of different types and log them to the console",
      programmingLanguage: "JavaScript",
      Exercise_code: `const name = "John";\nconst age = 25;\nconsole.log(name, age);`,
      Submitted_code: "",
    },
  ],
  2: [
    {
      id: 201,
      name: "Asynchronous Code",
      description: "Write a function that fetches data asynchronously",
      programmingLanguage: "JavaScript",
      Exercise_code: `async function fetchData() {\n  const response = await fetch('https://api.example.com');\n  return response.json();\n}`,
      Submitted_code: "",
    },
  ],
  3: [
    {
      id: 301,
      name: "Basic Python Script",
      description: 'Write a Python script that prints "Hello from Python!"',
      programmingLanguage: "Python",
      Exercise_code: 'print("Hello from Python!")',
      Submitted_code: "",
    },
    {
      id: 302,
      name: "Sum Two Numbers",
      description:
        "Write a Python function that sums two numbers and returns the result",
      programmingLanguage: "Python",
      Exercise_code: `def sum_two_numbers(a, b):\n    return a + b\n\nprint(sum_two_numbers(3, 5))`,
      Submitted_code: "",
    },
  ],
  4: [
    {
      id: 401,
      name: "Build a Simple HTML Page",
      description: "Create a simple HTML page with a heading and a paragraph",
      programmingLanguage: "HTML",
      Exercise_code: `<html>\n  <head>\n    <title>Simple Page</title>\n  </head>\n  <body>\n    <h1>Hello, World!</h1>\n    <p>Welcome to my simple page.</p>\n  </body>\n</html>`,
      Submitted_code: "",
    },
    {
      id: 402,
      name: "Basic CSS Styling",
      description: "Write a CSS file that styles a heading and a paragraph",
      programmingLanguage: "CSS",
      Exercise_code: `h1 {\n  color: blue;\n}\n\np {\n  font-size: 16px;\n  color: gray;\n}`,
      Submitted_code: "",
    },
  ],
};
