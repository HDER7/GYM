import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaHome, FaUser, FaDumbbell } from 'react-icons/fa';

const Nav = () => {
    return (
        <nav className="bg-blue-800">
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 flex items-center justify-between h-16">
                <div className="flex items-center">
                    <NavLink to="/" className="text-white hover:bg-blue-600 rounded-md px-3 py-2 text-sm font-medium flex items-center" activeclassname="bg-blue-600">
                        <FaHome className="mr-2" /> Inicio
                    </NavLink>
                    <NavLink to="/register-user" className="text-white hover:bg-blue-600 rounded-md px-3 py-2 text-sm font-medium flex items-center" activeclassname="bg-blue-600">
                        <FaUser className="mr-2" /> Registrar usuario
                    </NavLink>
                    <NavLink to="/users" className="text-white hover:bg-blue-600 rounded-md px-3 py-2 text-sm font-medium flex items-center" activeclassname="bg-blue-600">
                        <FaUser className="mr-2" /> Usuarios
                    </NavLink>
                    <NavLink to="/register-training" className="text-white hover:bg-blue-600 rounded-md px-3 py-2 text-sm font-medium flex items-center" activeclassname="bg-blue-600">
                        <FaDumbbell className="mr-2" /> Registrar Entrenamiento
                    </NavLink>
                    <NavLink to="/trainings" className="text-white hover:bg-blue-600 rounded-md px-3 py-2 text-sm font-medium flex items-center" activeclassname="bg-blue-600">
                        <FaDumbbell className="mr-2" /> Entrenamientos
                    </NavLink>
                </div>
            </div>
        </nav>
    );
}

export default Nav;