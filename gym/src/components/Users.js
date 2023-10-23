import React, { useState, useEffect } from 'react';
import 'firebase/firestore';
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  updateDoc,
} from 'firebase/firestore';

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const db = getFirestore();
        const querySnapshot = await getDocs(collection(db, 'users'));
        const userList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUsers(userList);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const toggleBlockUser = async (userId) => {
    try {
      const db = getFirestore();
      const userToBlock = users.find((user) => user.id === userId);
  
      if (userToBlock) {
        userToBlock.blocked = !userToBlock.blocked;
        setUsers([...users]);
  
        const userRef = doc(db, 'users', userId);
        await updateDoc(userRef, { blocked: userToBlock.blocked });
      } else {
        console.error('Usuario no encontrado en la lista local.');
      }
    } catch (error) {
      console.error('Error toggling user block status:', error);
    }
  };
  

  return (
    <div className="container mx-auto mt-4">
      <h1 className="text-2xl font-bold mb-4">Lista de Usuarios</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id} className="mb-4 p-4 border rounded-lg bg-slate-100">
            <p className="text-lg font-semibold">Nombre: {user.name}</p>
            <p>Apellido: {user.lastname}</p>
            <p>Cédula: {user.cc}</p>
            <p>Nombre de usuario: {user.username}</p>
            <p>Email: {user.email}</p>
            <p>
              <strong>Descripción:</strong> {user.description || 'Sin descripción'}
            </p>
            <button
              onClick={() => toggleBlockUser(user.id)}
              className={`${
                user.blocked ? 'bg-red-500' : 'bg-green-500'
              } text-white font-semibold px-4 py-2 rounded-md mt-2`}
            >
              {user.blocked ? 'Desbloquear' : 'Bloquear'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Users;



