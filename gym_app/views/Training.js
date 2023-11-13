/* eslint-disable prettier/prettier */
import React, { useContext, useEffect, useState } from 'react';
import FirebaseContext from '../context/firebase/firebaseContext';
import {
    NativeBaseProvider,
    Text,
    Center,
    Box,

    ScrollView,
} from 'native-base';
import { useRoute } from '@react-navigation/native';

export default function Training() {
    const route = useRoute();
    const { user } = route.params;
    const { getMyTrainings } = useContext(FirebaseContext);
    const [myWorkouts, setMyWorkouts] = useState([]);

    useEffect(() => {
        getMyTrainings(user).then((workouts) => {
            setMyWorkouts(workouts);
        });
    }, [user, getMyTrainings]);


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
                        </Box>
                        ))}
                    </ScrollView>
                </Box>
            </Center>
        </NativeBaseProvider>
    );
}
