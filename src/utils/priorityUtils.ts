// src/utils/priorityUtils.ts

export const calcularPrioridade = (dados: {
  nome: string;
  rendaFamiliar: number;
  numFilhos: number;
  monoparentalidade: boolean;
  idade: number;
}): number => {
  let prioridade = 0;

  // Exemplo de cálculo baseado em critérios:
  if (dados.monoparentalidade) prioridade += 10;  // Maior prioridade para monoparentais
  if (dados.rendaFamiliar < 1500) prioridade += 5; // Maior prioridade para famílias com baixa renda
  if (dados.numFilhos > 2) prioridade += 3;         // Maior prioridade para famílias com mais filhos
  if (dados.idade <= 5) prioridade += 2;            // Maior prioridade para crianças mais novas

  return prioridade;
};
