export const getUserId = (): number | null => {
    const id = localStorage.getItem('userId');
    return id ? Number(id) : null;
  };
  
export const logout = () => {
  localStorage.removeItem('userId');
  localStorage.removeItem('token');
};