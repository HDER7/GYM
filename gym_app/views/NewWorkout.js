/* eslint-disable prettier/prettier */
import React, { useState, useContext } from 'react';
import FirebaseContext from '../context/firebase/firebaseContext';
import {
    NativeBaseProvider,
    Text,
    Center,
    Box,
    Button,
    TextArea,
} from 'native-base';
import { useRoute } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';

function NewWorkout() {
    const route = useRoute();
    const { user,blocked } = route.params;
    const { addWorkout } = useContext(FirebaseContext);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedTime, setSelectedTime] = useState(new Date());
    const [description, setDescription] = useState('');
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);
    const [e, setError] = useState(null);

    const handleAddWorkout = async () => {
        if (blocked){
            setError('Usted se encuentra bloqueado');
            return;
        }
        if (!description) {
            setError('Debes escribir una descripción.');
            return;
        }
        const now = new Date();
        const selectedDateTime = new Date(selectedDate);
        selectedDateTime.setHours(selectedTime.getHours(), selectedTime.getMinutes());
        const twoHoursFromNow = new Date(now.getTime() + 2 * 60 * 60 * 1000);

        if (selectedDateTime <= twoHoursFromNow) {
            setError('Debes agendar al menos 2 horas en el futuro.');
            return;
        }

        const formattedTime = `${String(selectedTime.getHours()).padStart(2, '0')}:${String(selectedTime.getMinutes()).padStart(2, '0')}`;
        const formattedDate =  `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${String(selectedDate.getDate()).padStart(2, '0')}`;
        const workout = {
            username: user,
            date: formattedDate,
            time: formattedTime,
            description: description,
        };

        try {
            await addWorkout(workout);
            setError(null);
            setSelectedDate(new Date());
            setSelectedTime(new Date());
            setDescription('');
        } catch (error) {
            console.error('Error al reservar', error);
        }
    };

    const handleDateChange = (event, date) => {
        setShowDatePicker(false);
        if (date) {
            setSelectedDate(date);
        }
    };

    const handleTimeChange = (event, time) => {
        setShowTimePicker(false);
        if (time) {
            setSelectedTime(time);
        }
    };

    return (
        <NativeBaseProvider>
            <Center flex={1} bg="blue.700">
                <Box width="90%" bg="white" p={4} borderRadius="md" shadow={2}>
                    <Text fontSize="3xl" fontWeight="bold" mb={2}>
                        Reservar entrenamiento
                    </Text>
                    {showDatePicker && (
                    <DateTimePicker
                        value={selectedDate}
                        mode="date"
                        display="default"
                        onChange={handleDateChange}
                    />
                    )}
                    <Button
                        mt={2}
                        colorScheme="blue"
                        onPress={() => setShowDatePicker(true)}
                    >
                        <Text fontWeight="bold" fontSize={20} color="white">Seleccionar Fecha</Text>
                    </Button>
                    {showTimePicker && (
                        <DateTimePicker
                            value={selectedTime}
                            mode="time"
                            display="default"
                            onChange={handleTimeChange}
                        />
                    )}
                    <Button
                        mt={2}
                        colorScheme="blue"
                        onPress={() => setShowTimePicker(true)}
                    >
                        <Text fontWeight="bold" fontSize={20} color="white">Seleccionar Hora</Text>
                    </Button>
                    <TextArea
                        placeholder="Descripción"
                        value={description}
                        onChangeText={setDescription}
                        fontWeight="bold" fontSize={16}
                        mt={3}
                    />
                    {e && <Text color="red.500" fontSize={18}>{e}</Text>}
                    <Button mt={2} colorScheme="blue" onPress={handleAddWorkout}>
                        <Text fontWeight="bold" fontSize={20} color="white">Reservar</Text>
                    </Button>
                </Box>
            </Center>
        </NativeBaseProvider>
    );
}

export default NewWorkout;
