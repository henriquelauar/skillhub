export interface Skill {
    id: number;
    name: string;
    createdAt: string;
    updatedAt: string;
  }
  
  export interface CreateSkill {
    name: string;
    userId: number;
  }
  
  export interface UpdateSkill {
    name?: string;
  }
  