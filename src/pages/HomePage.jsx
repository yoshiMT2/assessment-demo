// import { UseUserDetails } from "../context/UserContext";
import { Navigate } from "react-router-dom";
import { tokenAtom } from '../utils/atom';
import { useAtom } from 'jotai';

const Home = () => {
  const [accessToken,] = useAtom(tokenAtom)
  if (!accessToken) {
    return <Navigate to="/login" />;
}
  return (
    <div className='bg-indigo-500 text-white text-7xl text-center'>Home</div>
  )
}

export default Home