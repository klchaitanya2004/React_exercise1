import React, { createContext, useState, useContext } from 'react';
const EquipmentContext = createContext();

export function EquipmentProvider({ children }) {
    const [equipment, setEquipment] = useState([
        { id: 1, name: 'Football Kit', category: 'Sports', condition: 'Good', quantity: 10, available: 10 },
        { id: 2, name: 'Microscope', category: 'Lab', condition: 'Excellent', quantity: 5, available: 5 },
        { id: 3, name: 'Camera', category: 'Electronics', condition: 'Fair', quantity: 3, available: 3 },
        { id: 4, name: 'Guitar', category: 'Music', condition: 'Good', quantity: 4, available: 4 },
        { id: 5, name: 'Project Kit', category: 'Project', condition: 'Good', quantity: 6, available: 6 }
    ]);

    const [requests, setRequests] = useState([]);

    const addEquipment = (item) => setEquipment([...equipment, { ...item, id: Date.now() }]);
    const updateEquipment = (id, updatedItem) => {
        setEquipment(equipment.map(item => item.id === id ? updatedItem : item));
    };
    const deleteEquipment = (id) => setEquipment(equipment.filter(item => item.id !== id));

    return (
        <EquipmentContext.Provider value={{ equipment, setEquipment, requests, setRequests, addEquipment, updateEquipment, deleteEquipment }}>
            {children}
        </EquipmentContext.Provider>
    );
}

export function useEquipment() {
    return useContext(EquipmentContext);
}
