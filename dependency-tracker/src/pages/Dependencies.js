import "./Dependencies.css";
import React, { useState, useEffect, useRef } from "react";
import XButton from '../components/XButton';
import AddDependenciesDialog from "./AddDependenciesDialog";

function Depencencies() {

  const [buildName, setBuildName] = useState('');
  const [buildVersion, setBuildVersion] = useState('');

  const [selectedProject, setSelectedProject] = useState('');

  const [projects, setProjects] = useState([]);
  const [nugetPackages, setNugetPackages] = useState([]);
  const [data, setData] = useState([[]]);

  const [showExternals, setShowExternals] = useState(false);

  const dependenciesRef = useRef([]);
  const matrixRef = useRef([[]]);

  const [ addDependenciesDialogVisible, setAddDependenciesDialogVisible] = useState(false);

  useEffect(() => {

    const getDependencies = async () => {

      const userId = localStorage.getItem('userId');

      try {
        const response = await fetch('http://localhost:5000/api/dependencies/getDependencies', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({userId, buildName, buildVersion})
        })
      
        const result = await response.json();
        
        if (!response.ok){
          console.log(result.error);
        }
      
        if (response.status === 200){
          const dependenciesResponse = result.dependencies;
          
          if (dependenciesResponse.length > 0){
            dependenciesRef.current = dependenciesResponse;
            matrixRef.current = result.matrix;
            populateGrid();
            setSelectedProject(buildName + ' ' + buildVersion);
          }
        }
      }
      catch (error){
          console.log(error.message);
      }
    }

  getDependencies();

  }, [buildName, buildVersion]);

  useEffect(() => {
    populateGrid();
  }, [showExternals]);

function populateGrid(){
  
  const dependencies = dependenciesRef.current;
  
  if (dependencies.length > 0){
    
    const nugetPackages = dependencies.filter(d => d.is_external === false);
    const nugetPackagesCount = nugetPackages.length;
    const matrix = matrixRef.current;

    const newProjects = nugetPackages.map(np => np.name);
    const newVersions = [];

    for(let row = 0; row < nugetPackagesCount; row++){
      
      const dependency = nugetPackages.at(row);
      
      let rowVersions = [dependency.version];
      
      rowVersions = rowVersions.concat(Array(nugetPackagesCount).fill('x'))
      
      const dependencyDependencies = matrix[row];

      if (dependencyDependencies.length > 0){
          
        for (const dependencyDependency of dependencyDependencies){

          const j = newProjects.indexOf(dependencyDependency.name) + 1;
          rowVersions[j] = dependencyDependency.version;

        }
      }
      
      newVersions.push(rowVersions);
    }

    if (showExternals){
      const externalDependencies = dependencies.filter(d => d.is_external === true);

      for (const externalDependency of externalDependencies){
        
        newProjects.push(externalDependency.name);
        let rowVersions = [externalDependency.version];
        rowVersions = rowVersions.concat(Array(nugetPackagesCount).fill('x'))
        newVersions.push(rowVersions);

      }

    }

    setProjects(newProjects);
    setNugetPackages(nugetPackages.map(np => np.name));
    setData(newVersions);
  }
}

  return (
    <div className="page-wrapper">
      <div className="menu-bar">
        <XButton
          size={30}
          tooltip="Add dependency"
          onClick={() => setAddDependenciesDialogVisible(true)}
        />
      </div>
      {!addDependenciesDialogVisible && (
      <div className="dependencies-container">
          <div className="selector">
            <div>
              <label style={{fontWeight: 'bold', margin: '1rem'}}>Build:</label>
              <br />
              <input 
                className="inpt" 
                style={{margin: '1rem'}} 
                placeholder="Enter project name"
                value={buildName}
                onChange={(e) => setBuildName(e.target.value)}/>
              <input 
                className="inpt" 
                style={{margin: '1rem'}} 
                placeholder="Enter project version"
                value={buildVersion}
                onChange={(e) => setBuildVersion(e.target.value)}/>
              <br />
              <label>
                <input 
                  type="checkbox"
                  style={{margin:'1rem'}}
                  onChange={e => setShowExternals(e.target.checked)}/>
                  Show External Dependencies
              </label>
            </div>
          </div>
          <div className="grid" style={{
            display: 'grid',
            gridTemplateColumns: `auto repeat(${nugetPackages.length + 1}, auto)`,
            gridTemplateRows: `auto repeat(${projects.length}, auto)`,
          }}>

            <div />
            {selectedProject !== '' &&
            <div className="x-label">{selectedProject}</div>
            }
            
            {nugetPackages.map((nugetPackage, i) => (
              <div className="x-label" >
                {nugetPackage}
              </div>
            ))}

            {projects.map((rowLabel, rowIndex) => (
              <React.Fragment >
                <div style={{
                  borderTop: '1px solid black'
                }}>
                  {rowLabel}
                  </div>
                {data[rowIndex].map((cell, colIndex) => (
                  <div style={{borderLeft: '1px solid black', borderTop: '1px solid black'}}>
                    {cell}
                  </div>
                ))}
              </React.Fragment>
            ))}

            </div>
      </div>
      )}
      <div className="add-dependencies-container">
        {addDependenciesDialogVisible && <AddDependenciesDialog onClose={() => setAddDependenciesDialogVisible(false)} />}
      </div>
    </div>
  );
}

export default Depencencies;
