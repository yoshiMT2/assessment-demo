// import { UseUserDetails } from "../context/UserContext";
import { Navigate } from "react-router-dom";
import { UseUserDetails } from '../context/UserContext';
import HomeTemplate from '../components/templates/HomeTemplate';


const Home = () => {
  const user = UseUserDetails()
  if (!user) {
    return <Navigate to="/login" />;
  }
  return (
    <div className='relative top-16 flex justify-center h-[calc(100vh-4rem)]'>
      <HomeTemplate />
    </div>
  )
}

export default Home