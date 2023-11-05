/* eslint-disable prettier/prettier */
import React, {useReducer} from 'react';
import firebase from '../../firebase';
import FirebaseContext from './firebaseContext';
import FirebaseReducer from './firebaseReducer';

const FirebaseStage = props => {
    const initialStage = {
        users:[],
    };

    const [state, dispach] = useReducer(FirebaseReducer,initialStage);

    const getUsers = () =>{
        firebase.db.collection('users').onSnapshot(Snapshot);
        function Snapshot(snap) {
            let user = snap.docs.map(doc=>{
                return {
                    id: doc.id,
                    ...doc.data(),
                };
            });
        }
    };

    const authenticateUser = async (email, password) => {
        try {
            const userRef = firebase.db.collection('users').where('email', '==', email);
            const querySnapshot = await userRef.get();
            if (querySnapshot.empty) {
                console.error('Usuario no encontrado');
                return null;
            }
            const userDoc = querySnapshot.docs[0].data();
            if (userDoc.password === password) {
                return userDoc;
            } else {
            console.error('Contraseña invalida');
            return null;
            }
        } catch (error) {
            console.error(error.message);
            throw error;
        }
    };
    const addWorkout = async (workout) => {
        try {
            const trainsRef = firebase.db.collection('trains');
            const w = await trainsRef.add(workout);
            console.log('Reserva exitosa',w);
        } catch (error) {
            console.error('Error añadiendo reserva', error);
            throw error;
        }
    };

    const getMyWorkouts = async (username) => {
        try {
            const workoutsRef = firebase.db.collection('trains');
            const querySnapshot = await workoutsRef.where('username', '==', username).get();
            const myWorkouts = querySnapshot.docs.map((doc) => {
                const workout = doc.data();
                return {
                    id: doc.id,
                    date: workout.date,
                    time: workout.time,
                    description: workout.description,
                };
            });
            return myWorkouts;
        } catch (error) {
            console.error('Error', error);
            throw error;
        }
    };

    const cancelWorkout = async (workoutId) => {
        try {
            const workoutsRef = firebase.db.collection('trains');
            await workoutsRef.doc(workoutId).delete();
        } catch (error) {
            console.error('Error eliminado', error);
            throw error;
        }
    };

    return (
        <FirebaseContext.Provider
            value={{
                users: state.users,
                firebase,
                getUsers,
                authenticateUser,
                addWorkout,
                getMyWorkouts,
                cancelWorkout,
            }}
        >
            {props.children}
        </FirebaseContext.Provider>
    );
};

export default FirebaseStage;
