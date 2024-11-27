// src/App.tsx
import React from 'react';
import Fila from './components/Fila';

const App = () => {
  return (
    <div className="App">
      <header>
        <h1>Sistema de Fila</h1>
        <p>Gerenciamento de fila com prioridades.</p>
      </header>
      <main>
        <Fila/>
      </main>
    </div>
  );
};

export default App; // Exportando o componente App
