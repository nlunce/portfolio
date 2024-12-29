/* utils/technologyIcons.tsx */

import { JSX } from 'react';
import {
  FaAws,
  FaDocker,
  FaReact,
  FaJava,
  FaHtml5,
  FaCss3,
} from 'react-icons/fa';
import { RiNextjsFill, RiTailwindCssFill, RiNextjsLine } from 'react-icons/ri';
import { FaGolang } from 'react-icons/fa6';
import {
  SiTerraform,
  SiDatabricks,
  SiPython,
  SiTypescript,
  SiJavascript,
  SiDotnet,
  SiAuth0,
  SiPolars,
  SiPandas,
  SiQuarto,
} from 'react-icons/si';
import { Technology } from '@/types/technology';

export const technologyIcons: Record<Technology, JSX.Element> = {
  Python: <SiPython style={{ color: '#3776AB', fontSize: '1.50rem' }} />,
  AWS: <FaAws style={{ color: '#FF9900', fontSize: '1.50rem' }} />,
  Docker: <FaDocker style={{ color: '#2496ED', fontSize: '1.50rem' }} />,
  Terraform: <SiTerraform style={{ color: '#623CE4', fontSize: '1.50rem' }} />,
  React: <FaReact style={{ color: '#61DAFB', fontSize: '1.50rem' }} />,
  'NEXT.JS': <RiNextjsFill style={{ color: '#ffffff', fontSize: '1.50rem' }} />,
  TypeScript: (
    <SiTypescript style={{ color: '#007ACC', fontSize: '1.50rem' }} />
  ),
  JavaScript: (
    <SiJavascript style={{ color: '#F7DF1E', fontSize: '1.50rem' }} />
  ),
  '.NET': <SiDotnet style={{ color: '#512BD4', fontSize: '1.50rem' }} />,
  Java: <FaJava style={{ color: '#007396', fontSize: '1.50rem' }} />,
  Go: <FaGolang style={{ color: '#00ADD8', fontSize: '1.50rem' }} />,
  Auth0: <SiAuth0 style={{ color: '#EB5424', fontSize: '1.50rem' }} />,
  HTML: <FaHtml5 style={{ color: '#E34F26', fontSize: '1.50rem' }} />,
  CSS: <FaCss3 style={{ color: '#1572B6', fontSize: '1.50rem' }} />,
  Tailwind: (
    <RiTailwindCssFill style={{ color: '#06B6D4', fontSize: '1.50rem' }} />
  ),
  Polars: <SiPolars style={{ color: '#C92770', fontSize: '1.50rem' }} />,
  Pandas: <SiPandas style={{ color: '#ffffff', fontSize: '1.50rem' }} />,
  Databricks: (
    <SiDatabricks style={{ color: '#FF3621', fontSize: '1.50rem' }} />
  ),
  Quarto: <SiQuarto style={{ color: '#3B3B3B', fontSize: '1.50rem' }} />,
};
