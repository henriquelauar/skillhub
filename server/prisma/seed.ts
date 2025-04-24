import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

const techSkills = [
  'Python', 'JavaScript', 'TypeScript', 'React', 'Node.js',
  'Docker', 'Kubernetes', 'PostgreSQL', 'MongoDB', 'GraphQL',
  'Machine Learning', 'Deep Learning', 'Data Analysis', 'TensorFlow',
  'PyTorch', 'Git', 'AWS', 'CI/CD', 'Linux', 'Agile'
];

async function main() {
  console.log('Iniciando seed...');
  await prisma.match.deleteMany();
  await prisma.skill.deleteMany();
  await prisma.user.deleteMany();

  const users = [];

  for (let i = 0; i < 20; i++) {
    const hashedPassword = await bcrypt.hash('123456', 10);

    const user = await prisma.user.create({
      data: {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        password: hashedPassword,
      },
    });

    const usedSkillNames = new Set<string>();

    const getUniqueSkillName = () => {
      let name = '';
      do {
        name = faker.helpers.arrayElement(techSkills);
      } while (usedSkillNames.has(name));
      usedSkillNames.add(name);
      return name;
    };

    const skillsToTeach = Array.from({ length: 5 }).map(() => ({
      name: getUniqueSkillName(),
      isLearning: false,
      ownerId: user.id,
    }));

    const skillsToLearn = Array.from({ length: 5 }).map(() => ({
      name: getUniqueSkillName(),
      isLearning: true,
      ownerId: user.id,
    }));

    await prisma.skill.createMany({
      data: [...skillsToTeach, ...skillsToLearn],
    });

    users.push(user);
    console.log(`Usuário ${i + 1} criado com 10 habilidades.`);
  }

  // Criar matches válidos
  const allSkills = await prisma.skill.findMany({ include: { owner: true } });

  let matchCount = 0;
  for (const sender of users) {
    const learningSkills = await prisma.skill.findMany({
      where: {
        ownerId: sender.id,
        isLearning: true,
      },
    });

    for (const learningSkill of learningSkills) {
      const potentialTeachers = allSkills.filter(
        (s) =>
          s.name === learningSkill.name &&
          !s.isLearning &&
          s.ownerId !== sender.id
      );

      if (potentialTeachers.length > 0) {
        const teacherSkill = faker.helpers.arrayElement(potentialTeachers);

        await prisma.match.create({
          data: {
            senderId: sender.id,
            receiverId: teacherSkill.ownerId,
            skillId: teacherSkill.id,
            status: 'PENDENTE',
          },
        });

        matchCount++;
      }
    }
  }

  console.log(`Seed finalizado com sucesso! Foram criados ${matchCount} matches.`);
}

main()
  .catch((e) => {
    console.error('Erro no seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
