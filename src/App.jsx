import NewProject from "./components/NewProject";
import ProjectsSidebar from "./components/ProjectsSidebar";
import NoProjectSelected from "./components/NoProjectSelected";
import { useState } from "react";
import SelectedProject from "./components/SelectedProject";


function App() {
  const [projectsState, setProjectsState] = useState({
    selectedProjectId: undefined,
    projects: [],
    tasks: []
  });

  

  function handleAddTask(text) {
    setProjectsState(prevState => {
      const taskId = Math.random();
      const newTask = {
        text: text,
        projectId: prevState.selectedProjectId,
        id: taskId
      }
      return {
        ...prevState,
        tasks: [...prevState.tasks, newTask]
      }
    })
  }
  
  function handleDeleteTask(id) {
    setProjectsState(prevState => {
      return {
        ...prevState,
        tasks: prevState.tasks.filter(
          task => task.id !== id
        )
      }
    });
  }

  function handleSelectProject(id) {
    setProjectsState(prevState => {
      return {
        ...prevState,
        selectedProjectId: id,
      }
    });
  }

  function handleDeleteProject() {
    setProjectsState(prevState => {
      return {
        ...prevState,
        selectedProjectId: undefined,
        projects: prevState.projects.filter(
          project => project.id !== prevState.selectedProjectId
        )
      }
    });
  }

  function handleStartAddProject(id) {
    setProjectsState(prevState => {
      return {
        ...prevState,
        selectedProjectId: null,
      }
    });
  }

  function handleCancelAddProject() {
    setProjectsState(prevState => {
      return {
        ...prevState,
        selectedProjectId: undefined
      }
    })
  }

  function handleAddProject(projectData) {
    setProjectsState(prevState => {
      const projectId = Math.random();
      const newProject = {
        ...projectData,
        id: projectId
      }
      return {
        ...prevState,
        selectedProjectId: undefined,
        projects: [...prevState.projects, newProject]
      }
    })
  }



  let content;

  if (projectsState.selectedProjectId === null) {
    content =
      <NewProject
        onCancel={handleCancelAddProject}
        onAdd={handleAddProject}
      />
  } else if (projectsState.selectedProjectId === undefined) {
    content =
      <NoProjectSelected
        onStartAddProject={handleStartAddProject}
      />
  } else {
    content =
      <SelectedProject
        tasks={projectsState.tasks}
        onDelete={handleDeleteProject}
        onAddTask={handleAddTask}
        onDeleteTask={handleDeleteTask}
        project={projectsState.projects.find(
          project => project.id === projectsState.selectedProjectId
        )}
      />
  }

  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectsSidebar
        projects={projectsState.projects}
        onStartAddProject={handleStartAddProject}
        onSelectProject={handleSelectProject}
        selectedProjectId={projectsState.selectedProjectId}
      />
      {content}
    </main>
  );
}

export default App;
