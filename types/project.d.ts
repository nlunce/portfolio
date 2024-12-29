import { Technology } from '@/types/technology';
export interface Project {
  title: string;
  description: string;
  imageSrc: string;
  technologies: Technology[];
  link: string;
  filteredTechnologies?: Technology[];
}
