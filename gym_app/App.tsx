import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Training from './views/Training';
import Profile from './views/Profile';
import Login from './views/Login';
import NewWorkout from './views/NewWorkout';
import FirebaseStage from './context/firebase/firebaseStage';
import RequestStage from './context/requests/requestStage';

const Stack = createStackNavigator();

const App = () => {
  return (
    <FirebaseStage>
      <RequestStage>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Login"
              component={Login}
              options={{title: 'Inicio de sesion'}}
            />
            <Stack.Screen
              name="Profile"
              component={Profile}
              options={{title: 'Perfil del usuario'}}
            />
            <Stack.Screen
              name="Training"
              component={Training}
              options={{title: 'Entrenamientos'}}
            />
            <Stack.Screen
              name="NewWorkout"
              component={NewWorkout}
              options={{title: 'Nuevo entrenamiento'}}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </RequestStage>
    </FirebaseStage>
  );
};

export default App;
