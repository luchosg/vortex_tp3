import React from 'react';
import {Route, createRoutesFromElements, createBrowserRouter, RouterProvider,} from 'react-router-dom';
import EmployeesList from './pages/EmployeesList';
import ErrorPath from './components/Common/ErrorPath';
import NavBarWrapper from './components/Common/NavBarWrapper';
// import EmployeeForm from './components/EmployeeForm';
import EmployeesForm from './pages/EmployeesForm';

const App = () => {

  const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path='/' element={<NavBarWrapper />} errorElement={<ErrorPath error='ruta'/>}>
            <Route path='/' element={<EmployeesList />} />
            <Route path='/new' element={<EmployeesForm />} />
            <Route path='/employee/:id' element={<EmployeesForm />} errorElement={<ErrorPath error='empleado'/>}/>
        </Route>
    )
  );

  return (
    <div> 
        <RouterProvider router= {router} />
    </div>
    
  );
}

export default App;
