import { NavLink } from "react-router-dom";

function LoginInput(props) {
  const { email, setEmail, password, setPassword, login, isLoading } = props;
  return (
    <div className="space-y-4" method="POST" onKeyDown={login}>
      <input
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email address"
        className="input-large "
      />
      <input
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        className="input-large "
      />
      <label className="flex items-center">
        <input
          id="default-checkbox"
          type="checkbox"
          value=""
          className="w-4 h-4 text-black mr-2 bg-gray-100 border-gray-300 rounded focus:ring-black "
        />
        <span className="text-sm">Remember me</span>
      </label>
      <button className="btn-primary" onClick={login} disabled={isLoading}>
        {isLoading ? "Loading" : "LOGIN"}
      </button>
      <NavLink to="/register">
        <p className="text-center mt-4 text-sm">
          Not have an account ? <u>Register here</u>
        </p>
      </NavLink>
    </div>
  );
}

export default LoginInput;
