// FileContent.tsx

import React from 'react';
import Bio from '@/components/content/Bio';
import Education from '@/components/content/Education';
import Interests from '@/components/content/Interests';
import Resume from '@/components/content/Resume';

// Map of base file names to corresponding components
const contentComponents: Record<string, React.FC> = {
  bio: Bio,
  education: Education,
  interests: Interests,
  resume: Resume,
};

const FileContent = ({ fileName }: { fileName: string }) => {
  // Extract the base name from the full file name
  const baseName = fileName.split('.')[0];

  // Get the component corresponding to the baseName
  const ContentComponent =
    contentComponents[baseName] || (() => <p>Content not found.</p>);

  return (
    <div className='p-4 h-[calc(100vh-8.3rem)] custom-scrollbar'>
      <ContentComponent />
    </div>
  );
};

export default FileContent;
