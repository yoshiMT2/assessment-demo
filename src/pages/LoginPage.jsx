import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import InputField from "../components/parts/InputField";
import Button from "../components/parts/Button";
import { useLogin } from "../utils/AuthService";

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [buttonEnabled, setButtonEnabled] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const { login } = useLogin()

  useEffect(() => {
    if (email && password) {
      setButtonEnabled(true);
    } else {
      setButtonEnabled(false);
    }
  }, [email, password, buttonEnabled]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate("/");
      // window.location.reload(false);
    } catch (error) {
      setErrorMessage(error);
      console.log(error)
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-indigo-100">
      <form
        className="p-10 bg-white rounded-xl drop-shadow-xl space-y-3"
        onSubmit={(e)=>submitHandler(e)}
      >
        <h1 className="text-indigo-600 text-3xl text-center">Sign In</h1>
        <p
          className={`text-red-600 text-sm text-center ${
            errorMessage ? "opacity-100" : "opacity-0"
          }`}
        >
          emailかパスワードが間違っています
        </p>
        <InputField
          className="lg:w-96 md:w-80 w-56 bg-indigo-50"
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <InputField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <NavLink
          to="/forgot"
          className="mt-2 text-sm font-semibold text-indigo-600 hover:text-indigo-700"
        >
          Forgot password?
        </NavLink>
        <Button
          title="Login"
          className="bg-indigo-600"
          disabled={!buttonEnabled}
        />
      </form>
    </div>
  );
}

export default LoginPage;
