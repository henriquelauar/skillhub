import request from 'supertest';
import app from '../../app'; // Ajuste se necessário
import { UserRepository } from '../../repositories/userRepository'; // Ajuste o caminho conforme necessário

describe('User Routes', () => {
  let userId: number;

  beforeAll(async () => {
    // Cria um usuário de teste antes de rodar os testes
    const user = await UserRepository.create({
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123',
    });
    userId = user.id;
  });

  it('should get a user by id', async () => {
    const response = await request(app)
      .get(`/users/${userId}`)
      .expect(200); // Verifique se a resposta tem o status 200 (OK)

    expect(response.body).toHaveProperty('id', userId);
    expect(response.body).toHaveProperty('name', 'Test User');
  });

  it('should return 404 when user is not found', async () => {
    const response = await request(app)
      .get('/users/99999') // Um ID que provavelmente não existe
      .expect(404); // Verifique se a resposta tem o status 404 (Não encontrado)

    expect(response.body.message).toBe('Usuário não encontrado');
  });

  it('should login a user', async () => {
    const loginData = { email: 'test@example.com', password: 'password123' };

    const response = await request(app)
      .post('/users/login')
      .send(loginData)
      .expect(200); // Verifique se a resposta tem o status 200 (OK)

    expect(response.body).toHaveProperty('token');
    expect(response.body).toHaveProperty('user');
  });

  it('should return 400 for invalid login', async () => {
    const loginData = { email: 'test@example.com', password: 'wrongpassword' };

    const response = await request(app)
      .post('/users/login')
      .send(loginData)
      .expect(400); // Verifique se a resposta tem o status 400 (Bad Request)

    expect(response.body.message).toBe('Email ou senha inválidos');
  });

  it('should update a user', async () => {
    const updatedUser = { name: 'Updated Name', email: 'updated@example.com', password: 'newpassword' };

    const response = await request(app)
      .put(`/users/${userId}`)
      .send(updatedUser)
      .expect(200); // Verifique se a resposta tem o status 200 (OK)

    expect(response.body).toHaveProperty('name', 'Updated Name');
    expect(response.body).toHaveProperty('email', 'updated@example.com');
  });

  it('should delete a user', async () => {
    const response = await request(app)
      .delete(`/users/${userId}`)
      .expect(204); // Verifique se a resposta tem o status 204 (No Content)

    // Verifique se o usuário foi excluído
    const deletedUser = await UserRepository.findById(userId);
    expect(deletedUser).toBeNull();
  });
});
