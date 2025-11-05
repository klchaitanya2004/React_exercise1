import React, { useState } from 'react';
import { useEquipment } from '../context/EquipmentContext';
import '../App.css'; 

function AdminDashboard() {
    const { equipment, addEquipment, deleteEquipment } = useEquipment();
    const [newItem, setNewItem] = useState({ name: '', category: '', condition: '', quantity: 1 });

    const handleAdd = () => {
        addEquipment({ ...newItem, available: newItem.quantity });
        setNewItem({ name: '', category: '', condition: '', quantity: 1 });
    };

    return (
        <div className="dashboard-container">
            <h1>Admin Dashboard</h1>
            <h2>Add Equipment</h2>
            <input placeholder="Name" value={newItem.name} onChange={(e) => setNewItem({ ...newItem, name: e.target.value })} />
            <input placeholder="Category" value={newItem.category} onChange={(e) => setNewItem({ ...newItem, category: e.target.value })} />
            <input placeholder="Condition" value={newItem.condition} onChange={(e) => setNewItem({ ...newItem, condition: e.target.value })} />
            <input type="number" placeholder="Quantity" value={newItem.quantity} onChange={(e) => setNewItem({ ...newItem, quantity: parseInt(e.target.value) })} />
            <button onClick={handleAdd}>Add</button>

            <h2>Equipment List</h2>
            <div className="equipment-list">
                {equipment.map(item => (
                    <div className="equipment-card" key={item.id}>
                        <h3>{item.name}</h3>
                        <p>Category: {item.category}</p>
                        <p>Available: {item.available}/{item.quantity}</p>
                        <button onClick={() => deleteEquipment(item.id)}>Delete</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AdminDashboard;
