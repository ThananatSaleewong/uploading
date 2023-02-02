import { NavLink } from "react-router-dom";
import Layout from "../Layout";
function RegisterInput(props) {
  const {
    email,
    setEmail,
    password,
    setPassword,
    passwordConfirm,
    setPasswordConfirm,
    handleOnSubmit,
  } = props;
  return (
    <div className="space-y-4">
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
      <input
        type="password"
        onChange={(e) => setPasswordConfirm(e.target.value)}
        placeholder="Confirm Password"
        className="input-large "
      />

      <button onClick={handleOnSubmit} className="btn-primary">
        REGISTER
      </button>
      <NavLink to="/">
        <p className="text-center mt-4 text-sm">
          Already have an account ? <u>Login here</u>
        </p>
      </NavLink>
    </div>
  );
}

export default RegisterInput;
