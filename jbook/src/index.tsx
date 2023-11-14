import * as esbuild from 'esbuild-wasm';

import ReactDOM from "react-dom/client";

// useState for the input in textarea from user and the output code
// useEffect to startService
import { useState, useEffect } from 'react'; 
import { start } from 'repl';


const el = document.getElementById("root");

const root = ReactDOM.createRoot(el!);

const App = () => {
  const [input, setInput] = useState('');
  const [code, setCode] = useState('');

  const startService = async () => {
    const service = await esbuild.startService({
      worker: true,
      wasmURL:'/esbuild.wasm'
    });
    console.log(service)
  };
  useEffect(() => {
    startService();
  }, []);

  const onClick = () => {
    console.log(input)
  };

  return (
  <div>
    <textarea value={input} onChange={e => setInput(e.target.value)}></textarea>
      <div>
        <button onClick={onClick}>Submit</button>
      </div>
      <pre>{code}</pre>
  </div>
  );
};

root.render(<App />);
