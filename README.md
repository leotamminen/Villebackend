# Villebackend

Mockup backend for the ViLLEPlug VSCode extension.

The backend is hosted on Vercel:  
[https://villebackend.vercel.app](https://villebackend.vercel.app)

Any changes to `main` branch are automatically deployed to Vercel.

## Installation

### Dependencies

To run the backend locally, install dependencies:

```bash
npm install express
npm install typescript ts-node @types/node @types/express --save-dev
```

If you're deploying to Vercel, you'll also need:

```bash
npm install --save @vercel/node
```

Make sure you also have node installed.

### Running Locally

Clone the repository:

```bash
git clone https://github.com/leotamminen/Villebackend
```

Navigate to the project directory:

```bash
cd Villebackend
```

Install dependencies:

```bash
npm install
npm install typescript ts-node @types/node @types/express --save-dev
```

Start the development server:

```bash
npm run dev
```

And go to `localhost:3000/`

## Navigating the Backend

### URL Endpoints

Here are examples of how to interact with the backend:

- **List all courses:**  
  [https://villebackend.vercel.app/courses](https://villebackend.vercel.app/courses)

- **Get a specific course:**  
  [https://villebackend.vercel.app/courses/1](https://villebackend.vercel.app/courses/1)

- **List all exercises for a specific course:**  
  [https://villebackend.vercel.app/courses/1/exercises](https://villebackend.vercel.app/courses/1/exercises)

- **Get a specific exercise by course and exercise ID (e.g., course 1, exercise 101):**  
  [https://villebackend.vercel.app/courses/1/exercises/101](https://villebackend.vercel.app/courses/1/exercises/101)
