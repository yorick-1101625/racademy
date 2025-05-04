import React, { useState, useEffect } from 'react';

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    Promise.all([
      fetch('http://localhost:5000/api/user').then(res => res.json()),
      fetch('http://localhost:5000/api/post').then(res => res.json())
    ])
      .then(([userData, postData]) => {
        if (userData.success) {
          setUsers(userData.data);
        } else {
          setError('Failed to fetch users');
        }

        if (postData.success && Array.isArray(postData.data)) {
          setPosts(postData.data);
        } else {
          console.warn('Post data not in expected format:', postData);
        }
      })
      .catch(err => {
        setError('Error fetching data');
        console.error(err);
      })
      .finally(() => setLoading(false));
  }, []);

  const removeUser = (userId) => {
    fetch(`http://localhost:5000/api/user/${userId}`, { method: 'DELETE' })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          setUsers(users.filter(u => u.id !== userId));
        }
      })
      .catch(err => {
        console.error('Error removing user', err);
      });
  };

  const getPostCountForUser = (userId) => {
    return posts.filter(p => p.user_id === userId).length;
  };

  if (loading) return <div>Loading users...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="px-16 py-10 w-full">
      <h1 className="text-3xl font-bold mb-6">Gebruikers</h1>

      {users.map(u => (
        <div key={u.id} className="bg-white border p-6 mb-6 rounded-xl shadow w-full">
          <div className="flex items-center space-x-6 mb-4">
            <img
              src={`http://localhost:5000/${u.profile_picture}`}
              alt="avatar"
              className="w-16 h-16 rounded-full object-cover"
            />
            <div>
              <p className="font-bold text-lg">{u.username || 'Naam onbekend'}</p>
              <p className="text-sm text-gray-600">{u.email}</p>
              <p className="text-sm">Studie: {u.study || 'Onbekend'}</p>
              <p className="text-sm">{getPostCountForUser(u.id)} posts</p>
            </div>
          </div>

          <div className="flex flex-wrap justify-start gap-3 mt-4">
            <button className="px-4 py-2 bg-gray-200 rounded-full hover:bg-gray-300 text-sm font-medium">
              Details
            </button>
            <button
              onClick={() => removeUser(u.id)}
              className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-full hover:bg-red-700"
            >
              Verwijder
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
