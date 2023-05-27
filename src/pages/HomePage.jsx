// import { UseUserDetails } from "../context/UserContext";
import { Navigate } from "react-router-dom";
import { tokenAtom } from '../utils/atom';
import { useAtom } from 'jotai';
import HomeTemplate from '../components/templates/HomeTemplate';

const Home = () => {
  // const [accessToken,] = useAtom(tokenAtom)
//   if (!accessToken) {
//     return <Navigate to="/login" />;
// }
  return (
    <div className='relative top-16 flex justify-center'>
      <HomeTemplate/>
    </div>
  )
}

export default Home