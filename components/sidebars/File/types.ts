// types.ts
export interface FileProps {
  name: string;
  fileType: string;
  onClick: () => void;
  selected?: boolean; // New optional prop
}
