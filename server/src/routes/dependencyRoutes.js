import { Router } from 'express';
import { addBuild, addDependency, getBuildId, getDependantBuildIds, getBuilds } from '../models/dependencyModel.js';

const dependencyRoutes = Router();

dependencyRoutes.post('/getDependencies', async (req, res) =>
{
    const body = req.body;

    if (body.buildName === undefined) return res.status(400).json({error: "Request must provide a build name"});
    if (body.buildVersion === undefined) return res.status(400).json({error: "Resquest must provide a build version"});
    if (body.userId === undefined) return res.status(400).json({error: "request must provide a user id"});

    try {
        let buildId = await getBuildId(body.buildName, body.buildVersion, body.userId);

        if (!buildId) return res.status(200).json({dependencies: [], matrix: []});

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