import { UserController } from '../userController';
import { UserService } from '../../services/userService';
import { Request, Response } from 'express';

jest.mock('../../services/userService');

describe('UserController', () => {
    const mockRequest = {} as Request;
    const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
    } as unknown as Response;

    afterEach(() => jest.clearAllMocks);

    it('Cria um novo usuário', async () => {
        (UserService.createUser as jest.Mock).mockResolvedValue({
            id: 1, name: 'Teste', email: 'teste@gmail.com', password: '123456'
        });

        mockRequest.body = { name: 'Teste', email: 'teste@gmail.com', password: '123456' };

        await UserController.create(mockRequest, mockResponse);

        expect(mockResponse.status).toHaveBeenCalledWith(201);
        expect(mockResponse.json).toHaveBeenCalledWith(expect.objectContaining({
            id: 1, name: 'Teste', email: 'teste@gmail.com'
        }))
    })
})