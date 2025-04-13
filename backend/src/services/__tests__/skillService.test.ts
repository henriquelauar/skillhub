import { SkillRepository } from '../../repositories/skillRepository'
import { SkillService } from '../skillService'

jest.mock('../../repositories/skillRepository')

describe('SkillService', () => {
    const mockSkill = {
      id: 1,
      name: 'Node.js',
      userId: 1,
      createdAt: '',
      updatedAt: '',
    };
  
    it('deve criar uma skill', async () => {
      (SkillRepository.create as jest.Mock).mockResolvedValue(mockSkill);
  
      const result = await SkillService.createSkill({ name: 'Node.js', userId: 1 });
      expect(result).toEqual(mockSkill);
    });
  
    it('deve retornar todas as skills', async () => {
      (SkillRepository.findAll as jest.Mock).mockResolvedValue([mockSkill]);
  
      const result = await SkillService.getAllSkills();
      expect(result).toEqual([mockSkill]);
    });
  
    it('deve retornar skill por ID', async () => {
      (SkillRepository.findById as jest.Mock).mockResolvedValue(mockSkill);
  
      const result = await SkillService.getSkillById(1);
      expect(result).toEqual(mockSkill);
    });
  
    it('deve atualizar uma skill', async () => {
      const updated = { ...mockSkill, name: 'React' };
      (SkillRepository.update as jest.Mock).mockResolvedValue(updated);
  
      const result = await SkillService.updateSkill(1, { name: 'React' });
      expect(result).toEqual(updated);
    });
  
    it('deve deletar uma skill', async () => {
      (SkillRepository.delete as jest.Mock).mockResolvedValue(undefined);
  
      await expect(SkillService.deleteSkill(1)).resolves.toBeUndefined();
    });
  });
  