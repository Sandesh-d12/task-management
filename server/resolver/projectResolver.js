const Project = require("../database/model/Project");
const { addProject, getAllProject } = require("../service/project-service");

const projectResolver = {
  Query: {
    getProjects: async () => await getAllProject(),
  },
  Mutation: {
    addProject: async (_, { projectInput }) => {
      const response = await addProject(projectInput);
      return response;
    },
  },
};

module.exports = projectResolver;
