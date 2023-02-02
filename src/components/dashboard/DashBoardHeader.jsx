import { getImageURL } from "../../lib/utils";

function DashBoardHeader(props) {
  const { logout } = props;

  const currentUser = JSON.parse(localStorage.getItem("pocketbase_auth"));

  // console.log(currentUser);

  return (
    <header className="flex justify-between px-4 py-2 bg-white border-b items-center">
      <div className="flex justify-center items-center space-x-2 cursor-pointer">
        <img src="/image/triangle-logo.png" alt="" className="w-6 h-6" />
        <h1 className="text-2xl font-bold">Spaces</h1>
      </div>
      <div className="flex items-center font-medium">
        <p>{currentUser.model.name}</p>
        <button
          onClick={logout}
          className="p-4 bg-red-600 text-white font-semibold rounded-md"
        >
          Logout
        </button>
      </div>
    </header>
  );
}

export default DashBoardHeader;
