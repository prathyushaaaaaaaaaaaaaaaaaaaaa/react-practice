
function Sidebar({ setCurrentPage }) {
  return (
    <div className="justify-center flex gap-4">
      <button onClick={() => setCurrentPage("products")}
        className="mt-2 bg-blue-800 text-white px-2.5 py-1.5 rounded-lg hover:bg-blue-700">
        Product Management
      </button>

      <button onClick={() => setCurrentPage("users")}
        className="mt-2 bg-blue-800 text-white px-2.5 py-1.5 rounded-lg hover:bg-blue-700">
        User Management
      </button>
    </div>
  );
}

export default Sidebar;