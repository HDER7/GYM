/* eslint-disable prettier/prettier */
import React, { useContext, useEffect, useState } from 'react';
import FirebaseContext from '../context/firebase/firebaseContext';
import {
    NativeBaseProvider,
    Text,
    Center,
    Box,
    Button,
    ScrollView,
} from 'native-base';
import { useRoute } from '@react-navigation/native';

export default function Training() {
    const route = useRoute();
    const { user } = route.params;
    const { getMyWorkouts, cancelWorkout } = useContext(FirebaseContext);
    const [myWorkouts, setMyWorkouts] = useState([]);

    useEffect(() => {
        getMyWorkouts(user).then((workouts) => {
            setMyWorkouts(workouts);
        });
    }, [user, getMyWorkouts]);

    const handleCancelWorkout = async (workoutId) => {
        const twoHoursFromNow = new Date();
        twoHoursFromNow.setHours(twoHoursFromNow.getHours() + 2);
        const workout = myWorkouts.find((w) => w.id === workoutId);

        const workoutDate = new Date(workout.date + 'T' + workout.time + 'Z'); // Combine date and time

        if (workoutDate.getTime() > twoHoursFromNow.getTime()) {
            await cancelWorkout(workoutId);
            setMyWorkouts((prevWorkouts) => prevWorkouts.filter((w) => w.id !== workoutId));
        } else {
            console.error('Se debe cancelar 2 horas antes');
        }
    };

    return (
        <NativeBaseProvider>
            <Center flex={1} bg="blue.700">
                <Box width="90%" bg="white" p={4} borderRadius="md" shadow={2} >
                    <Text fontSize="2xl" fontWeight="bold" mb={2}>
                        Entrenamientos
                    </Text>
                    <ScrollView>
                        {myWorkouts.map((workout) => (
                        <Box key={workout.id} mb={2} m={4}>
                            <Text fontSize={18} bold>Fecha: {workout.date}</Text>
                            <Text fontSize={18} bold>Hora: {workout.time}</Text>
                            <Text fontSize={18} bold>Descripcion: {workout.description}</Text>
                            <Button
                                mt={2}
                                colorScheme="red"
                                onPress={() => handleCancelWorkout(workout.id)}
                            >
                                Cancelar Entrenamiento
                            </Button>
                        </Box>
                        ))}
                    </ScrollView>
                </Box>
            </Center>
        </NativeBaseProvider>
    );
}
