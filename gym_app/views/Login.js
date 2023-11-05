/* eslint-disable prettier/prettier */
import React, {useContext} from 'react';
import {
  Box,
  Heading,
  VStack,
  FormControl,
  Input,
  Link,
  Button,
  NativeBaseProvider,
  Center,
} from 'native-base';
import { useNavigation } from '@react-navigation/native';
import FirebaseContext from '../context/firebase/firebaseContext';

function Login() {
  const navigate = useNavigation();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const { authenticateUser } = useContext(FirebaseContext);

  const handleLogin = async () => {
    try {
      const user = await authenticateUser(email, password);
      if (user) {
        navigate.navigate('Profile',{user: user});
      } else {
        console.error('Contraseña o Email incorrecto.');
      }
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
              ¡Bienvenido a GYMFLASH!
            </Heading>
            <Heading
              mt="1"
              _dark={{
                color: 'warmGray.500',
              }}
              color="coolGray.800"
              fontWeight="medium"
              size="lg">
              Inicio de sesion
            </Heading>

            <VStack space={3} mt="8">
              <FormControl>
                <FormControl.Label>Email</FormControl.Label>
                <Input size="lg" value={email} onChangeText={text => setEmail(text)}/>
              </FormControl>
              <FormControl>
                <FormControl.Label text >Contraseña</FormControl.Label>
                <Input size="lg" type="password" value={password} onChangeText={text => setPassword(text)}/>
                <Link
                  _text={{
                    fontSize: 'md',
                    fontWeight: '500',
                    color: 'blue.700',
                  }}
                  alignSelf="flex-end"
                  mt="1">
                  Olvidaste tu contraseña?
                </Link>
              </FormControl>
              <Button mt="2" colorScheme="blue" onPress={handleLogin}>
                Iniciar Sesion
              </Button>
            </VStack>
          </Box>
        </Center>
      </NativeBaseProvider>
  );
}

export default Login;
