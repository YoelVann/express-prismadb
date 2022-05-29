const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

(async function main() {
  try {
    const missionCommander1 = await prisma.MissionCommander.upsert({
      where: { name: 'Rodrigo Martínez' },
      update: {},
      create: {
        name: 'Rodrigo Martínez',
				username: 'romarpla',
				mainStack: 'Frontend',
        currentEnrollment: true,
        hasAzureCertification: true
      },
    });
    const missionCommander2 = await prisma.MissionCommander.upsert({
      where: { name: 'Carlo Gilmar' },
      update: {},
      create: {
        name: 'Carlo Gilmar',
				username: 'carlogilmar',
				mainStack: 'Backend',
        currentEnrollment: true,
        hasAzureCertification: true
      },
    });
    const missionCommander3 = await prisma.MissionCommander.upsert({
      where: { name: 'Fernanda Ochoa' },
      update: {},
      create: {
        name: 'Fernanda Ochoa',
				username: 'fernandaOchoa',
				mainStack: 'Backend',
        currentEnrollment: true,
        hasAzureCertification: true
      },
    });

    console.log('Create 3 missionCommander');
  } catch(e) {
    console.error(e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
})();