import React, { useContext, useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { FirebaseContext } from '../firebase';

const RecordTraining = () => {
    const { firebase } = useContext(FirebaseContext);
    const [error, setError] = useState('');
    const [users, setUsers] = useState([]);
    const [isSuccessModalOpen, setSuccessModalOpen] = useState(false);

    const openSuccessModal = () => {
        setSuccessModalOpen(true);
    };

    const closeSuccessModal = () => {
        setSuccessModalOpen(false);
    };

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const db = firebase.db;
                const usersCollection = db.collection('users');
                const usersSnapshot = await usersCollection.get();
                const usersList = usersSnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setUsers(usersList);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };
        fetchUsers();
    }, [firebase.db]);

    const handleSubmit1 = async (values) => {
        try {
            const db = firebase.db;
            const { date, time, description, user } = values;

            const selectedUser = users.find((u) => u.id === user);

            if (selectedUser) {

                if (selectedUser.blocked) {
                    setError('No puedes registrar un entrenamiento para un usuario bloqueado.');
                    return;
                }

                const newTrain = {
                    date,
                    time,
                    description,
                    username: selectedUser.username,
                };

                await db.collection('trains').add(newTrain);

                setError('');

                openSuccessModal();
                formik.resetForm();
            }
        } catch (error) {
            setError(error.message);
        }
    };

    const formik = useFormik({
        initialValues: {
            date: '',
            time: '',
            description: '',
            user: '',
        },
        validationSchema: Yup.object({
            date: Yup.date().required('La fecha es requerida'),
            time: Yup.string().required('La hora es requerida'),
            description: Yup.string().required('La descripción es requerida'),
            user: Yup.string().required('Selecciona un usuario'),
        }),
        onSubmit: (values) => {
            try {
                handleSubmit1(values);
            } catch (e) {
                console.error('Error al registrar el entrenamiento:', e);
            }
        },
    });

    return (
        <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Registrar Entrenamiento</h2>
            <form onSubmit={formik.handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="date" className="block text-gray-700 font-semibold mb-2">
                        Fecha:
                    </label>
                    <input
                        type="date"
                        id="date"
                        className="border rounded-md px-3 py-2 w-full"
                        value={formik.values.date}
                        onChange={formik.handleChange}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="time" className="block text-gray-700 font-semibold mb-2">
                        Hora:
                    </label>
                    <input
                        type="time"
                        id="time"
                        className="border rounded-md px-3 py-2 w-full"
                        value={formik.values.time}
                        onChange={formik.handleChange}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="description" className="block text-gray-700 font-semibold mb-2">
                        Descripción:
                    </label>
                    <textarea
                        id="description"
                        className="border rounded-md px-3 py-2 w-full"
                        rows={4}
                        value={formik.values.description}
                        onChange={formik.handleChange}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="user" className="block text-gray-700 font-semibold mb-2">
                        Asignar a Usuario:
                    </label>
                    <select
                        id="user"
                        className="border rounded-md px-3 py-2 w-full"
                        value={formik.values.user}
                        onChange={formik.handleChange}
                        required
                    >
                        <option value="">Selecciona un usuario</option>
                        {users.map((user) => (
                            <option key={user.id} value={user.id}>
                                {user.username}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="text-red-500 mb-4">{error}</div>
                <button
                    type="submit"
                    className="bg-blue-500 hover-bg-blue-600 text-white font-semibold px-4 py-2 rounded-md"
                >
                    Registrar Entrenamiento
                </button>
            </form>
            {isSuccessModalOpen && (
                <div className="modal-overlay">
                    <div className="modal">
                        <div className="modal-header">
                            <h3>Registro Exitoso</h3>
                        </div>
                        <div className="modal-body">
                            <p>El entrenamiento se ha registrado correctamente.</p>
                        </div>
                        <div className="modal-footer">
                            <button onClick={closeSuccessModal} className="modal-close-button">
                                Cerrar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RecordTraining;
