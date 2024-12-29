/* ./components/ProjectCard.tsx */
'use client';

import React from 'react';
import { CldImage } from 'next-cloudinary';
import { technologyIcons } from '@/utils/technologyIcons';
import { Technology } from '@/types/technology';
import Link from 'next/link';

interface ProjectCardProps {
  title: string;
  subtitle: string;
  description: string;
  imageSrc: string;
  technologies: Technology[];
  link: string;
  filteredTechnologies: Technology[];
}

export default function ProjectCard({
  title,
  subtitle,
  description,
  imageSrc,
  technologies,
  link,
  filteredTechnologies,
}: ProjectCardProps) {
  const displayedTechnologies =
    filteredTechnologies.length > 0
      ? technologies.filter((tech) => filteredTechnologies.includes(tech))
      : technologies.slice(0, 4);

  return (
    <div className='relative w-80'>
      {/* Title Section */}
      <div className='absolute -top-8 left-0'>
        <h3 className='text-accent text-lg font-bold'>
          {title} <span className='text-foreground'>// {subtitle}</span>
        </h3>
      </div>

      {/* Card */}
      <div className='w-full h-96 flex flex-col bg-background-dark rounded-xl shadow-md border border-border overflow-hidden'>
        {/* Cloudinary Image */}
        <div className='relative h-48'>
          <CldImage
            src={imageSrc}
            width='800'
            height='400'
            alt={`Image for ${title}`}
            crop='fill'
            className='w-full h-full object-cover'
          />
        </div>

        {/* Description */}
        <div className='p-4 flex flex-col justify-between flex-1'>
          <p className='text-off-white text-xs mb-4'>{description}</p>
          {/* Button */}
          <Link
            href={link}
            target='_blank'
            rel='noopener noreferrer'
            className='px-4 py-2 bg-foreground text-off-white rounded-lg hover:bg-accent transition text-center'
          >
            view-project
          </Link>
        </div>
      </div>

      {/* Technologies Icons */}
      <div className='absolute top-4 -right-8 flex flex-col space-y-2'>
        {displayedTechnologies.map((tech, index) => (
          <div key={index}>{technologyIcons[tech]}</div>
        ))}
      </div>
    </div>
  );
}
