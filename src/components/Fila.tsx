// src/components/FilaCadastro.tsx
import React, { useState, useEffect } from 'react';
import useAuth  from '../hooks/useAuth'; // Importando o hook de autenticação
import { cadastrarNaFila, obterFila } from '../api/api'; // Funções de interação com a API
import { calcularPrioridade } from '../utils/priorityUtils'; // Função para calcular a prioridade

interface Pessoa {
  id: number;
  nome: string;
  rendaFamiliar: number;
  numFilhos: number;
  monoparentalidade: boolean;
  idade: number;
  prioridade: number;
}

const FilaCadastro = () => {
  const { usuario, login, logout } = useAuth(); // Usando o hook de autenticação
  const [fila, setFila] = useState<Pessoa[]>([]); // Estado para armazenar a fila
  const [nome, setNome] = useState('');
  const [rendaFamiliar, setRendaFamiliar] = useState(0);
  const [numFilhos, setNumFilhos] = useState(0);
  const [monoparentalidade, setMonoparentalidade] = useState(false);
  const [idade, setIdade] = useState(0);

  // Estados para capturar dados de login
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  useEffect(() => {
    if (usuario) {
      carregarFila(); // Carregar fila apenas se o usuário estiver logado
    }
  }, [usuario]); // Dependência de 'usuario', para carregar a fila quando o usuário logar

  const adicionarPessoa = async () => {
    if (nome.trim() === '') {
      alert('Digite um nome!');
      return;
    }

    const dados = {
      nome,
      rendaFamiliar,
      numFilhos,
      monoparentalidade,
      idade,
    };

    const prioridade = calcularPrioridade(dados);

    const pessoaComId: Pessoa = {
      ...dados,
      id: Date.now(),
      prioridade,
    };

    try {
      const novaPessoa = await cadastrarNaFila(pessoaComId);
      setFila((prevFila) => [...prevFila, novaPessoa]);
      alert('Pessoa cadastrada na fila com sucesso!');
      limparCampos();
    } catch (error) {
      alert('Erro ao adicionar pessoa à fila.');
    }
  };

  const carregarFila = async () => {
    try {
      const filaObtida = await obterFila();
      setFila(filaObtida);
    } catch (error) {
      alert('Erro ao obter a fila.');
    }
  };

  const limparCampos = () => {
    setNome('');
    setRendaFamiliar(0);
    setNumFilhos(0);
    setMonoparentalidade(false);
    setIdade(0);
  };

  // Função de login
  const handleLogin = () => {
    // Aqui você faria uma verificação mais robusta de login, mas vamos simular com o email e senha simples
    if (email && senha) {
      login({ email, senha, nome: 'Nome do Usuário', id: Date.now() }); // Dados fictícios
    } else {
      alert('Por favor, preencha os campos de login!');
    }
  };

  // Caso o usuário não esteja logado, mostra o formulário de login
  if (!usuario) {
    return (
      <div className="loginContainer">
        <h1>Login</h1>
        <div className="inputGroup">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="Digite seu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="senha">Senha</label>
          <input
            id="senha"
            type="password"
            placeholder="Digite sua senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
        </div>
        <button onClick={handleLogin}>Entrar</button>
      </div>
    );
  }

  // Exibe a fila quando o usuário estiver logado
  return (
    <div className="container">
      <h1>Fila de Cadastro - Bem-vindo, {usuario.email}</h1>
      <button onClick={logout}>Sair</button>

      {/* Formulário de cadastro */}
      <div className="formContainer">
        <div className="inputGroup">
          <label htmlFor="nome">Nome</label>
          <input
            id="nome"
            type="text"
            placeholder="Digite o nome da pessoa"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
        </div>

        <div className="inputGroup">
          <label htmlFor="rendaFamiliar">Renda Familiar</label>
          <input
            id="rendaFamiliar"
            type="number"
            placeholder="Digite a renda familiar"
            value={rendaFamiliar}
            onChange={(e) => setRendaFamiliar(Number(e.target.value))}
          />
        </div>

        <div className="inputGroup">
          <label htmlFor="numFilhos">Número de Filhos</label>
          <input
            id="numFilhos"
            type="number"
            placeholder="Digite o número de filhos"
            value={numFilhos}
            onChange={(e) => setNumFilhos(Number(e.target.value))}
          />
        </div>

        <div className="inputGroup">
          <label htmlFor="monoparentalidade">Monoparentalidade</label>
          <input
            id="monoparentalidade"
            type="checkbox"
            checked={monoparentalidade}
            onChange={() => setMonoparentalidade(!monoparentalidade)}
          />
        </div>

        <div className="inputGroup">
          <label htmlFor="idade">Idade da Criança</label>
          <input
            id="idade"
            type="number"
            placeholder="Digite a idade da criança"
            value={idade}
            onChange={(e) => setIdade(Number(e.target.value))}
          />
        </div>

        <button onClick={adicionarPessoa} className="button">Adicionar à Fila</button>
      </div>

      {/* Exibição da Fila */}
      <div className="filaContainer">
        <h2>Lista de Espera</h2>
        {fila.length === 0 ? (
          <p>Não há ninguém na fila.</p>
        ) : (
          <ul className="filaList">
            {fila
              .sort((a, b) => b.prioridade - a.prioridade) // Ordena por prioridade
              .map((pessoa) => (
                <li key={pessoa.id} className="filaItem">
                  {pessoa.nome} - Prioridade: {pessoa.prioridade} - (Idade: {pessoa.idade})
                </li>
              ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default FilaCadastro;
