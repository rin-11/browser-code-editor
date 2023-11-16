import * as esbuild from 'esbuild-wasm';
import ReactDOM from "react-dom/client";

import { useState, useEffect, useRef } from 'react'; 
// useState for the input in textarea from user and the output code
// useEffect to startService
// useRef to transform code

// PLUGINS
import { unpkgPathPlugin } from './plugins/unpkg-path-plugin';
import { fetchPlugin } from './plugins/fetch-plugin';

const el = document.getElementById("root");

const root = ReactDOM.createRoot(el!);

const App = () => {
  const ref = useRef<any>();
  const [input, setInput] = useState('');
  const [code, setCode] = useState('');

  const startService = async () => {
    ref.current = await esbuild.startService({
      worker: true,
      wasmURL: 'https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm'
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

    const result = await ref.current.build({
      entryPoints: ['index.js'],
      bundle: true,
      write: false,
      plugins: [
        unpkgPathPlugin(),
        fetchPlugin(input)
      ],
      define: {
        // define process.env.NoDE_ENV as a string of production to handle bundling error
        'process.env.NODE_ENV': "'production'",
        // replace global with window to display some packages in the browser
        global: 'window',
      }
    })

    setCode(result.outputFiles[0].text);
  };

  const html = 
    `
      <script>
        ${code}
      </script>
    `;


  return (
  <div>
    <textarea 
      value={input} 
      onChange={e => setInput(e.target.value)}>
    </textarea>
      <div>
        <button onClick={onClick}>Submit</button>
      </div>
      <pre>{code}</pre>
      <iframe sandbox="allow-scripts" srcDoc={html} />
  </div>
  );
};


root.render(<App />);
