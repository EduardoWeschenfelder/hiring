import React from "react";

import api from "./services/api";
import { CSSProperties } from "react";

function App() {

  const butonStyles: CSSProperties = {
    backgroundColor: '#008CBA', /* Green */
    border: 'none',
    color: 'white',
    padding: '15px 32px',
    textAlign: 'center',
    textDecoration: 'none',
    display: 'inline-block',
    fontSize: '16px',
  }
  
  

  return (
    <div>
      <label htmlFor=""></label>
      <input type="text" />
      
      <button style={butonStyles}>Bucar</button>

    </div>
  );
}

export default App;
