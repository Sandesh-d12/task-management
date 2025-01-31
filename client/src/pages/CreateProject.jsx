import React, { useState } from "react";
import { useCreateProject, useGetProjects } from "../api/hooks/useProject";
import Layout from "../components/Layout";
import { useNavigate } from "react-router-dom";

function CreateProject() {
  const { handleCreateProject } = useCreateProject();
  const [projectName, setProjectName] = useState("");
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();

    handleCreateProject({
      title: projectName,
    });
    navigate('/select-project')
  };


  return (
    <Layout>
      <div>
        bjjb
        <form onSubmit={handleSubmit}>
          <label>Enter Project Name:</label>
          <input
            type="text"
            required
            value={projectName}
            onChange={(e) => {
              setProjectName(e.target.value);
            }}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    </Layout>
  );
}

export default CreateProject;
