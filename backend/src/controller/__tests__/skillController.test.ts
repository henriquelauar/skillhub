import { SkillController } from '../skillController';
import { SkillService } from '../../services/skillService';
import { Request, Response } from 'express';

jest.mock('../../services/SkillService');

describe('SkillController', () => {
    const mockRequest = {} as Request;
    const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
    } as unknown as Response;

    afterEach(() => jest.clearAllMocks);

    it('Cria uma nova skill', async () => {
        (SkillService.createSkill as jest.Mock).mockResolvedValue({
            id: 1,
            name: 'Node.js',
            userId: 1,
            createdAt: '',
            updatedAt: '',
        });

        mockRequest.body = {       
            id: 1,
            name: 'Node.js',
            userId: 1,
            createdAt: '',
            updatedAt: '', 
        };

        await SkillController.create(mockRequest, mockResponse);

        expect(mockResponse.status).toHaveBeenCalledWith(201);
        expect(mockResponse.json).toHaveBeenCalledWith(expect.objectContaining({
            id: 1,
            name: 'Node.js',
            userId: 1,
            createdAt: '',
            updatedAt: '',
        }))
    })
})