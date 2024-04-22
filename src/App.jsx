import React, { useState } from 'react';
import axios from 'axios';

const logar = async (username, password) => {
  try {
    const response = await axios.post('http://localhost:8090/api/login', {
      username: username,
      password: password,
    });
    return { success: true, message: response.data.message };
  } catch (error) {
    return { success: false, message: 'Erro ao se logar: Usuário ou senha incorretos.' };
  }
};

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      const { success, message } = await logar(username, password);
      if (success) {
        alert("login feito com sucesso");
      } else {
        setError(message);
      }
    } catch (error) {
      console.error('Erro ao se logar:', error);
      setError('Erro ao se logar: Houve um problema no servidor.');
    }
  };

  return (
    <div>
      <h1>Login system</h1>
      <form>
        <label>
          Usuário:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <br />
        <label>
          Senha:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        {error && <div className="error-message">{error}</div>}
        <button type="button" onClick={handleLogin}>
          Login
        </button>
      </form>
    </div>
  );
}

export default App;