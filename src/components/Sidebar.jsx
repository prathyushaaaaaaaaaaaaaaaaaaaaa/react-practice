
function Sidebar({ setCurrentPage }) {
  return (
    <div>
      <h2>Management</h2>

      <button onClick={() => setCurrentPage("products")}>
        Product Management
      </button>

      <button onClick={() => setCurrentPage("users")}>
        User Management
      </button>
    </div>
  );
}

export default Sidebar;