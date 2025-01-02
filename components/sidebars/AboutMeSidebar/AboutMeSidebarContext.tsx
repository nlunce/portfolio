// AboutMeSidebarContext.tsx

'use client';
import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the shape of the context
interface AboutMeSidebarContextType {
  selectedFile: string | null;
  selectFile: (fileName: string | null) => void;
}

// Create the context with default undefined
const AboutMeSidebarContext = createContext<
  AboutMeSidebarContextType | undefined
>(undefined);

// Create a provider component
export const AboutMeSidebarProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [selectedFile, setSelectedFile] = useState<string | null>(null);

  // Function to select or deselect a file
  const selectFile = (fileName: string | null) => {
    setSelectedFile((prev) => (prev === fileName ? null : fileName)); // Toggle selection
  };

  return (
    <AboutMeSidebarContext.Provider value={{ selectedFile, selectFile }}>
      {children}
    </AboutMeSidebarContext.Provider>
  );
};

// Custom hook to use the context
export const useAboutMeSidebar = () => {
  const context = useContext(AboutMeSidebarContext);
  if (!context) {
    throw new Error(
      'useAboutMeSidebar must be used within an AboutMeSidebarProvider'
    );
  }
  return context;
};
