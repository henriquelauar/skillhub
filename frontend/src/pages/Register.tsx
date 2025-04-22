import { useState, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../services/userService';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await registerUser(name, email, password);

      localStorage.setItem('userId', response.data.user.id.toString());
      localStorage.setItem('token', response.data.token);
      navigate('/dashboard');
    } catch (err) {
      setError('Erro ao cadastrar ou logar usuário');
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container-fluid p-0">
      <div className="row g-0 min-vh-100">
        {/* Left side - Form */}
        <div className="col-md-6 d-flex align-items-center justify-content-center">
          <div className="p-4 p-md-5" style={{ maxWidth: '500px', width: '100%' }}>
            <div className="text-center mb-5">
              <h1 className="h2 mb-2 text-primary d-flex align-items-center justify-content-center gap-2">
                <i className="bi bi-lightbulb text-warning"></i>
                SkillHub
              </h1>
              <p className="text-muted">Plataforma de troca de habilidades</p>
            </div>
            
            <div className="card shadow-sm border-0">
              <div className="card-body p-4">
                <h2 className="h4 mb-4">Criar nova conta</h2>
                
                {error && <div className="alert alert-danger" role="alert">{error}</div>}
                
                <form onSubmit={handleRegister}>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">Nome</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      id="name" 
                      value={name} 
                      onChange={(e) => setName(e.target.value)} 
                      placeholder="Digite seu nome" 
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
                      placeholder="Digite seu email" 
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
                      placeholder="Crie uma senha" 
                      required 
                    />
                  </div>
                  <button 
                    type="submit" 
                    className="btn btn-primary w-100" 
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Criando conta...
                      </>
                    ) : (
                      'Criar conta'
                    )}
                  </button>
                </form>
                
                <p className="mt-4 text-center">
                  Já tem uma conta? <Link to="/login" className="text-decoration-none">Entrar</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Right side - Hero */}
        <div className="col-md-6 bg-primary text-white d-none d-md-flex align-items-center">
          <div className="p-5" style={{ maxWidth: '600px', margin: '0 auto' }}>
            <h2 className="h2 mb-4">Troque conhecimentos, desenvolva habilidades</h2>
            <p className="mb-5">
              O SkillHub conecta pessoas que querem aprender novas habilidades com aquelas que podem ensinar. 
              Crie sua conta e comece a compartilhar conhecimento.
            </p>
            
            <div className="mb-4">
              <div className="d-flex align-items-start mb-3">
                <div className="bg-white bg-opacity-25 p-2 rounded me-3 text-primary">
                  <i className="bi bi-chevron-right"></i>
                </div>
                <div>
                  <h5 className="mb-1">Liste suas habilidades</h5>
                  <p className="text-white-50 mb-0">Cadastre o que você domina e o que deseja aprender</p>
                </div>
              </div>
              
              <div className="d-flex align-items-start mb-3">
                <div className="bg-white bg-opacity-25 p-2 rounded me-3 text-primary">
                  <i className="bi bi-chevron-right"></i>
                </div>
                <div>
                  <h5 className="mb-1">Encontre matches perfeitos</h5>
                  <p className="text-white-50 mb-0">Conecte-se com pessoas que podem te ensinar o que você precisa</p>
                </div>
              </div>
              
              <div className="d-flex align-items-start">
                <div className="bg-white bg-opacity-25 p-2 rounded me-3 text-primary">
                  <i className="bi bi-chevron-right"></i>
                </div>
                <div>
                  <h5 className="mb-1">Troque conhecimentos</h5>
                  <p className="text-white-50 mb-0">Amplie sua rede de contatos e aprenda enquanto ensina</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;