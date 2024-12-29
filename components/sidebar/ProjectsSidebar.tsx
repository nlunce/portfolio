/* eslint-disable */
/* ./components/sidebar/ProjectsSidebar.tsx */
'use client';
import React from 'react';

// Icons
import {
  FaCaretDown,
  FaPython,
  FaAws,
  FaDocker,
  FaReact,
  FaHtml5,
  FaCss3,
  FaJava,
} from 'react-icons/fa';
import { RiNextjsFill, RiTailwindCssFill } from 'react-icons/ri';
import { FaGolang, FaCheck } from 'react-icons/fa6';
import {
  SiAuth0,
  SiTerraform,
  SiQuarto,
  SiPandas,
  SiPolars,
  SiDatabricks,
  SiDotnet,
  SiTypescript,
} from 'react-icons/si';
import { IoLogoJavascript } from 'react-icons/io5';

interface TechItem {
  name: string;
  Icon: React.ComponentType<any>;
  defaultChecked?: boolean;
}

// Organized for a Full Stack Employer
const techItems: TechItem[] = [
  // High-value backend/cloud fundamentals
  { name: 'Python', Icon: FaPython },
  { name: 'AWS', Icon: FaAws },
  { name: 'Docker', Icon: FaDocker },
  { name: 'Terraform', Icon: SiTerraform },

  // Leading front-end frameworks & languages
  { name: 'React', Icon: FaReact },
  { name: 'NEXT.JS', Icon: RiNextjsFill },
  { name: 'TypeScript', Icon: SiTypescript },
  { name: 'JavaScript', Icon: IoLogoJavascript },

  // Additional backend stacks & popular languages
  { name: '.NET', Icon: SiDotnet },
  { name: 'Java', Icon: FaJava },
  { name: 'Go', Icon: FaGolang },

  // Identity/Auth
  { name: 'Auth0', Icon: SiAuth0 },

  // Core Web
  { name: 'HTML', Icon: FaHtml5 },
  { name: 'CSS', Icon: FaCss3 },
  { name: 'Tailwind CSS', Icon: RiTailwindCssFill },

  // Data / Scripting Tools
  { name: 'Polars', Icon: SiPolars },
  { name: 'Pandas', Icon: SiPandas },
  { name: 'Databricks', Icon: SiDatabricks },
  { name: 'Quarto', Icon: SiQuarto },
];

export default function ProjectsSidebar() {
  return (
    <aside
      className='
        hidden md:block
        bg-background border-r border-border
        md:w-[calc(12rem+1.5rem)]
        lg:w-[calc(16rem+1.5rem)]
        overflow-y-auto
      '
    >
      <nav>
        {/* Heading row */}
        <div className='flex items-center py-2 border-b border-border px-6'>
          <FaCaretDown />
          <span className='text-foreground text-sm pl-1'>projects</span>
        </div>

        {/* Mapped tech items */}
        {techItems.map(({ name, Icon, defaultChecked }, idx) => (
          <div key={idx} className='flex items-center gap-2 px-6 py-2'>
            <label className='relative flex items-center'>
              {/* Hidden Checkbox */}
              <input
                type='checkbox'
                defaultChecked={defaultChecked}
                className='
                  peer relative appearance-none w-4 h-4 border-2 border-border rounded-sm bg-background
                  checked:bg-foreground checked:border-transparent focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-border
                '
              />

              {/* Centered Check Icon */}
              <svg
                className='absolute w-4 h-4 hidden peer-checked:block text-off-white pointer-events-none'
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='3'
                strokeLinecap='round'
                strokeLinejoin='round'
              >
                <path d='M5 12l5 5L20 7' />
              </svg>
            </label>
            <Icon />
            <span className='text-sm text-foreground'>{name}</span>
          </div>
        ))}
      </nav>
    </aside>
  );
}
