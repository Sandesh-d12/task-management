import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentProject } from "../redux/authSlice";
import { useGetProjects } from "../api/hooks/useProject";

function SelectProject() {
  const [selectedProject, setSelectedProject] = useState("");
  const {projects} = useGetProjects()
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setCurrentProject(selectedProject));
    navigate('/')
  };


  return (
    <Layout>
      <div>
        bjjb
        <form onSubmit={handleSubmit}>
          <select
            value={selectedProject}
            onChange={(e) => setSelectedProject(e?.target?.value)}
          >
            {
              <>
                <option value="">-- Select --</option>
                {projects?.map(({id, title}) => (
                  <option value={id} key={id}>{title}</option>
                ))}
              </>
            }

          </select>
          <button type="submit">confirm</button>
        </form>
      </div>
      {/* <ul>
        {projects?.map((item)=>((
            <>
            <li>{item?.id}</li>
            <li>{item.title}</li>
            </>

        )))}
      </ul> */}
    </Layout>
  );
}

export default SelectProject;
