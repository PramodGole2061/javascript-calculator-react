import logo from './logo.svg';
import './App.css';
import Calculator from './components/Calculator';
import Display from './components/Display';
import { useState } from 'react';

function App() {
  const[display, setDisplay] = useState("0");
  const[expression, setExpression] = useState("");
  return (
    <div className="container" style={{maxWidth: "300px", marginTop: "50px", border: "2px solid black", borderRadius: "10px", backgroundColor: "#100f0fff"}}>
        <Display display={display} expression={expression}/>
        <Calculator display={display} setDisplay={setDisplay} expression={expression} setExpression={setExpression}/>
    </div>
  );
}

export default App;
