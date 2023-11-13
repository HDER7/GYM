/* eslint-disable prettier/prettier */
import React, { useState, useContext, useEffect } from 'react';
import FirebaseContext from '../context/firebase/firebaseContext';
import {
    NativeBaseProvider,
    Text,
    Center,
    Box,
    Button,
    HStack,
} from 'native-base';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';

function Booking() {
    const route = useRoute();
    const navigate = useNavigation();
    const { user } = route.params;
    const { cancelWorkout, getMyWorkout } = useContext(FirebaseContext);
    const [e, setError] = useState(null);
    const [userWorkouts, setUserWorkouts] = useState([]);

    useEffect(() => {
        getMyWorkout(user).then((workouts) => setUserWorkouts(workouts));
    }, [getMyWorkout, user]);

    const handleCancelWorkout = async (workoutId) => {
        const now = new Date();
        const workout = userWorkouts.find((w) => w.id === workoutId);
        if (workout) {
            const workoutDateTime = new Date(workout.date);
            workoutDateTime.setHours(workout.time.split(':')[0], workout.time.split(':')[1]);
            const twoHoursFromNow = new Date(now.getTime() + 2 * 60 * 60 * 1000);
            if (workoutDateTime <= twoHoursFromNow) {
                setError('No puedes cancelar la clase con menos de 2 horas de anticipación.');
                return;
            }
            try {
                await cancelWorkout(workoutId);
                setError(null);
                setUserWorkouts(userWorkouts.filter((w) => w.id !== workoutId));
            } catch (error) {
                console.error('Error al cancelar la clase', error);
            }
        }
    };

    const handleTrainings = () => {
        navigate.navigate('Training', { user: user });
    };

    return (
        <NativeBaseProvider>
            <Center flex={1} bg="blue.700">
                <Box width="90%" bg="white" p={3} borderRadius="md" shadow={2}>
                    <Text fontSize="3xl" fontWeight="bold" mb={2}>
                        Clases Reservadas
                    </Text>
                    {userWorkouts.length > 0 ? (
                        userWorkouts.map((workout) => (
                            <Box key={workout.id} mt={2}>
                                <Text fontSize="2xl" fontWeight="bold" mb={2}>
                                    Clase:
                                </Text>
                                <Text fontSize={20}>{workout.date} a las {workout.time}</Text>
                                <HStack space={2} width="90%">
                                    <Button
                                        mt={2}
                                        colorScheme="red"
                                        onPress={() => handleCancelWorkout(workout.id)}
                                    >
                                        <Text fontWeight="bold" fontSize={20} color="white">
                                            Cancelar Reserva
                                        </Text>
                                    </Button>
                                    <Button mt={2} colorScheme="blue" onPress={handleTrainings}>
                                        <Text fontWeight="bold" fontSize={20} color="white">
                                            Entrenamientos
                                        </Text>
                                    </Button>
                                </HStack>
                            </Box>
                        ))
                    ) : (
                        <Text fontSize={20}>No tienes clases reservadas en este momento.</Text>
                    )}
                    {e && <Text color="red.500" fontSize={20}>{e}</Text>}
                </Box>
            </Center>
        </NativeBaseProvider>
    );
}

export default Booking;
