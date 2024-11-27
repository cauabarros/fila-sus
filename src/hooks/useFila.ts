// src/hooks/useFila.ts
import { useState, useEffect } from 'react';
import { cadastrarNaFila, obterFila } from '../api/api';  // Funções de interação com a API
import { calcularPrioridade } from '../utils/priorityUtils';  // Função para calcular a prioridade

// Definição do tipo 'Pessoa'
interface Pessoa {
  id: number;
  nome: string;
  rendaFamiliar: number;
  numFilhos: number;
  monoparentalidade: boolean;
  idade: number;
  prioridade: number;
}

// Hook personalizado para gerenciar a fila
const useFila = () => {
  const [fila, setFila] = useState<Pessoa[]>([]);  // Estado para armazenar a fila

  // Função para carregar a fila do backend
  const carregarFila = async () => {
    try {
      const filaObtida = await obterFila();  // Chama a API para obter a fila
      setFila(filaObtida);
    } catch (error) {
      console.error('Erro ao obter a fila:', error);
    }
  };

  // Função para adicionar uma pessoa à fila
  const adicionarPessoa = async (
    nome: string,
    rendaFamiliar: number,
    numFilhos: number,
    monoparentalidade: boolean,
    idade: number
  ) => {
    if (nome.trim() === '') {
      alert('Digite um nome!');
      return;
    }

    const dados = { nome, rendaFamiliar, numFilhos, monoparentalidade, idade };

    // Calcular a prioridade para a pessoa
    const prioridade = calcularPrioridade(dados);

    // Criar o objeto de pessoa com ID e prioridade
    const pessoaComId: Pessoa = {
      ...dados,
      id: Date.now(),  // Gerando um ID único
      prioridade,
    };

    try {
      const novaPessoa = await cadastrarNaFila(pessoaComId);  // Chama a API para cadastrar a pessoa
      setFila((prevFila) => [...prevFila, novaPessoa]);  // Atualiza a fila
      alert('Pessoa cadastrada na fila com sucesso!');
    } catch (error) {
      console.error('Erro ao adicionar pessoa à fila:', error);
      alert('Erro ao adicionar pessoa à fila.');
    }
  };

  // Carregar a fila quando o hook for montado
  useEffect(() => {
    carregarFila();
  }, []);

  return {
    fila,
    adicionarPessoa,
  };
};

export default useFila;
