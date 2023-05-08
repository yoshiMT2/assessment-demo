import { NavLink } from 'react-router-dom';
import Sidebar from './Sidebar';

// eslint-disable-next-line react/prop-types
const SideNavigationLayout = ({ children }) => {
  return (
    <div className="h-screen w-full">
      <Sidebar />
      <NavLink
        className='hidden lg:flex justify-end pr-6 h-16 items-center'
        to='/login'
      >
        ログアウト
      </NavLink>
      <main className="lg:pl-60 w-full h-full">{children}</main>
    </div>
  );
};

export default SideNavigationLayout;
