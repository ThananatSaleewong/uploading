import Layout from "../components/Layout";
import RegisterHeader from "../components/register/RegisterHeader";
import RegisterInput from "../components/register/RegisterInput";
import { useState } from "react";
import pb from "../lib/pocketbase";
import { Navigate, useNavigate } from "react-router-dom";

function Register() {
  let navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const isLoggedIn = pb.authStore.isValid;

  const data = {
    username: "test_username2",
    email: "test2@example.com",
    emailVisibility: true,
    password: "12345678",
    passwordConfirm: "12345678",
    name: "test2",
  };

  if (isLoggedIn) {
    return <Navigate to="/dashboard" />;
    // <Dashboard logout={logout} />;
  }

  async function handleOnSubmit() {
    // const record = await pb.collection('users').create(data);
    console.log(email, password, passwordConfirm);
    try {
      const record = await pb
        .collection("users")
        .create({ email, password, passwordConfirm, emailVisibility: true });
      alert("Registered");

      return navigate("/");

      // await pb.collection('users').requestVerification('test11@example.com');
    } catch (e) {
      alert(e);
    }
  }

  return (
    <Layout>
      <RegisterHeader />
      <RegisterInput
        handleOnSubmit={handleOnSubmit}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        passwordConfirm={passwordConfirm}
        setPasswordConfirm={setPasswordConfirm}
      />
    </Layout>
  );
}

export default Register;
