import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "./Adminuser.css";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: "", email: "", password: "" });
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const apiUrl = "http://localhost:4000/api/user/admin";

  // Fetch users from backend
  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${apiUrl}/list-users`);
      if (response.data.success) {
        setUsers(response.data.data);
      } else {
        toast.error("Error fetching users");
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Error fetching users");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Add a new user
  const handleAddUser = async (e) => {
    e.preventDefault();
    if (!newUser.name || !newUser.email || !newUser.password) {
      toast.error("Please fill in all fields");
      return;
    }
    try {
      const response = await axios.post(
        `${apiUrl}/add-user`,
        newUser,
        { headers: { "Content-Type": "application/json" } }
      );
      if (response.data.success) {
        toast.success("User added successfully!");
        setNewUser({ name: "", email: "", password: "" });
        fetchUsers();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error adding user:", error);
      toast.error("Error adding user");
    }
  };

  // Confirm deletion: open modal
  const confirmDelete = (id) => {
    setConfirmDeleteId(id);
  };

  // When deletion is confirmed
  const handleDeleteConfirmed = async () => {
    try {
      const response = await axios.delete(`${apiUrl}/remove-user/${confirmDeleteId}`);
      if (response.data.success) {
        toast.success("User removed successfully!");
        fetchUsers();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Error deleting user");
    } finally {
      setConfirmDeleteId(null);
    }
  };

  // Cancel deletion
  const handleCancelDelete = () => {
    setConfirmDeleteId(null);
  };

  return (
    <div className="admin-users">
      <h2>Manage Users</h2>

      {/* Add New User Form */}
      <form onSubmit={handleAddUser} className="add-user-form">
        <input
          type="text"
          placeholder="Name"
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={newUser.password}
          onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
          required
        />
        <button type="submit">Add User</button>
      </form>

      {/* User List Table */}
      <table className="user-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <button onClick={() => confirmDelete(user._id)}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">No users found</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Custom Delete Confirmation Modal */}
      {confirmDeleteId && (
        <div className="modal-overlay">
          <div className="modal">
            <p>Are you sure you want to delete this user?</p>
            <div className="modal-buttons">
              <button className="modal-btn confirm" onClick={handleDeleteConfirmed}>
                Delete
              </button>
              <button className="modal-btn cancel" onClick={handleCancelDelete}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUsers;
