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
    <div>
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

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr key={user[0]}>
              <td>{user[0]}</td>
              <td>{user[1]}</td>
              <td>{user[2]}</td>
              <td>{user[4]}</td>

              <td>
                <button onClick={() => handleEdit(user)}>
                  Edit
                </button>

                <button
                  onClick={() => deleteUser(user[0])}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserManagementPage;