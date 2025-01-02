import React from 'react';
import Bio from '@/components/content/Bio';
import Education from '@/components/content/Education';
import Interests from '@/components/content/Interests';
import Resume from '@/components/content/Resume';

// Map of file names to corresponding components
const contentComponents: Record<string, React.FC> = {
  bio: Bio,
  education: Education,
  interests: Interests,
  resume: Resume,
};

const FileContent = ({ fileName }: { fileName: string }) => {
  // Get the component corresponding to the fileName
  const ContentComponent =
    contentComponents[fileName] || (() => <p>Content not found.</p>);

  return (
    <div className='p-4'>
      <ContentComponent />
    </div>
  );
};

export default FileContent;
