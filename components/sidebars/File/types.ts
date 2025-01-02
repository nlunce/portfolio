export type FileProps = {
  name: string;
  fileType: 'md' | 'js' | 'ts' | 'jsx' | 'tsx' | 'json' | 'css' | 'pdf';
  onClick?: () => void; // Optional onClick function
};
