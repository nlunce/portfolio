/* eslint-disable */
/* ./components/sidebar/ProjectsSidebar.tsx */

'use client';
import React from 'react';
import { useProjectsSidebar } from './ProjectsSidebarContext';

// Icons
import {
  FaAws,
  FaDocker,
  FaReact,
  FaHtml5,
  FaCss3,
  FaMarkdown,
  FaPython,
} from 'react-icons/fa';
import { PiSigmaThin } from 'react-icons/pi';
import { RiNextjsFill, RiTailwindCssFill } from 'react-icons/ri';
import { FaGolang } from 'react-icons/fa6';
import {
  SiTerraform,
  SiDatabricks,
  SiTypescript,
  SiJavascript,
  SiAuth0,
  SiPolars,
  SiPandas,
  SiQuarto,
  SiLatex,
} from 'react-icons/si';
import { IoCaretDownSharp } from 'react-icons/io5';

interface TechItem {
  name: string;
  Icon: React.ComponentType<any>;
  defaultChecked?: boolean;
}

const techItems: TechItem[] = [
  /* Backend/cloud fundamentals */
  { name: 'Python', Icon: FaPython },
  { name: 'AWS', Icon: FaAws },
  { name: 'Docker', Icon: FaDocker },
  { name: 'Terraform', Icon: SiTerraform },

  /* Front-end frameworks & languages */
  { name: 'React', Icon: FaReact },
  { name: 'NEXT.JS', Icon: RiNextjsFill },
  { name: 'TypeScript', Icon: SiTypescript },
  { name: 'JavaScript', Icon: SiJavascript },

  /* Additional backend stacks & popular languages */

  { name: 'Go', Icon: FaGolang },

  /* Identity/Auth */
  { name: 'Auth0', Icon: SiAuth0 },

  /* Core Web */
  { name: 'HTML', Icon: FaHtml5 },
  { name: 'CSS', Icon: FaCss3 },
  { name: 'Tailwind', Icon: RiTailwindCssFill },

  /* Data / Scripting Tools */
  { name: 'Polars', Icon: SiPolars },
  { name: 'Pandas', Icon: SiPandas },
  { name: 'Databricks', Icon: SiDatabricks },
  { name: 'Quarto', Icon: SiQuarto },
  { name: 'Markdown', Icon: FaMarkdown },
  { name: 'LaTeX', Icon: SiLatex },
  { name: 'Numerical Methods', Icon: PiSigmaThin },
];
export default function ProjectsSidebar() {
  const { checkedItems, toggleItem } = useProjectsSidebar();

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
          <IoCaretDownSharp className='text-off-white h-3 w-3 mr-1 cursor-pointer' />
          <span className='text-off-white text-sm pl-1 cursor-pointer'>
            projects
          </span>
        </div>

        {/* Mapped tech items */}
        {techItems.map(({ name, Icon }, idx) => (
          <div key={idx} className='flex items-center gap-2 px-6 py-2'>
            <label className='relative flex items-center'>
              <input
                type='checkbox'
                checked={checkedItems.includes(name)}
                onChange={() => toggleItem(name)}
                disabled={
                  !checkedItems.includes(name) && checkedItems.length >= 4
                }
                className={`
                  peer relative appearance-none w-4 h-4 border-2 border-border rounded-sm bg-background
                  checked:bg-foreground checked:border-transparent focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-border
                  ${
                    checkedItems.length >= 4 && !checkedItems.includes(name)
                      ? 'opacity-50 cursor-not-allowed'
                      : ''
                  }
                `}
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
