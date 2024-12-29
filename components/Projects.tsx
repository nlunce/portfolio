/* ./components/Projects.tsx */

'use client';

import React, { useEffect, useState } from 'react';
import ProjectCard from './ProjectCard';
import { useProjectsSidebar } from '@/components/sidebars/projects-sidebar/ProjectsSidebarContext';
import { Project } from '@/types/project';
import { Technology } from '@/types/technology';

export default function Projects() {
  const { checkedItems } = useProjectsSidebar();
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const response = await fetch('/data/projects.json');
      const data: Project[] = await response.json();
      setProjects(data);
    };

    fetchProjects();
  }, []);

  const filteredProjects =
    checkedItems.length > 0
      ? projects.filter((project) =>
          project.technologies.some((tech) =>
            (checkedItems as Technology[]).includes(tech)
          )
        )
      : projects;

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  pt-20 pl-24 '>
      {filteredProjects.map((project, index) => (
        <ProjectCard
          key={project.title}
          title={`Project ${index + 1}`}
          subtitle={project.title}
          description={project.description}
          imageSrc={project.imageSrc}
          technologies={project.technologies}
          link={project.link}
          filteredTechnologies={checkedItems as Technology[]}
        />
      ))}
    </div>
  );
}
