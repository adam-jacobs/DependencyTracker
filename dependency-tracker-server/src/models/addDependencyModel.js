import database from '../config/db.js';

export async function addBuild (name, version, userId) 
{
    const { data, error } = await database.from("builds").upsert(
      [
        {
          name: name,
          version: version,
          user_id: userId,
        },
      ],
      { 
        onConflict: ["name", "version", "user_id"], 
        returning: "respresentation"
    });

    if (error) throw (error);
    
    if (data && data.lenth > 0)
    {
        return data[0].id;
    }
    else 
    {
        const { data, error } = await database
          .from("builds")
          .select("id")
          .eq("name", name)
          .eq("version", version)
          .eq("user_id", userId);

        if (error) throw error;

        return data[0].id;
    }
}

export async function addDependency (buildId, dependentBuildId) 
{
    const {data, error } = await database.from("dependencies").upsert(
        {
            build_1: buildId,
            build_2: dependentBuildId
        },
        {
            onConflict: ["build_1", "build_2"]
        });

    if (error) throw error;
}