/* eslint-disable prettier/prettier */
import React from 'react';
import { NativeBaseProvider, Text, Center, Box, Avatar , Pressable} from 'native-base';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';

function Profile() {
    const navigate = useNavigation();
    const route = useRoute();
    const { user } = route.params;
    return (
        <NativeBaseProvider>
            <Center flex={1} bg="blue.700">
                <Box
                    width="90%"
                    bg="white"
                    p={4}
                    borderRadius="md"
                    shadow={2}
                >
                    <Avatar
                        size="xl"
                        source={require('../images/4715330.png')}
                        alt="User Avatar"
                        mx="auto"
                        my={4}
                    />
                    <Text fontSize="2xl" fontWeight="bold" mb={2}>
                        {user.username}
                    </Text>
                    <Text fontSize="xl" color="gray.500" mb={4}>
                        {user.name + ' ' + user.lastname}
                    </Text>
                </Box>
                <Box
                    width="90%"
                    bg="white"
                    p={4}
                    borderRadius="md"
                    mt={2}
                >
                    <Pressable
                        onPress={() => navigate.navigate('NewWorkout',{user: user.username,blocked: user.blocked})}
                        rounded="8" overflow="hidden"
                        borderWidth="1" borderColor="coolGray.300"
                        maxW="96" shadow="3" bg="coolGray.100" p="5" mt={3}>
                        <Text fontSize="2xl" fontWeight="bold" mb={2}>
                            Reservar Entrenamiento
                        </Text>
                    </Pressable>
                    <Pressable
                        onPress={() => navigate.navigate('Training',{user: user.username})}
                        rounded="8" overflow="hidden"
                        borderWidth="1" borderColor="coolGray.300"
                        maxW="96" shadow="3" bg="coolGray.100" p="5" mt={3} mb={3}>
                        <Text fontSize="2xl" fontWeight="bold" mb={2}>
                            Entrenamientos
                        </Text>
                    </Pressable>
                </Box>
            </Center>
        </NativeBaseProvider>
    );
}

export default Profile;
