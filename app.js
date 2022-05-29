const express = require('express');
const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;

// Require para usar Prisma
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
//CORS
const cors = require("cors");

const corsOptions = {
    origin: "http://localhost:8081"
};
app.use(cors(corsOptions));

//CRUD
app.get('/', (req, res) => {
  res.json({message: 'alive'});
});

app.get('/explorers', async (req, res) => {
    const allExplorers =  await prisma.explorer.findMany({});
    res.json(allExplorers);
});

app.get('/explorers/:id', async (req, res) => {
    const id = req.params.id;
    const explorer = await prisma.explorer.findUnique({where: {id: parseInt(id)}});
    res.json(explorer);
});

app.post('/explorers', async (req, res) => {
    const explorer = {
      name: req.body.name,
      username: req.body.username,
      mission: req.body.mission
     };
    const message = 'Explorer creado.';
    await prisma.explorer.create({data: explorer});
    return res.json({message});
});

app.put('/explorers/:id', async (req, res) => {
	const id = parseInt(req.params.id);

	await prisma.explorer.update({
		where: {
			id: id
		},
		data: {
			mission: req.body.mission
		}
	})

	return res.json({message: "Actualizado correctamente"});
});

app.delete('/explorers/:id', async (req, res) => {
	const id = parseInt(req.params.id);
	await prisma.explorer.delete({where: {id: id}});
	return res.json({message: "Eliminado correctamente"});
});

// Mission CRUD methods 
app.get('/missions', async(req, res) =>{
  const allMissions = await prisma.mission.findMany({});
  res.json(allMissions);
});

app.get('/missions/:id', async (req, res) => {
  const id = req.params.id;
  const mission = await prisma.mission.findUnique({where: {id: parseInt(id)}});
  res.json(mission);
});

app.post('/missions', async(req, res)=> {
  const mission = {
    name: req.body.name,
    lang: req.body.lang,
    missionCommander: req.body.missionCommander,
    enrollments: req.body.enrollments,
    hasCertification: req.body.hasCertification
  };
  
  const message = 'Mission creada.';
  await prisma.mission.create({data: mission});
  return res.json({message});
});

app.put('/missions/:id', async (req, res) => {
	const id = parseInt(req.params.id);

	await prisma.mission.update({
		where: {
			id: id
		},
		data: {
			missionCommander: req.body.missionCommander
		}
	})

	return res.json({message: "Actualizado correctamente"});
});

app.delete('/missions/:id', async (req, res) => {
	const id = parseInt(req.params.id);
	await prisma.mission.delete({where: {id: id}});
	return res.json({message: "Eliminado correctamente"});
});

app.listen(port, () => {
  console.log(`Listening to requests on port ${port}`);
});

// MissionCommander CRUD methods

app.get('/missionCommanders', async(req, res) => {
  const allMissionCommanders = await prisma.MissionCommander.findMany({});
  res.json(allMissionCommanders);
}); 

app.get('/missionCommanders/:id', async (req, res) => {
  const id = req.params.id;
  const missionCommander = await prisma.MissionCommander.findUnique({where: {id: parseInt(id)}});
  res.json(missionCommander);
});

app.post('/missionCommanders', async(req, res)=> {
  const missionCommander = {
    name: req.body.name,
    username: req.body.username,
    mainStack: req.body.mainStack,
    currentEnrollment: req.body.currentEnrollment,
    hasAzureCertification: req.body.hasAzureCertification
  };
  
  const message = 'Mission Commander creado.';
  await prisma.MissionCommander.create({data: missionCommander});
  return res.json({message});
});

app.put('/missionCommanders/:id', async (req, res) => {
	const id = parseInt(req.params.id);

	await prisma.MissionCommander.update({
		where: {
			id: id
		},
		data: {
			mainStack: req.body.mainStack
		}
	})

	return res.json({message: "Main Stack actualizado correctamente"});
});

app.delete('/missionCommanders/:id', async (req, res) => {
	const id = parseInt(req.params.id);
	await prisma.MissionCommander.delete({where: {id: id}});
	return res.json({message: "Eliminado correctamente"});
});