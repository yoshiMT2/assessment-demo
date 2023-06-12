import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Assesment from './pages/AssessmentPage';
import Home from './pages/HomePage';
import RegisterMember from './pages/RegisterMemberPage';
import RegisterTeam from './pages/RegisterTeamPage'
import RegisterCompany from './pages/RegisterCompanyPage';
import Result from './pages/ResultPage';
import Team from './pages/TeamPage';
import LoginPage from './pages/LoginPage';
import ForgotPaswordPage from './pages/ForgotPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import SideNavigationLayout from './components/Layout';
import { UserProvider } from "./context/UserContext";


function App() {

  return (
    <>
      <Router>
        <UserProvider>
          <Routes>
            <Route path='/login' element={<LoginPage />} />
            <Route path='/forgot' element={<ForgotPaswordPage />} />
            <Route path="/password/reset">
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
                    <Route path='/register/team' element={<RegisterTeam />} />
                    <Route path='/register/company' element={<RegisterCompany />} />
                  </Routes>
                </SideNavigationLayout>
              }
            />
          </Routes>
        </UserProvider>
      </Router>
    </>
  )
}

export default App
