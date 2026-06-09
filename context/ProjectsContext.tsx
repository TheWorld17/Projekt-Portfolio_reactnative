import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { Project, defaultProjects } from '../data/projects';
import { saveData, loadData } from '../utils/storage';

const STORAGE_KEY = '@projects';

interface ProjectsContextType {
  projects: Project[];
  addProject: (project: Omit<Project, 'id'>) => void;
  removeProject: (id: string) => void;
  isLoading: boolean;
}

const ProjectsContext = createContext<ProjectsContextType>({
  projects: [],
  addProject: () => {},
  removeProject: () => {},
  isLoading: true,
});

export function ProjectsProvider({ children }: { children: React.ReactNode }) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load projects from AsyncStorage on mount
  useEffect(() => {
    (async () => {
      const stored = await loadData<Project[]>(STORAGE_KEY);
      if (stored && stored.length > 0) {
        setProjects(stored);
      } else {
        // First launch — use defaults
        setProjects(defaultProjects);
      }
      setIsLoading(false);
      setIsInitialized(true);
    })();
  }, []);

  // Persist whenever projects change (but only after initial load)
  useEffect(() => {
    if (isInitialized) {
      saveData(STORAGE_KEY, projects);
    }
  }, [projects, isInitialized]);

  const addProject = useCallback((project: Omit<Project, 'id'>) => {
    const newProject: Project = {
      ...project,
      id: Date.now().toString(),
    };
    setProjects((prev) => [...prev, newProject]);
  }, []);

  const removeProject = useCallback((id: string) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
  }, []);

  return (
    <ProjectsContext.Provider value={{ projects, addProject, removeProject, isLoading }}>
      {children}
    </ProjectsContext.Provider>
  );
}

export function useProjects() {
  const context = useContext(ProjectsContext);
  if (!context) {
    throw new Error('useProjects must be used within a ProjectsProvider');
  }
  return context;
}
