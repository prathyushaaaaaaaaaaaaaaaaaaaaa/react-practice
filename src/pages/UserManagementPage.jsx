import { useEffect, useState } from "react";

function UserManagementPage() {
  const [users, setUsers] = useState([]);

  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  // GET USERS
  useEffect(() => {
    fetch("http://127.0.0.1:8000/users")
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []);

  // CREATE USER
  const createUser = async () => {
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/users",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: username,
            email: email,
            password: password,
            role: role,
          }),
        }
      );

      const data = await response.json();

      console.log(data);

      const updatedResponse = await fetch(
        "http://127.0.0.1:8000/users"
      );

      const updatedUsers = await updatedResponse.json();

      setUsers(updatedUsers);

      setShowForm(false);
      setEditingUser(null);

      setUsername("");
      setEmail("");
      setPassword("");
      setRole("");
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  // UPDATE USER
  const updateUser = async () => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/users/${editingUser[0]}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: username,
            email: email,
            password: password,
            role: role,
          }),
        }
      );

      const data = await response.json();

      console.log(data);

      const updatedResponse = await fetch(
        "http://127.0.0.1:8000/users"
      );

      const updatedUsers = await updatedResponse.json();

      setUsers(updatedUsers);

      setShowForm(false);
      setEditingUser(null);

      setUsername("");
      setEmail("");
      setPassword("");
      setRole("");
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  // DELETE USER
  const deleteUser = async (userId) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/users/${userId}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      console.log(data);

      const updatedResponse = await fetch(
        "http://127.0.0.1:8000/users"
      );

      const updatedUsers = await updatedResponse.json();

      setUsers(updatedUsers);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  // EDIT BUTTON
  const handleEdit = (user) => {
    setEditingUser(user);

    setUsername(user[1]);
    setEmail(user[2]);
    setPassword(user[3]);
    setRole(user[4]);

    setShowForm(true);
  };

  // CANCEL FORM
  const handleCancel = () => {
    setShowForm(false);
    setEditingUser(null);

    setUsername("");
    setEmail("");
    setPassword("");
    setRole("");
  };

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-6xl mx-auto">

        <h1>User Management</h1>

        <button
          onClick={() => {
            setEditingUser(null);
            setUsername("");
            setEmail("");
            setPassword("");
            setRole("");
            setShowForm(true);
          }}
          className="mt-2 bg-blue-800 text-white px-2.5 py-1.5 rounded-lg hover:bg-blue-700"
        >
          + Add User
        </button>

        {showForm && (
          <div>
            <h2>
              {editingUser ? "Edit User" : "Create User"}
            </h2>

            <input
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <input
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <input
              placeholder="Role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            />

            <button onClick={handleCancel}>
              Cancel
            </button>

            <button
              onClick={
                editingUser
                  ? updateUser
                  : createUser
              }
            >
              {editingUser ? "Update" : "Create"}
            </button>
          </div>
        )}

      </div>

      <table className="mt-4 w-full border-collapse border border-gray-400">
        <thead className="bg-blue-800">
          <tr>
            <th className="border border-gray-400 py-3 px-4 text-sm font-semibold text-gray-100">
              ID
            </th>

            <th className="border border-gray-400 py-3 px-4 text-sm font-semibold text-gray-100">
              Username
            </th>

            <th className="border border-gray-400 py-3 px-4 text-sm font-semibold text-gray-100">
              Email
            </th>

            <th className="border border-gray-400 py-3 px-4 text-sm font-semibold text-gray-100">
              Role
            </th>

            <th className="border border-gray-400 py-3 px-4 text-sm font-semibold text-gray-100">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr key={user[0]}>

              <td className="border border-gray-400 py-3 px-4 text-gray-100">
                {user[0]}
              </td>

              <td className="border border-gray-400 py-3 px-4 text-gray-100">
                {user[1]}
              </td>

              <td className="border border-gray-400 py-3 px-4 text-gray-100">
                {user[2]}
              </td>

              <td className="border border-gray-400 py-3 px-4 text-gray-100">
                {user[4]}
              </td>

              <td className="border border-gray-400 py-3 px-4 text-gray-100">
                <div className="flex gap-2 justify-center">

                  <button
                    onClick={() => handleEdit(user)}
                    className="bg-blue-700 text-white px-1 py-0.5 rounded hover:bg-blue-500"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteUser(user[0])}
                    className="bg-blue-700 text-white px-1 py-0.5 rounded hover:bg-blue-500"
                  >
                    Delete
                  </button>

                </div>
              </td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserManagementPage;