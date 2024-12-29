/* ProjectsSidebarContext.tsx */

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ProjectsSidebarContextType {
  checkedItems: string[];
  toggleItem: (item: string) => void;
}

const ProjectsSidebarContext = createContext<
  ProjectsSidebarContextType | undefined
>(undefined);

export const ProjectsSidebarProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [checkedItems, setCheckedItems] = useState<string[]>([]);

  const toggleItem = (item: string) => {
    setCheckedItems((prev) => {
      if (prev.includes(item)) {
        /* Remove item if already selected */
        return prev.filter((i) => i !== item);
      } else if (prev.length < 4) {
        /* Add item if under max limit */
        return [...prev, item];
      }
      /* Prevent adding more than 4 items */
      return prev;
    });
  };

  return (
    <ProjectsSidebarContext.Provider value={{ checkedItems, toggleItem }}>
      {children}
    </ProjectsSidebarContext.Provider>
  );
};

export const useProjectsSidebar = () => {
  const context = useContext(ProjectsSidebarContext);
  if (!context) {
    throw new Error(
      'useProjectsSidebar must be used within a ProjectsSidebarProvider'
    );
  }
  return context;
};
