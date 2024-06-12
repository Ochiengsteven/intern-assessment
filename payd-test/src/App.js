import logo from "./logo.svg";
import "./App.css";
import { PhoneIcon } from "@chakra-ui/icons";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1 className="text-3xl text-blue-600 font-bold underline">
          Hello world!
        </h1>
        <PhoneIcon w={6} h={6} color="green.500" />
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
