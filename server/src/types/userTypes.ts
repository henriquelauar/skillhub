export interface User {
    id: number;
    name: string;
    email: string;
    password: string;
    createdAt: string;
  }
  
  export interface CreateUser {
    name: string;
    email: string;
    password: string;
  }
  
  export interface UpdateUser {
    name?: string;
    email?: string;
    password?: string;
  }
  