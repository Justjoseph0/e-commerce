import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

const SidebarLink = ({ to, icon, label }) => {
  return (
    <NavLink
      to={to}
      end 
      className={({ isActive }) => `
        w-full text-gray-700 hover:bg-gray-200 
        transition block 
        ${isActive 
          ? 'bg-gray-800 text-white hover:bg-gray-700' 
          : 'hover:bg-gray-100'
        }
      `}
    >
      <div className="flex items-center px-4 py-4">
        {icon}
        {label}
      </div>
    </NavLink>
  );
};

SidebarLink.propTypes = {
  to: PropTypes.string.isRequired,
  icon: PropTypes.element.isRequired,
  label: PropTypes.string.isRequired,
};

export default SidebarLink;
