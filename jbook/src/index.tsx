import ReactDOM from "react-dom/client";

// useState for the input in textarea from user and the output code
import { useState } from 'react'; 


const el = document.getElementById("root");

const root = ReactDOM.createRoot(el!);

const App = () => {
  const [input, setInput] = useState('');
  const [code, setCode] = useState('');

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
