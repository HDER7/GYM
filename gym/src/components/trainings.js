import React, { useEffect, useState, useContext } from 'react';
import { FirebaseContext } from '../firebase';

function Trainings() {
    const [trainings, setTrainings] = useState([]);
    const { firebase } = useContext(FirebaseContext);

    useEffect(() => {
        const fetchTrainings = async () => {
            try {
                const trainsCollection = firebase.db.collection('trains'); // Corregir el acceso a Firestore
                const trainingsSnapshot = await trainsCollection.get();
                const trainingList = [];

                trainingsSnapshot.forEach((doc) => {
                    trainingList.push({
                        id: doc.id,
                        ...doc.data(),
                    });
                });

                setTrainings(trainingList);
            } catch (error) {
                console.error('Error al cargar entrenamientos:', error);
            }
        };

        fetchTrainings();
    }, [firebase]);

    return (
        <div className="container mx-auto mt-4 ">
            <h2 className="text-2xl font-semibold mb-4">Entrenamientos</h2>
            <ul>
                {trainings.map((training) => (
                    <li key={training.id} className="mb-1 p-4 border rounded-lg bg-slate-100">
                        <div className="font-semibold">Fecha: {training.date}</div>
                        <div className="font-semibold">Hora: {training.time}</div>
                        <div>Descripción: {training.description}</div>
                        <div>Usuario: {training.username}</div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Trainings;
