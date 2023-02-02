function Error() {
  return (
    <div className="grid justify-center items-center h-screen">
      <div className="text-center space-y-4 ">
        <div className="w-6 mx-auto">
          <img src="/image/triangle-logo.png" alt="" className="" />
        </div>
        <h1 className="text-4xl font-bold">401</h1>
        <h2 className="font-semibold">Unauthorized</h2>
      </div>
    </div>
  );
}

export default Error;
