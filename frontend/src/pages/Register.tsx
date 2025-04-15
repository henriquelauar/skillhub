import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/users', { name, email, password });

      const response = await api.post('/users/login', { email, password });

      localStorage.setItem('userId', response.data.user.id.toString());
      navigate('/dashboard');
    } catch (err) {
      setError('Erro ao cadastrar ou logar usuário');
      console.log(err);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <div className="card-dark p-4" style={{ width: '100%', maxWidth: '400px' }}>
        <h2 className="text-center mb-4">Cadastro</h2>
        {error && <p className="text-danger">{error}</p>}
        <form onSubmit={handleRegister}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Nome</label>
            <input 
              type="text" 
              className="form-control" 
              id="name" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              placeholder="Nome" 
              required 
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input 
              type="email" 
              className="form-control" 
              id="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              placeholder="Email" 
              required 
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Senha</label>
            <input 
              type="password" 
              className="form-control" 
              id="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              placeholder="Senha" 
              required 
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">Cadastrar</button>
        </form>
        <p className="mt-3">Já tem uma conta? <a href="/login">Entrar</a></p>
      </div>
    </div>
  );
};

export default Register;
