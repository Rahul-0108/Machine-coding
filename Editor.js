// App.jsx
import React, { useState } from "react";
import Editor from "@monaco-editor/react";

const initialFiles = {
  "index.js": {
    name: "index.js",
    language: "javascript",
    content: "console.log('Hello world');"
  },
  "style.css": {
    name: "style.css",
    language: "css",
    content: "body { background-color: #f0f0f0; }"
  },
  "readme.md": {
    name: "readme.md",
    language: "markdown",
    content: "# Welcome to Monaco File Editor"
  }
};

export default function CodeEditor() {
  const [files, setFiles] = useState(initialFiles);
  const [currentFile, setCurrentFile] = useState("index.js");

  const handleEditorChange = (value) => {
    setFiles((prevFiles) => ({
      ...prevFiles,
      [currentFile]: {
        ...prevFiles[currentFile],
        content: value
      }
    }));
  };

  return (
    <div style={{ display: "flex", height: "100vh", fontFamily: "sans-serif" }}>
      {/* File Explorer */}
      <div style={{ width: "200px", borderRight: "1px solid #ccc", padding: "0.5rem" }}>
        <h4>Files</h4>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {Object.keys(files).map((file) => (
            <li
              key={file}
              onClick={() => setCurrentFile(file)}
              style={{
                padding: "4px 8px",
                cursor: "pointer",
                backgroundColor: currentFile === file ? "#ddd" : "transparent"
              }}
            >
              {file}
            </li>
          ))}
        </ul>
      </div>

      {/* Editor */}
      <div style={{ flex: 1 }}>
        <Editor
          height="100%"
          theme="vs-dark"
          language={files[currentFile].language}
          value={files[currentFile].content}
          onChange={handleEditorChange}
        />
      </div>
    </div>
  );
}
