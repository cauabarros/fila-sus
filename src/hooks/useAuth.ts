// src/hooks/useAuth.ts
import { useState, useEffect } from 'react';

// Definindo o tipo 'Usuario' com base nas informações que você precisa
interface Usuario {
  email: string;
  senha: string;
  // Adicione outros campos necessários, por exemplo:
  nome: string;
  id: number;
}

const useAuth = () => {
  const [usuario, setUsuario] = useState<Usuario | null>(null);

  // Recuperando o usuário logado do 'localStorage' assim que o componente for montado
  useEffect(() => {
    const usuarioLogado = localStorage.getItem('usuario');
    if (usuarioLogado) {
      setUsuario(JSON.parse(usuarioLogado));  // Define o usuário no estado
    }
  }, []);

  // Função para fazer login, recebendo os dados do usuário
  const login = (usuarioData: Usuario) => {
    localStorage.setItem('usuario', JSON.stringify(usuarioData));  // Salva os dados no 'localStorage'
    setUsuario(usuarioData);  // Atualiza o estado 'usuario'
  };

  // Função para fazer logout, removendo o usuário do 'localStorage'
  const logout = () => {
    localStorage.removeItem('usuario');  // Remove os dados do 'localStorage'
    setUsuario(null);  // Limpa o estado 'usuario'
  };

  return {
    usuario,  // Retorna o estado 'usuario'
    login,    // Função de login
    logout,   // Função de logout
  };
};

export default useAuth;
