/* eslint-disable prettier/prettier */
import React from 'react';
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
import {SSRProvider} from '@react-aria/ssr';

function Login() {
  return (
    <SSRProvider>
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
                <Input size="lg" />
              </FormControl>
              <FormControl>
                <FormControl.Label>Contraseña</FormControl.Label>
                <Input size="lg" type="password" />
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
              <Button mt="2" colorScheme="blue">
                Iniciar Sesion
              </Button>
            </VStack>
          </Box>
        </Center>
      </NativeBaseProvider>
    </SSRProvider>
  );
}

export default Login;
