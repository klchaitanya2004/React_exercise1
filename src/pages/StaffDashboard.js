import React from 'react';
import { useEquipment } from '../context/EquipmentContext';
import '../App.css';

function StaffDashboard() {
    const { requests, setRequests, equipment, setEquipment } = useEquipment();

    const handleApprove = (req) => {
        setRequests(requests.map(r => r.id === req.id ? { ...r, status: 'Approved' } : r));
        setEquipment(equipment.map(item => item.id === req.itemId ? { ...item, available: item.available - 1 } : item));
    };

    const handleReject = (req) => {
        setRequests(requests.map(r => r.id === req.id ? { ...r, status: 'Rejected' } : r));
    };

    const handleReturn = (req) => {
        setRequests(requests.map(r => r.id === req.id ? { ...r, status: 'Returned' } : r));
        setEquipment(equipment.map(item => item.id === req.itemId ? { ...item, available: item.available + 1 } : item));
    };

    return (
        <div className = "dashboard-container">
            <h1>Staff Dashboard</h1>
            <h2>Requests</h2>
            <ul>
                {requests.map(req => (
                    <li key={req.id}>
                        {req.user} requested item {req.itemId} - Status: {req.status}
                        {req.status === 'Pending' && (
                            <>
                                <button onClick={() => handleApprove(req)}>Approve</button>
                                <button onClick={() => handleReject(req)}>Reject</button>
                            </>
                        )}
                        {req.status === 'Approved' && <button onClick={() => handleReturn(req)}>Mark Returned</button>}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default StaffDashboard;
