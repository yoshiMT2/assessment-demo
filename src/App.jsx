import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Assesment from './pages/AssessmentPage';
import Home from './pages/HomePage';
import RegisterMember from './pages/RegisterMemberPage';
import Result from './pages/ResultPage';
import Team from './pages/TeamPage';
import LoginPage from './pages/LoginPage';
import ForgotPaswordPage from './pages/ForgotPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import SideNavigationLayout from './components/Layout';
// import { UserProvider } from "./context/UserContext";


function App() {

  return (
    <>
      <Router>
        {/* <UserProvider> */}
          <Routes>
            <Route path='/login' element={<LoginPage />} />
            <Route path='/forgot' element={<ForgotPaswordPage />} />
            <Route path="/reset">
              <Route path=":resetkey" element={<ResetPasswordPage />}/>
            </Route>
            <Route
              path="*"
              element={
                <SideNavigationLayout>
                  <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/assessment' element={<Assesment />} />
                    <Route path='/result' element={<Result />} />
                    <Route path='/team' element={<Team />} />
                    <Route path='/register/member' element={<RegisterMember />} />
                  </Routes>
                </SideNavigationLayout>
              }
            />
          </Routes>
        {/* </UserProvider> */}

      </Router>
    </>
  )
}

export default App
