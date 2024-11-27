import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./styles/App.css"; // Importando o arquivo de estilos principais

// Renderizando a aplicação no DOM
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
