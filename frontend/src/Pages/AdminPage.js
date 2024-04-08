import React, { useState, useEffect } from 'react';
import config from '../config';

const AdminPage = () => {
    // State for storing the list of users
    const [users, setUsers] = useState([]);
    // Other necessary state variables for user management (e.g., form fields)

    // Fetch the list of users from your backend when the component mounts
    useEffect(() => {
        fetchUsers();
    }, []);

    // Function to fetch the list of users from your backend
    const fetchUsers = async () => {
        try {
            const response = await fetch(`${config.API_BASE_URL}/users`, {
                method: 'GET',
                // Include authentication headers if needed
            });
            if (response.ok) {
                const data = await response.json();
                setUsers(data);
            } else {
                // Handle error
            }
        } catch (error) {
            // Handle error
        }
    };

    return (
        <div>
            <h2>User Management</h2>
            {/* Display the list of users in a table */}
            <table>
                <thead>
                    <tr>
                        <th>Username</th>
                        {/* Add other user-related table headers as needed */}
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.username}>
                            <td>{user.username}</td>
                            {/* Add other user-related table data as needed */}
                        </tr>
                    ))}
                </tbody>
            </table>
            {/* Add user management forms and buttons here */}
        </div>
    );
};

export default AdminPage;
