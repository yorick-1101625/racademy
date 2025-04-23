import React, { useState, useEffect } from 'react';

export default function AdminDashboard() {
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch users data when the component mounts
  useEffect(() => {
    fetch('http://localhost:5000/api/user') // Je API eindpunt voor gebruikers
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          setUser(data.data);  // Zet de gebruikersdata in de state
        } else {
          setError('Failed to fetch users');
        }
      })
      .catch(err => {
        setError('Error fetching data');
        console.error(err);
      })
      .finally(() => setLoading(false));
  }, []);

  // Functie om een gebruiker te verwijderen
  const removeUser = (userId) => {
    fetch(`http://localhost:5000/api/user/${userId}`, { method: 'DELETE' })  // Verwijder gebruiker
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          setUser(user.filter(u => u.id !== userId));  // Verwijder gebruiker uit de lijst
        }
      })
      .catch(err => {
        console.error('Error removing user', err);
      });
  };

  if (loading) return <div>Loading users...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="px-16 py-10 w-full">
      <h1 className="text-3xl font-bold mb-6">Gebruikers</h1>

      {user.map(u => (
        <div key={u.id} className="bg-white border p-6 mb-6 rounded-xl shadow w-full">
          <div className="flex items-center space-x-6 mb-4">
            <img
              src={u.avatar}
              alt="avatar"
              className="w-16 h-16 rounded-full object-cover"
            />
            <div>
              <p className="font-bold text-lg">{u.name || 'Naam onbekend'}</p>
              <p className="text-sm text-gray-600">{u.email}</p>
              <p className="text-sm">Studie: {u.study || 'Onbekend'}</p>
              <p className="text-sm">{u.posts || 0} posts</p>
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
