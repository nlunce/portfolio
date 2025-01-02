/* ./components/Projects.tsx */
'use client';

import React, { useEffect, useState } from 'react';
import ProjectCard from './ProjectCard';
import { useProjectsSidebar } from '@/components/sidebars/ProjectsSidebar/ProjectsSidebarContext';
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
    <div className='h-screen overflow-y-auto pb-48'>
      {checkedItems.length > 0 ? (
        <div className='text-accent-tertiary h-20 pl-6 pt-4 mb-1'>
          import{' '}
          <span className='text-accent-tertiary'>
            {'{ '}
            {checkedItems.map((item, index) => (
              <span key={item} className='text-off-white'>
                {item}
                {index < checkedItems.length - 1 ? ', ' : ''}
              </span>
            ))}
            {' }'}
          </span>{' '}
          from{' '}
          <span className='text-accent-secondary'>
            &#39;@nathan-lunceford/projects&#39;
          </span>
        </div>
      ) : (
        <div className='text-accent-tertiary h-20 pl-6 pt-4 mb-1'>
          import <span className='text-accent'>*</span> from{' '}
          <span className='text-accent-secondary'>
            &#39;@nathan-lunceford/projects&#39;
          </span>
        </div>
      )}
      {/* Dynamic grid layout */}
      <div className='grid grid-cols-1 1250:grid-cols-2 1250:gap-x-14 1680:grid-cols-3 1680:gap-x-32 gap-y-20 pl-10  xl:px-24 place-items-stretch'>
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
    </div>
  );
}
