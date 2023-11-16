import MonacoEditor from "@monaco-editor/react";

const CodeEditor = () => {
    return <MonacoEditor 
        language= "javascript" 
        theme="dark" 
        height="500px"
        options={{
            wordWrap: 'on',
            minimap: { enabled: false },
            showUnused: false,
            folding: false,
            lineNumbersMinChars: 3,
            fontSize: 22,
            scrollBeyondLastLine: false,
            automaticLayout: true,
        }}
        />   
};

export default CodeEditor;