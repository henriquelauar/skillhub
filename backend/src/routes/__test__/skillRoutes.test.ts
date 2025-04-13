// tests/skillRoutes.test.ts
import request from 'supertest';
import app from '../../app';
import { prisma } from '../../database/prisma';

describe('Skill Routes', () => {
  let userId: number;
  let skillId: number;

  beforeAll(async () => {
    const user = await prisma.user.create({
      data: {
        name: 'Teste',
        email: 'teste@skills.com',
        password: '123456',
      },
    });
    userId = user.id;
  });

  afterAll(async () => {
    await prisma.skill.deleteMany();
    await prisma.user.deleteMany();
    await prisma.$disconnect();
  });

  it('deve criar uma skill', async () => {
    const response = await request(app)
      .post('/skills')
      .send({
        name: 'Node.js',
        description: 'Backend com Node',
        userId: userId,
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    skillId = response.body.id;
  });

  it('deve listar todas as skills', async () => {
    const response = await request(app).get('/skills');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('deve buscar uma skill por ID', async () => {
    const response = await request(app).get(`/skills/${skillId}`);
    expect(response.status).toBe(200);
    expect(response.body.id).toBe(skillId);
  });

  it('deve buscar todas as skills de um usuário', async () => {
    const response = await request(app).get(`/skills/user/${userId}`);
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('deve atualizar uma skill', async () => {
    const response = await request(app)
      .put(`/skills/${skillId}`)
      .send({
        name: 'Node.js Avançado',
      });

    expect(response.status).toBe(200);
    expect(response.body.name).toBe('Node.js Avançado');
  });

  it('deve deletar uma skill', async () => {
    const response = await request(app).delete(`/skills/${skillId}`);
    expect(response.status).toBe(204);
  });
});
