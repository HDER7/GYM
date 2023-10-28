import React, {useReducer} from 'react';
import firebase from '../../firebase';
import FirebaseContext from './firebaseContext';
import FirebaseReducer from './firebaseReducer';

const FirebaseStage = props => {
    const initialStage = {
        users:[]
    }
    const [state, dispach] = useReducer(FirebaseReducer,initialStage);

    return(
        <FirebaseContext.Provider
            value={{
                users: state.users,
                firebase
            }}
        >
            {props.children}
        </FirebaseContext.Provider>
    )
}

export default FirebaseStage