const Project = require("../database/model/Project");

const addProject = async ({ title, userId }) => {
    if (!title || !userId) {
      return {
        success: false,
        message: "all fields are required",
        project: null,  
      };
    }
  
    const project = new Project({ title, userId });
  
    try {
      const savedProject = await project.save();
  
      return {
        success: true,
        message: "Project added successfully!",
        project: {
          id: savedProject._id,  
          title: savedProject.title,  
          userId: savedProject.userId
        },
      };
    } catch (error) {
      console.error("Error saving project:", error.message);
  
      return {
        success: false,
        message: "Failed to add project",
        project: null, 
      };
    }
  };


  const getAllProject = async () => {
    const projects = await Project.find()
    if(projects){
      console.log(projects)
      return projects;
    }throw new Error('Can not find project')
  }
  

module.exports = {
  addProject,
  getAllProject
};
