import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Button from "../components/button";
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
    <div className="flex flex-col items-center justify-start min-h-screen ">
      <form
        className="p-5"
        onSubmit={(e) => submitHandler(e)}
      >
        <h1 className="text-indigo-600 pt-32 mb-5 text-3xl text-center">ロゴ</h1>
        <p
          className={`text-red-600 text-sm text-center ${errorMessage ? "opacity-100" : "opacity-0"
            }`}
        >
          emailかパスワードが間違っています
        </p>
        <p className='ml-3 mb-1'>メールアドレス</p>
        <input
          className="lg:w-96 md:w-80 w-56 rounded-full focus:border-0 "
          label="メールアドレス"
          type="email"
          value={email}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <p className='ml-3 mb-1 mt-4'>パスワード</p>
        <input
          className="lg:w-96 md:w-80 w-56 rounded-full focus:border-0 "
          label="パスワード"
          type="password"
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button
          title="Login"
          className="mt-8 lg:w-96 md:w-80 w-56"
          disabled={!buttonEnabled}
        />
      </form>
      <NavLink
        to="/forgot"
        className="-mt-1 underline text-sm hover:opacity-60 transition-opacity"
      >
        パスワードを忘れた場合
      </NavLink>
    </div>
  );
}

export default LoginPage;
