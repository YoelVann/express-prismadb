const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

(async function main() {
  try {
    const mission = await prisma.mission.upsert({
      where: { name: 'Node' },
      update: {},
      create: {
        name: 'Node',
				lang: 'ESP',
				missionCommander: 'Carlo Gilmar',
        enrollments: 6000,
        hasCertification: true
      },
    });

    const mission2 = await prisma.mission.upsert({
      where: { name: 'Java' },
      update: {},
      create: {
        name: 'Java',
				lang: 'ESP',
				missionCommander: 'Fernanda Ochoa',
        enrollments: 5000,
        hasCertification: true
      },
    });
    const mission3 = await prisma.mission.upsert({
      where: { name: 'FrontEnd' },
      update: {},
      create: {
        name: 'Javascript',
				lang: 'ESP',
				missionCommander: 'Rodrigo Martínez',
        enrollments: 8000,
        hasCertification: false
      },
    });

    console.log('Create 2 mission');
  } catch(e) {
    console.error(e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
})();