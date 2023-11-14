import ReactDOM from "react-dom/client";

const el = document.getElementById("root");

const root = ReactDOM.createRoot(el!);

const App = () => {
  return <div>
    <textarea></textarea>
      <div>
        <button>Submit</button>
      </div>
      <pre></pre>
  </div>
};

root.render(<App />);
