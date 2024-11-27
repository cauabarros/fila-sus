// Exportando a interface Pessoa para ser usada em outros arquivos
export interface Pessoa {
  id: number;
  nome: string;
  rendaFamiliar: number;
  numFilhos: number;
  monoparentalidade: boolean;
  prioridade: number; // Prioridade calculada com base nos fatores
}

let currentId = 1; // Variável para controle de IDs

// Funções de manipulação da fila

// Adicionar uma nova pessoa à fila
export const adicionarPessoaNaFila = (
  fila: Pessoa[],
  nome: string,
  rendaFamiliar: number,
  numFilhos: number,
  monoparentalidade: boolean
): Pessoa[] => {
  const prioridade = calcularPrioridade(rendaFamiliar, numFilhos, monoparentalidade);
  
  const novaPessoa: Pessoa = {
    id: currentId++, // Incrementa o ID de forma única
    nome,
    rendaFamiliar,
    numFilhos,
    monoparentalidade,
    prioridade,
  };

  return [...fila, novaPessoa]; // Retorna a fila com a nova pessoa
};

// Função de cálculo de prioridade
const calcularPrioridade = (
  rendaFamiliar: number,
  numFilhos: number,
  monoparentalidade: boolean
): number => {
  let prioridade = 0;

  // Prioridade baseada em critérios do sistema (pode ser ajustada conforme a necessidade)
  if (rendaFamiliar <= 1000) prioridade += 5; // Renda baixa
  if (numFilhos > 2) prioridade += 3; // Mais de 2 filhos
  if (monoparentalidade) prioridade += 4; // Pessoa monoparental

  return prioridade;
};

// Função para atender a pessoa com maior prioridade
export const atenderPessoa = (
  fila: Pessoa[]
): { pessoaAtendida: Pessoa; novaFila: Pessoa[] } => {
  if (fila.length === 0) {
    throw new Error("Não há ninguém na fila!");
  }

  // Ordena a fila por prioridade decrescente e seleciona a pessoa com maior prioridade
  const filaOrdenada = [...fila].sort((a, b) => b.prioridade - a.prioridade);
  const pessoaAtendida = filaOrdenada[0]; // A pessoa com maior prioridade

  // Retorna a nova fila com a pessoa atendida removida
  const novaFila = fila.filter((pessoa) => pessoa.id !== pessoaAtendida.id);

  return { pessoaAtendida, novaFila };
};
