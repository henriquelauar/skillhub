import { jwtDecode } from 'jwt-decode';

interface TokenPayload {
  id: number;
  email: string;
  iat: number;
  exp: number;
}

export const getUserIdFromToken = (): number | null => {
  const token = localStorage.getItem('token');
  if (!token) return null;

  try {
    const decoded = jwtDecode<TokenPayload>(token);
    return decoded.id;
  } catch (err) {
    console.error('Erro ao decodificar token:', err);
    return null;
  }
};
