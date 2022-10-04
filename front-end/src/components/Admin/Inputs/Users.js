import React, { useContext, useEffect } from 'react';
import globalContext from '../../../context/globalContext';

export default function Users() {
  const { users, renderUsers, deleteUsers } = useContext(globalContext);

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
              <tr key={ index } className="tr-users">
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
                    className="order-remove-button"
                  >
                    X
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
