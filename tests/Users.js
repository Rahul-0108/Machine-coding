import React, { useEffect, useState } from 'react';

const UserListWithDetails = () => {
  const [users, setUsers] = useState([]);
  const [visibleDetails, setVisibleDetails] = useState({}); // { userId: true/false }

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch('https://jsonplaceholder.typicode.com/users');
        const data = await res.json();
        setUsers(data);
      } catch (error) {
        console.error('Failed to fetch users:', error);
      }
    };

    fetchUsers();
  }, []);

  const toggleDetails = (userId) => {
    setVisibleDetails((prev) => ({
      ...prev,
      [userId]: !prev[userId],
    }));
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2>User List</h2>
      {users.map((user) => (
        <div
        className='user-card'
          key={user.id}
          style={{
            border: '1px solid #ccc',
            borderRadius: '6px',
            marginBottom: '12px',
            padding: '12px',
            backgroundColor: '#f9f9f9',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <strong>{user.name}</strong>
            <button onClick={() => toggleDetails(user.id)}>
              {visibleDetails[user.id] ? 'Hide Details' : 'Show Details'}
            </button>
          </div>

          {visibleDetails[user.id] && (
            <div style={{ marginTop: '10px' }}>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Phone:</strong> {user.phone}</p>
              {/* <p><strong>Company:</strong> {user.company.name}</p>
              <p><strong>Website:</strong> {user.website}</p>
              <p><strong>City:</strong> {user.address.city}</p> */}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default UserListWithDetails;
