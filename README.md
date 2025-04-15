## Prerequisites

1. Ensure you are using Node.js version 20.14.0 before proceeding. Check your version using node -v. If needed, update Node.js to the correct version.
2. Install and use Visual Studio Code as the code editor.

## Getting Started

1. Clone the repository using git clone https://github.com/Espire-Infolabs-India/Espire-contentful-accelerator.git and navigate to the project directory "Espire-contentful-accelerator".
2. Open the folder "Espire-contentful-accelerator" in Visual Studio Code manually or by running the command "code ." in the terminal.
3. Open the terminal in Visual Studio Code and install the required dependencies by running npm install.
4. Run the development server by exceutig the command

npm run dev

Open [http://localhost:3000] with your browser to see the result.

## Developer Guidelines

When creating a new component, always:

Create a folder inside the components directory named exactly after the component.

Inside that folder, create the component file as ComponentName.tsx.

Register the component and its corresponding content type inside the ComponentFactory located under the lib directory.

This ensures consistency, proper component resolution, and maintainability across the codebase.