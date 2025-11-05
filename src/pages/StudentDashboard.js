import React, { useState } from 'react';
import { useEquipment } from '../context/EquipmentContext';
import { useAuth } from '../context/AuthContext';
import '../App.css';

function StudentDashboard() {
    const { equipment, requests, setRequests } = useEquipment();
    const { user } = useAuth();
    const [search, setSearch] = useState('');
    const [showPopup, setShowPopup] = useState(false);

    const filteredEquipment = equipment.filter(item =>
        item.name.toLowerCase().includes(search.toLowerCase())
    );

    const handleRequest = (item) => {
        if (item.available > 0) {
            setRequests([...requests, { id: Date.now(), itemId: item.id, user: user.email, status: 'Pending' }]);
            setShowPopup(true);
            setTimeout(() => setShowPopup(false), 2000);
        }
    };

    return (

        <div className="dashboard-container">
            <h1>Student Dashboard</h1>
            <input type="text" placeholder="Search equipment..." value={search} onChange={(e) => setSearch(e.target.value)} />
            <div className="equipment-list">
                {filteredEquipment.map(item => (
                    <div className="equipment-card" key={item.id}>
                        <h3>{item.name}</h3>
                        <p>Category: {item.category}</p>
                        <p>Available: {item.available}/{item.quantity}</p>
                        {item.available > 0 && <button onClick={() => handleRequest(item)}>Request</button>}
                    </div>
                ))}
            </div>

            {showPopup && (
                <>
                    <div className="overlay"></div>
                    <div className="popup">
                        <h3>Request Sent Successfully!</h3>
                        <button onClick={() => setShowPopup(false)}>Close</button>
                    </div>
                </>
            )}
        </div>
    );
}

export default StudentDashboard;