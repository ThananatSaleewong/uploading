import { useNavigate } from "react-router-dom";
import DashboardFeed from "../components/dashboard/DashboardFeed";
import DashboardHeader from "../components/dashboard/DashboardHeader";
import pb from "../lib/pocketbase";

function Dashboard() {
  const currentUser = JSON.parse(localStorage.getItem("pocketbase_auth"));
  const isLoggedIn = pb.authStore.isValid;
  let navigate = useNavigate();
  console.log(currentUser, isLoggedIn);

  async function logout() {
    console.log("work");
    await pb.authStore.clear();
    return navigate("/");
  }

  return (
    <div>
      <DashboardHeader logout={logout} />
      <DashboardFeed currentUser={currentUser} />
    </div>
  );
}

export default Dashboard;
