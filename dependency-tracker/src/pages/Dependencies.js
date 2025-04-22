import "./Dependencies.css";
import React, { useState, useEffect } from "react";
import XButton from '../components/XButton';
import AddDependenciesDialog from "./AddDependenciesDialog";

function Depencencies() {

  const [buildName, setBuildName] = useState('');
  const [buildVersion, setBuildVersion] = useState('');

  const [selectedProject, setSelectedProject] = useState('Selected Project');

  const [projects, setProjects] = useState(["Project A", "Project B", "Project C"]);
  const [data, setData] = useState([
    [0, 1, 2, 3],
    [4, 5, 6, 7],
    [8, 9, 10, 11],
  ]);

  const [ addDependenciesDialogVisible, setAddDependenciesDialogVisible] = useState(false);

  useEffect(() => {

  const getDependencies = async () => {

    const userId = localStorage.getItem('userId');

    const response = await fetch('http://localhost:5000/api/dependencies/getDependencies', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({userId, buildName, buildVersion})
    })

    if (!response.ok){
      //TODO: Handle failing to reach the server
    }

    if (response.status === 200){
      const result = await response.json();
      const newProjects = [];
      const newData = [];

      const dependencies = result.dependencies;

      for(let i = 0; i < dependencies.length; i++){
        const dependency = dependencies.at(i);
        newProjects.push(dependency.name);
        let row = [dependency.version];
        row = row.concat(Array(dependencies.length).fill('x'))
        newData.push(row);
      }

      setProjects(newProjects);
      setData(newData);
      setSelectedProject(buildName + ' ' + buildVersion)

      }
    }

  getDependencies();

  }, [buildName, buildVersion]);


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
        <div className="selector-grid-container">
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
              </div>
          </div>
          <div className="grid" style={{
            display: 'grid',
            gridTemplateColumns: `auto repeat(${projects.length + 1}, auto)`,
            gridTemplateRows: `auto repeat(${projects.length}, auto)`,
          }}>

            <div />
            <div className="x-label">{selectedProject}</div>
            
            {projects.map((project, i) => (
              <div className="x-label" >
                {project}
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
      </div>
      )}
      <div className="add-dependencies-container">
        {addDependenciesDialogVisible && <AddDependenciesDialog onClose={() => setAddDependenciesDialogVisible(false)} />}
      </div>
    </div>
  );
}

export default Depencencies;
