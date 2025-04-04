import { React } from 'react';
import XButton  from '../components/XButton.js'
import './AddDependencyDialog.css';

const AddDependencyDialog = ({ onClose }) => {
    return (
      <div className="container">
        <div className="header-container">
          <div className="title-container">
            <h1 className="title">Add dependency</h1>
          </div>
          <div className="close-button-container">
            <XButton
              size={30}
              rotation={45}
              onClick={onClose}
              tooltip='close'
            />
          </div>
        </div>
      </div>
    );
}

export default AddDependencyDialog;