/* eslint-disable prettier/prettier */
import React,{useState, useEffect, useContext} from 'react';
import { NativeBaseProvider, Center, Box, FormControl, Button, Heading,VStack, Input, Select,CheckIcon, Checkbox} from 'native-base';
import FirebaseContext from '../context/firebase/firebaseContext';


const SignUp = () => {
    const [CC, setCC] = React.useState('');
    const [name, setName] = React.useState('');
    const [e, setE] = React.useState('');
    const { getWorkout, addTrainner } = useContext(FirebaseContext);
    const [Workouts, setWorkouts] = useState([]);
    useEffect(() => {
        getWorkout().then((workouts) => {
            setWorkouts(workouts);
        });
    }, [getWorkout]);
    const handleAddTrainner = async () => {
        const trainner = {
            CC: CC,
            name: name,
            especial: e,
            Workouts: Workouts,
        };
        try {
            await addTrainner(trainner);
            setCC('');
            setName('');
            setE('');
            setWorkouts([]);
        } catch (error) {
            console.error(error.message);
        }
    };
    return (
        <NativeBaseProvider>
            <Center w="100%">
                <Box safeArea p="2" py="40%" w="100%" maxW="370">
                    <Heading
                        size="lg"
                        fontWeight="900"
                        color="blue.700"
                        _dark={{
                        color: 'warmGray.50',
                        }}>
                        Registro entrenador
                    </Heading>

                    <VStack space={3} mt="8">
                        <FormControl>
                            <FormControl.Label>Cedula</FormControl.Label>
                            <Input size="lg" value={CC} onChangeText={text => setCC(text)} numberOfLines={10}/>
                        </FormControl>
                        <FormControl>
                            <FormControl.Label>Nombre</FormControl.Label>
                            <Input size="lg" value={name} onChangeText={text => setName(text)}/>
                        </FormControl>
                        <FormControl>
                            <FormControl.Label>Especialidad</FormControl.Label>
                            <Input size="lg" value={e} onChangeText={text => setE(text)}/>
                        </FormControl>
                        <Select selectedValue={Workouts} minWidth="200" accessibilityLabel="Choose Service" placeholder="elige la clase" _selectedItem={{
                                bg: 'teal.600',
                                endIcon: <CheckIcon size="5" />,
                            }} mt={1} onValueChange={itemValue => setWorkouts(itemValue)}>
                                {Workouts.map((workout) => (
                                <Select.Item key={workout.id} label={workout.description} value={workout}  />
                                ))}
                        </Select>
                        <Button mt="2" colorScheme="blue" onPress={handleAddTrainner}>
                            Registrar
                        </Button>
                    </VStack>
                </Box>
            </Center>
        </NativeBaseProvider>
    );
};

export default SignUp;
