import { Request, Response, NextFunction } from 'express';
import { UserService } from '../services/userService';

export const UserController = {
  /**
   * Registra um novo usuário com nome, email e senha.
   * 
   * @route POST /users/register
   * @param {Request} req - Corpo da requisição com name, email e password
   * @param {Response} res - Retorna o usuário criado
   * @param {NextFunction} next - Passa o erro para o middleware de erro
   * 
   * @returns {201 Created} Usuário criado com sucesso
   * @throws {500 Internal Server Error} Erro ao registrar usuário
   */
  register: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, email, password } = req.body;
      const user = await UserService.registerUser(name, email, password);
      res.status(201).json(user);
    } catch (err) {
      next(err);
    }
  },

  /**
   * Retorna todos os usuários cadastrados.
   * 
   * @route GET /users
   * @param {Request} _req - Requisição (não utilizada)
   * @param {Response} res - Retorna a lista de usuários
   * @param {NextFunction} next - Passa o erro para o middleware de erro
   * 
   * @returns {200 OK} Lista de usuários
   * @throws {500 Internal Server Error} Erro ao buscar usuários
   */
  findAll: async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await UserService.getAllUsers();
      res.json(users);
    } catch (err) {
      next(err);
    }
  },

  /**
   * Retorna um usuário pelo ID fornecido.
   * 
   * @route GET /users/:id
   * @param {Request} req - Parâmetro id na rota
   * @param {Response} res - Retorna os dados do usuário
   * @param {NextFunction} next - Passa o erro para o middleware de erro
   * 
   * @returns {200 OK} Usuário encontrado
   * @throws {404 Not Found} Usuário não encontrado
   * @throws {500 Internal Server Error} Erro ao buscar usuário
   */
  findById: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);  
      const user = await UserService.getUserById(id);
      res.json(user);
    } catch (err) {
      next(err);
    }
  },

  /**
   * Atualiza os dados de um usuário existente.
   * 
   * @route PUT /users/:id
   * @param {Request} req - Parâmetro id na rota e corpo com dados atualizados
   * @param {Response} res - Retorna o usuário atualizado
   * @param {NextFunction} next - Passa o erro para o middleware de erro
   * 
   * @returns {200 OK} Usuário atualizado com sucesso
   * @throws {500 Internal Server Error} Erro ao atualizar usuário
   */
  update: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const updatedUser = await UserService.updateUser(Number(req.params.id), req.body);
      res.json(updatedUser);
    } catch (err) {
      next(err);
    }
  },

  /**
   * Deleta um usuário com base no ID fornecido.
   * 
   * @route DELETE /users/:id
   * @param {Request} req - Parâmetro id na rota
   * @param {Response} res - Retorna 204 No Content se a exclusão for bem-sucedida
   * @param {NextFunction} next - Passa o erro para o middleware de erro
   * 
   * @returns {204 No Content} Usuário deletado com sucesso
   * @throws {500 Internal Server Error} Erro ao deletar usuário
   */
  delete: async (req: Request, res: Response, next: NextFunction) => {
    try {
      await UserService.deleteUser(Number(req.params.id));
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  },

  /**
   * Realiza login do usuário com email e senha.
   * 
   * @route POST /users/login
   * @param {Request} req - Corpo da requisição com email e password
   * @param {Response} res - Retorna o usuário autenticado e o token JWT
   * @param {NextFunction} next - Passa o erro para o middleware de erro
   * 
   * @returns {200 OK} Usuário autenticado com token
   * @throws {401 Unauthorized} Credenciais inválidas
   * @throws {500 Internal Server Error} Erro ao realizar login
   */
  login: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;
      const { user, token } = await UserService.loginUser(email, password);
      res.json({ user, token });
    } catch (err) {
      next(err);
    }
  },

  /**
   * Busca usuários com base em uma string de consulta.
   * 
   * @route GET /users/search?query=
   * @param {Request} req - Parâmetro de consulta (query) na URL
   * @param {Response} res - Retorna a lista de usuários encontrados
   * @param {NextFunction} next - Passa o erro para o middleware de erro
   * 
   * @returns {200 OK} Lista de usuários que correspondem à busca
   * @throws {500 Internal Server Error} Erro ao buscar usuários
   */
  searchUsers: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const query = String(req.query.query || "");
      const users = await UserService.searchUsersByQuery(query);
      res.json(users);
    } catch (err) {
      next(err);
    }
  },
};
