import express from 'express';
import { addBuild, addDependency } from '../models/addDependencyModel.js';

const dependencyRoutes = express.Router();

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