import { useState, FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from '../../services/userService';
import { useErrorHandler } from '../../hooks/useErrorHandler';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const handleError = useErrorHandler();

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await loginUser(email, password);
      const userId = response?.user?.id;
      const token = response?.token;

      if (!userId || !token) {
        throw new Error('Resposta inesperada do servidor');
      }

      localStorage.setItem('userId', response.user.id.toString());
      localStorage.setItem('token', response.token);
      navigate('/dashboard');
    } catch (err) {
      handleError(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container-fluid p-0">
      <div className="row g-0 min-vh-100">
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
                <h2 className="h4 mb-4">Entrar na plataforma</h2>
                                
                <form onSubmit={handleLogin}>
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
                  <div className="mb-4">
                    <label htmlFor="password" className="form-label">Senha</label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Digite sua senha"
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
                        Entrando...
                      </>
                    ) : (
                      'Entrar'
                    )}
                  </button>
                </form>
                
                <p className="mt-4 text-center">
                  Não tem uma conta? <Link to="/register" className="text-decoration-none">Registre-se</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
        
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

export default Login;