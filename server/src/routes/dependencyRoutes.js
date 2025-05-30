import express from 'express';
import { addBuild, addDependency, getBuildId, getDependantBuildIds, getBuilds } from '../models/dependencyModel.js';

const dependencyRoutes = express.Router();

dependencyRoutes.post('/getDependencies', async (req, res) =>
{
    const body = req.body;

    if (body.buildName === undefined ||
        body.buildVersion === undefined ||
        body.userId === undefined){
            res.status(400).json({error: "request must provide a buildName, buildVersion and userId"});
            return;
        }

    try {
        let buildId = await getBuildId(body.buildName, body.buildVersion, body.userId);

        if (buildId === null){
            res.status(200).json({dependencies: [], matrix: []});
            return;
        }

        let dependantBuildIds = await getDependantBuildIds(buildId);
        const dependencies = await getBuilds(dependantBuildIds);

        const matrix = [];
        const nugetPackages = dependencies.filter(d => d.is_external === false);

        for (const nugetPackage of nugetPackages){
            buildId = await getBuildId(nugetPackage.name, nugetPackage.version, body.userId);
            dependantBuildIds = await getDependantBuildIds(buildId);
            const nugetPackageDependencies = (await getBuilds(dependantBuildIds)).filter(d => nugetPackages.some(np => np.name === d.name));
            matrix.push(nugetPackageDependencies);
        }

        res.status(200).json({dependencies, matrix});
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