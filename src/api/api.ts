// src/api/api.ts

// Exemplo de como o cadastro pode ser feito no api.ts
import axios from 'axios';

export const cadastrarNaFila = async (pessoa: any) => {
  try {
    const response = await axios.post('http://localhost:3000/api/fila', pessoa);
    return response.data; // Retorna os dados recebidos da API
  } catch (error) {
    console.error('Erro ao cadastrar na fila:', error);
    throw error; // Lançar o erro para ser tratado no componente
  }
};


export const obterFila = async (): Promise<any[]> => {
  try {
    const response = await fetch('/api/fila');
    if (!response.ok) throw new Error('Falha ao obter a fila');

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error('Erro ao obter a fila');
  }
};
