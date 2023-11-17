import ReactDOM from "react-dom/client";
import 'bulmaswatch/superhero/bulmaswatch.min.css'
import CodeCell from './components/code-cell'

const el = document.getElementById("root");

const root = ReactDOM.createRoot(el!);

const App = () => {
  
  return (
  <div>
    <CodeCell/>
    <CodeCell/>
    <CodeCell/>
  </div>
  );
};


root.render(<App />);
