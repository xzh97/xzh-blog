import { useState } from 'react';
import { Link } from 'react-router-dom';
import Switch from '@/components/switch';
import { NavItem } from './interface';
import './customHeader.scss';
const CustomHeader = () => {
  const navList: NavItem[] = [
    {
      name: 'Blogs',
      url: '/blog',
    },
    {
      name: 'Categories',
      url: '/category',
    },
    {
      name: 'About',
      url: '/about',
    },
  ];
  const [mode, setMode] = useState(false);

  const handleModeChange = (val: boolean) => {
    setMode(val);
  };

  return (
    <nav className="navbar-container">
      <div className="navbar-left">
        <Link className="navbar-left-item" to="/home">
          xizh's Blog
        </Link>
      </div>
      <div className="navbar-right">
        {navList.map(nav => {
          return (
            <Link className="navbar-item" key={nav.url} to={nav.url}>
              {nav.name}
            </Link>
          );
        })}
        <div className="navbar-item theme-mode">
          <Switch value={mode} onChange={handleModeChange} />
        </div>
      </div>
    </nav>
  );
};

export default CustomHeader;
