import * as esbuild from 'esbuild-wasm';
import axios from 'axios';
import ReactDOM from "react-dom/client";

// useState for the input in textarea from user and the output code
// useEffect to startService
// useRef to transform code
import { useState, useEffect, useRef } from 'react'; 
import { start } from 'repl';


import { unpkgPathPlugin } from './plugins/unpkg-path-plugin';

const el = document.getElementById("root");

const root = ReactDOM.createRoot(el!);

const App = () => {
  const ref = useRef<any>();
  const [input, setInput] = useState('');
  const [code, setCode] = useState('');

  const startService = async () => {
    ref.current = await esbuild.startService({
      worker: true,
      wasmURL:'/esbuild.wasm'
    });
  };
  useEffect(() => {
    startService();
  }, []);

  const onClick = async () => {
    // check that startService is working before running code
    if (!ref.current) {
      return;
    }
    // transform function the input
    // const result = await ref.current.transform(input, {
    //   loader: 'jsx',
    //   target: 'es2015'
    // });
    const result = await ref.current.build({
      entryPoints: ['index.js'],
      bundle: true,
      write: false,
      plugins: [unpkgPathPlugin()]
    })
    // console.log(result);
    setCode(result.outputFiles[0].text);
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
