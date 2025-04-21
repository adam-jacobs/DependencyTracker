import express from 'express';
import { addBuild, addDependency, getBuildId, getDependantBuildIds, getBuilds } from '../models/dependencyModel.js';

const dependencyRoutes = express.Router();

dependencyRoutes.post('/getDependencies', async (req, res) =>
{
    const body = req.body;

    try {
        const buildId = await getBuildId(body.buildName, body.buildVersion, body.userId);
        const dependantBuildIds = await getDependantBuildIds(buildId);
        const dependencies = await getBuilds(dependantBuildIds);

        res.status(200).json({dependencies});
    }
    catch (error){
        res.status(500).json({error: error.message});
    }

})

dependencyRoutes.put('/add', async (req, res) => 
{
    const body = req.body;

    try 
    {
        const buildId = await addBuild(body.name, body.version, body.id);
        const dependatntBuildId = await addBuild(body.dependantName, body.dependantVersion, body.id);
        await addDependency(buildId, dependatntBuildId);

        res.status(200).send();
    }
    catch (error)
    {
        res.status(500).json({error: error.message});
    }
})

export default dependencyRoutes;