import React, { useEffect, useState } from 'react';
import { deleteUser, getUsers } from '../../../services/api';

export default function Users() {
  const [users, setUsers] = useState([]);

  const renderUsers = async () => {
    try {
      const response = await getUsers();
      console.log(response);
      setUsers(response);
    } catch (e) {
      console.log(e);
    }
  };

  const deleteUsers = async (id) => {
    try {
      const response = await deleteUser(id);
      console.log(response);
      renderUsers();
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    renderUsers();
  }, []);
  return (
    <div className="list-users">
      <h2>List Users</h2>
      <div className="users-container">
        <table>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
          {
            users.map((user, index) => (
              <tr key={ index }>
                <td
                  data-testid={ `admin_manage__element-user-table-item-number-${index}` }
                >
                  {user.id}
                </td>
                <td
                  data-testid={ `admin_manage__element-user-table-name-${index}` }
                >
                  {user.name}
                </td>
                <td
                  data-testid={ `admin_manage__element-user-table-email-${index}` }
                >
                  {user.email}
                </td>
                <td
                  data-testid={ `admin_manage__element-user-table-role-${index}` }
                >
                  {user.role}
                </td>
                <td>
                  <button
                    type="button"
                    data-testid={ `admin_manage__element-user-table-remove-${index}` }
                    onClick={ () => deleteUsers(user.id) }
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          }
        </table>
      </div>
    </div>
  );
}
