function LoginLayout(props) {
  return (
    <section className="p-4 max-w-[490px] grid  mx-auto  items-center h-screen space-y-4 ">
      <div className="">{props.children}</div>
    </section>
  );
}

export default LoginLayout;
