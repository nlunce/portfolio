import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AboutMeSidebarContextType {
  currentFile: string;
  selectFile: (file: string) => void;
}

const AboutMeSidebarContext = createContext<
  AboutMeSidebarContextType | undefined
>(undefined);

export const AboutMeSidebarProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [currentFile, setCurrentFile] = useState<string>('bio'); // Default file

  const selectFile = (file: string) => {
    setCurrentFile(file);
  };

  return (
    <AboutMeSidebarContext.Provider value={{ currentFile, selectFile }}>
      {children}
    </AboutMeSidebarContext.Provider>
  );
};

export const useAboutMeSidebar = () => {
  const context = useContext(AboutMeSidebarContext);
  if (!context) {
    throw new Error(
      'useAboutMeSidebar must be used within an AboutMeSidebarProvider'
    );
  }
  return context;
};
