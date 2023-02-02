import LoginHeader from "../components/login/LoginHeader";
import LoginLayout from "../components/login/LoginLayout";
import LoginInput from "../components/login/LoginInput";
import pb from "../lib/pocketbase";
import { useState } from "react";
import Dashboard from "./Dashboard";
import { Navigate } from "react-router-dom";
function Login() {
  const isLoggedIn = pb.authStore.isValid;
  const [isLoading, setLoading] = useState(false);
  const [dummy, setDummy] = useState(0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function login(e) {
    if (e.code === "Enter" || e.type === 'click') {
      setLoading(true);
      console.log(email, password);
      try {
        const authData = await pb
          .collection("users")
          .authWithPassword(email, password);
      } catch (e) {
        alert(e);
      }
      setLoading(false);
    }
  }

  function logout() {
    pb.authStore.clear();
    setDummy(Math.random);
  }
  if (isLoggedIn) {
    return <Navigate to="/dashboard" />;
    // <Dashboard logout={logout} />;
  }

  return (
    <LoginLayout>
      {isLoading && <p className="text-md font-semibold">Loading....</p>}
      {/* <h1>Logged In:{pb.authStore.isValid.toString()}</h1> */}
      {isLoggedIn ? "True" : "Please logIn"}
      <LoginHeader />
      <LoginInput
        email={email}
        password={password}
        setPassword={setPassword}
        setEmail={setEmail}
        login={login}
        isLoading={isLoading}
      />
    </LoginLayout>
  );
}

export default Login;
