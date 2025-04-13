import { UserService } from '../../services/userService'; // Ajuste o caminho conforme necessário

describe('UserService', () => {
  const mockUser = {
    name: 'Test User',
    email: 'test@example.com',
    password: 'password123',
  };

  it('should create a new user', async () => {
    const result = await UserService.createUser(
      mockUser.name,
      mockUser.email,
      mockUser.password
    );
    expect(result).toHaveProperty('id');
    expect(result).toHaveProperty('name', mockUser.name);
  });

  it('should update a user', async () => {
    const updatedUser = {
      name: 'Updated Name',
      email: 'updated@example.com',
      password: 'newpassword',
    };

    const result = await UserService.updateUser(1, updatedUser); // Aqui você deve passar um objeto completo
    expect(result).toHaveProperty('name', updatedUser.name);
    expect(result).toHaveProperty('email', updatedUser.email);
  });
});
