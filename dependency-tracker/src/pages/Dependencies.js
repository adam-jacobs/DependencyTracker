import "./Dependencies.css";
import React, { useState } from "react";
import XButton from '../components/XButton';
import AddDependencyDialog from "./AddDependencyDialog";

function Depencencies() {

  const [ addDependencyDialogVisible, setAddDependencyDialogVisible] = useState(false);

  return (
    <div className="dependencies-container">
      <div className="menu-bar">
        <XButton
          size={30}
          tooltip="Add dependency"
          onClick={() => setAddDependencyDialogVisible(true)}
        />
      </div>
      <div className="add-dependencies-container">
        {addDependencyDialogVisible && <AddDependencyDialog onClose={() => setAddDependencyDialogVisible(false)} />}
      </div>
    </div>
  );
}

export default Depencencies;
