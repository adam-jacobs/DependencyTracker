import "./Dependencies.css";
import React, { useState } from "react";
import XButton from '../components/XButton';
import AddDependencyDialog from "./AddDependencyDialog";

function Depencencies() {

  const [ addDependencyDialogVisible, setAddDependencyDialogVisible] = useState(false);

  const projects = ["Project A", "Project B", "Project C"];
  const data = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
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
            gridTemplateColumns: `80px repeat(${projects.length}, 80px)`,
            gridAutoRows: '80px',
          }}>

            <div />
            
            {projects.map((project, i) => (
              <div style={{
                borderRight: '1px solid black',
                transform: 'rotate(180deg)',
                writingMode: 'vertical-rl'
              }}>
                {project}
              </div>
            ))}

            {projects.map((rowLabel, rowIndex) => (
              <React.Fragment>
                <div style={{
                  borderTop: '1px solid black'
                }}>
                  {rowLabel}
                  </div>
                {data[rowIndex].map((cell, colIndex) => (
                  <div style={{
                    border: '1px solid black',
                  }}>
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
