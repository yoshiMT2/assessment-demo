import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Assesment from './pages/AssessmentPage';
import Home from './pages/HomePage';
import Resigter from './pages/RegisterPage';
import Result from './pages/ResultPage';
import Team from './pages/TeamPage';
import LoginPage from './pages/LoginPage';
import ForgotPage from './pages/ForgotPage';
import SideNavigationLayout from './components/Layout';
function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path='/login' element={<LoginPage />} />
          <Route path='/forgot' element={<ForgotPage />} />
          <Route
            path="*"
            element={
              <SideNavigationLayout>
                <Routes>
                  <Route path='/' element={<Home />} />
                  <Route path='/assessment' element={<Assesment />} />
                  <Route path='/result' element={<Result />} />
                  <Route path='/team' element={<Team />} />
                  <Route path='/register' element={<Resigter />} />
                </Routes>
              </SideNavigationLayout>
            }
          />
        </Routes>
      </Router>
    </>
  )
}

export default App
