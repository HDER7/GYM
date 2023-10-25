import './App.css';
import {Routes, Route } from 'react-router';
import Nav from './ui/navbar';
import Home from './components/home'
import RecordTraining from './components/record-training';
import UserRegister from './components/user-register';
import Trainings from './components/trainings';
import Users from './components/Users';
import firebase,{FirebaseContext} from './firebase'

function App() {
  return(
    <FirebaseContext.Provider
      value={{firebase}}
    >
      <div>
        <Nav/>
          <Routes>
            <Route exact path ='/' element={<Home/>}/>
            <Route path ='/register-user' element={<UserRegister/> }/>
            <Route path ='/register-training' element={<RecordTraining/>}/>
            <Route path ='/trainings' element={<Trainings/>}/>
            <Route path ='/users' element={<Users/>}/>
          </Routes>
      </div>
    </FirebaseContext.Provider>
  );
}

export default App;
