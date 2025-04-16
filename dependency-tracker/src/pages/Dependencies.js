import "./Dependencies.css";
import React, { useState } from "react";
import XButton from '../components/XButton';
import AddDependencyDialog from "./AddDependencyDialog";

function Depencencies() {

  const [ addDependencyDialogVisible, setAddDependencyDialogVisible] = useState(false);

  const projects = ["Project A", "Project B", "Project C"];
  const data = [
    [0, 1, 2, 3],
    [4, 5, 6, 7],
    [8, 9, 10, 11],
  ];

  return (
    <div className="page-wrapper">
      <div className="menu-bar">
        <XButton
          size={30}
          tooltip="Add dependency"
          onClick={() => setAddDependencyDialogVisible(true)}
        />
      </div>
      {!addDependencyDialogVisible && (
      <div className="dependencies-container">
        <div className="selector-grid-container">
          <div className="selector">
            <div>
              <label style={{fontWeight: 'bold', margin: '1rem'}}>Build:</label>
              <br />
                <input className="inpt" style={{margin: '1rem'}} placeholder="Enter project name"/>
                <input className="inpt" style={{margin: '1rem'}} placeholder="Enter project version"/>
              </div>
          </div>
          <div className="grid" style={{
            display: 'grid',
            gridTemplateColumns: `auto repeat(${projects.length + 1}, auto)`,
            gridTemplateRows: `auto repeat(${projects.length}, auto)`,
          }}>

            <div />
            <div className="x-label">Selected Project</div>
            
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
        {addDependencyDialogVisible && <AddDependencyDialog onClose={() => setAddDependencyDialogVisible(false)} />}
      </div>
    </div>
  );
}

export default Depencencies;
