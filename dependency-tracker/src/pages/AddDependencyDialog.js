import { React, useEffect, useState } from 'react';
import XButton  from '../components/XButton.js';
import './AddDependencyDialog.css';
import '../App.css';

const AddDependencyDialog = ({ onClose }) => {

  const [name, setName] = useState('');
  const [version, setVersion] = useState('');
  const [dependantName, setDependantName] = useState('');
  const [dependantVersion, setDependantVersion] = useState('');
  const [buildsMatchError, setBuildsMatchError] = useState(null);

  const s_buildMatchErrorTooltip = "The builds cannot be the same";

  useEffect(() => 
  {
    updateBuildsMatchError();

  }, [name, version, dependantName, dependantVersion])

  const updateBuildsMatchError = () => 
  {
    if ((name != '' && name == dependantName) &&
      (version != '' && version == dependantVersion)) 
      {
        setBuildsMatchError("The builds cannot match");
      }
    else
    {
      setBuildsMatchError(null);
    }
  }

  const handleAdd = async (e) => 
  {
    e.preventDefault()

    const id = localStorage.getItem("userId");

    try 
    {
      const response = await fetch("http://localhost:5000/api/dependencies/add", {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({id, name, version, dependantName, dependantVersion})
      });

      if (!response.ok)
      {
        const result = await response.json();

        throw new Error(result.error);
      }

      if (response.status == 200)
      {
        setName('');
        setVersion('');
        setDependantName('');
        setDependantVersion('');
      }
    }
    catch (error) {}
  }

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
              tooltip="close"
            />
          </div>
        </div>
        <div className="content-container">
          <form onSubmit={handleAdd}>
            <div className="form-container">
              <div className="name-version-label">
                <label>Name:</label>
                <label>Version:</label>
              </div>
              <div className="name-version">
                <input
                  title={buildsMatchError ? null : s_buildMatchErrorTooltip}
                  className={buildsMatchError ? "input-error" : ""}
                  placeholder="Project name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <input
                  title={buildsMatchError ? null : s_buildMatchErrorTooltip}
                  className={buildsMatchError ? "input-error" : ""}
                  placeholder="Project version"
                  required
                  value={version}
                  onChange={(e) => setVersion(e.target.value)}
                />
              </div>
              <label style={{ display: "flex", margin: "1rem" }}>
                Depends on
              </label>
              <div className="name-version-label">
                <label>Name:</label>
                <label>Version:</label>
              </div>
              <div className="name-version">
                <input
                  title={buildsMatchError ? null : s_buildMatchErrorTooltip}
                  className={buildsMatchError ? "input-error" : ""}
                  placeholder="Project name"
                  required
                  value={dependantName}
                  onChange={(e) => setDependantName(e.target.value)}
                />
                <input
                  title={buildsMatchError ? null : s_buildMatchErrorTooltip}
                  className={buildsMatchError ? "input-error" : ""}
                  placeholder="Project version"
                  required
                  value={dependantVersion}
                  onChange={(e) => setDependantVersion(e.target.value)
                  }
                />
              </div>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <button className="btn" type="submit" disabled={buildsMatchError}>
                  Add
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
}

export default AddDependencyDialog