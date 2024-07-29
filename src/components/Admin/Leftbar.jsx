import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Box, Users, LogOut } from 'lucide-react';

const DashboardIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M3 13h4v8H3zm6-8h4v16H9zm6 8h4v8h-4z"
    />
  </svg>
);

const Leftbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Perform any logout operations here (e.g., clearing auth tokens)
    navigate('/');
  };

  const AdminLinks = [
    {
      title: 'Dashboard',
      link: '/admin/dashboard',
      icon: DashboardIcon, // Use the SVG icon component
    },
    {
      title: 'Users',
      link: '/admin/users',
      icon: Users,
    },
    {
      title: 'Inventory',
      link: '/admin/inventory',
      icon: Box, // Use the Box icon from lucide-react
    },
  ];

  return (
    <div className='h-screen w-1/6 flex justify-center items-center flex-col bg-red-500/5 pt-10'>
      <div className='h-5/6 w-full flex flex-col justify-start items-center gap-4'>
        {AdminLinks.map((data, index) => (
          <NavLink key={index} to={data.link} className='p-5 border-b-4 border-gray-500 hover:border-primary font-bold mt-2 w-full'>
            <span className='flex flex-row items-center justify-start h-full w-full gap-2'>
              {React.createElement(data.icon, { size: 20 })}
              {data.title}
            </span>
          </NavLink>
        ))}
      </div>
      <div className='h-1/6 w-full flex flex-col justify-center items-center'>
        <button onClick={handleLogout} className='flex flex-row items-center gap-2'>
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Leftbar;
