const Sidebar = () => {
  return (
    <aside className='w-64 h-full border-r border-border bg-dark p-6'>
      <ul className='space-y-4'>
        <li className='text-foreground  text-sm'>📂 personal-info</li>
        <li className='text-foreground  text-sm'>📁 interests</li>
        <li className='text-foreground  text-sm'>
          📂 education
          <ul className='ml-4 space-y-2'>
            <li className='text-foreground text-xs'>high-school</li>
            <li className='text-foreground text-xs'>university</li>
          </ul>
        </li>
        <li className='text-foreground  text-sm'>📂 contacts</li>
      </ul>
    </aside>
  );
};

export default Sidebar;
