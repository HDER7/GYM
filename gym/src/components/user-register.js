import React, { useContext, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { FirebaseContext } from '../firebase';

const UserRegister = () => {
    const {firebase} = useContext(FirebaseContext);
    const [error, setError] = useState('');
    const [isSuccessModalOpen, setSuccessModalOpen] = useState(false);

    const openSuccessModal = () => {
        setSuccessModalOpen(true);
    };

    const closeSuccessModal = () => {
        setSuccessModalOpen(false);
    };

    const handleSubmit1 = async (values) => {
        try {
            const db = firebase.db;
            const { username, email, password, name, lastname, cc} = values;

            const usernameExists = await db.collection('users').where('username', '==', username).get();
            if (!usernameExists.empty) {
                setError('El nombre de usuario ya existe');
                return;
            }

            const emailExists = await db.collection('users').where('email', '==', email).get();
            if (!emailExists.empty) {
                setError('El correo electrónico ya está en uso');
                return;
            }

            await db.collection('users').add({
                username,
                name,
                lastname,
                cc,
                email,
                password,
                blocked:false,
            });

            setError(null);

            openSuccessModal();
            formik.resetForm();
        } catch (error) {
            setError(error.message);
        }
    };

    const formik = useFormik({
        initialValues: {
            username: '',
            name: '',
            lastname: '',
            cc: '',
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            username: Yup.string()
                .min(4, 'El nombre de usuario debe tener al menos 4 caracteres')
                .max(30, 'El nombre de usuario debe tener un máximo de 30 caracteres'),
            name: Yup.string()
                .min(1, 'El nombre debe tener al menos 1 caracter')
                .max(30, 'El nombre debe tener un máximo de 30 caracteres'),
            lastname: Yup.string()
                .min(4, 'El apellido debe tener al menos 4 caracteres')
                .max(30, 'El apellido debe tener un máximo de 30 caracteres'),
            email: Yup.string()
                .required('El email es requerido'),
            password: Yup.string()
                .required('La contraseña es requerida'),
        }),
        onSubmit: user => {
            try {
                handleSubmit1(user)
            } catch (e) {
                console.log(e);
            }
        },
    });

    return (
        <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Registro de Usuario</h2>
            <form onSubmit={formik.handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="username" className="block text-gray-700 font-semibold mb-2">
                        Nombre de Usuario:
                    </label>
                    <input
                        type="text"
                        id="username"
                        className="border rounded-md px-3 py-2 w-full"
                        value={formik.values.username}
                        onChange={formik.handleChange}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">
                        Nombre:
                    </label>
                    <input
                        type="text"
                        id="name"
                        className="border rounded-md px-3 py-2 w-full"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="lastname" className="block text-gray-700 font-semibold mb-2">
                        Apellido:
                    </label>
                    <input
                        type="text"
                        id="lastname"
                        className="border rounded-md px-3 py-2 w-full"
                        value={formik.values.lastname}
                        onChange={formik.handleChange}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="id" className="block text-gray-700 font-semibold mb-2">
                        Cedula:
                    </label>
                    <input
                        type="number"
                        id="cc"
                        className="border rounded-md px-3 py-2 w-full"
                        value={formik.values.cc}
                        onChange={formik.handleChange}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">
                        Correo Electrónico:
                    </label>
                    <input
                        type="email"
                        id="email"
                        className="border rounded-md px-3 py-2 w-full"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">
                        Contraseña:
                    </label>
                    <input
                        type="password"
                        id="password"
                        className="border rounded-md px-3 py-2 w-full"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        required
                    />
                </div>
                <div className="text-red-500 mb-4">{error}</div>
                <button
                    type="submit"
                    className="bg-blue-500 hover-bg-blue-600 text-white font-semibold px-4 py-2 rounded-md"
                >
                    Registrar Usuario
                </button>
            </form>
            {isSuccessModalOpen && (
                <div className="modal-overlay">
                    <div className="modal">
                        <div className="modal-header">
                            <h3>Registro Exitoso</h3>
                        </div>
                        <div className="modal-body">
                            <p>El usuario se ha registrado correctamente.</p>
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
}

export default UserRegister;
