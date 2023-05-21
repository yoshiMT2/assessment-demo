import { NavLink } from 'react-router-dom';
import Sidebar from './Sidebar';
import { useAtom } from 'jotai';
import { tokenAtom, userAtom } from '../../utils/atom';

// eslint-disable-next-line react/prop-types
const SideNavigationLayout = ({ children }) => {
  const [, setAccessToken] = useAtom(tokenAtom)
  const [, setUser] = useAtom(userAtom)
  function onClickHandler() {
    setAccessToken('')
    setUser('')
  }
  return (
    <div className="h-screen w-full">
      <Sidebar />
      <NavLink
        className='hidden lg:flex justify-end pr-6 h-16 items-center'
        to='/login'
        onClick={()=> onClickHandler()}
      >
        ログアウト
      </NavLink>
      <main className="lg:pl-60 w-full h-full">{children}</main>
    </div>
  );
};

export default SideNavigationLayout;
