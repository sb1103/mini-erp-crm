const Navbar = () => {
  return (
    <div className="bg-white shadow px-8 py-4 flex justify-between items-center">
      <h1 className="text-2xl font-semibold">
        Dashboard
      </h1>

      <div className="text-gray-600">
        Welcome, Admin 👋
      </div>
    </div>
  );
};

export default Navbar;