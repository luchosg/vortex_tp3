import React from 'react';
import {Route, createRoutesFromElements, createBrowserRouter, RouterProvider,} from 'react-router-dom';
import EmployeesList from './pages/EmployeesList';
import ErrorPath from './components/Common/ErrorPath';
import NavBarWrapper from './components/Common/NavBarWrapper';
import AssetsList from './pages/AssetsList';
import AssetsForm from './pages/AssetsForm';
import EmployeesForm from './pages/EmployeesForm';

const App = () => {

  const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path='/' element={<NavBarWrapper />} errorElement={<ErrorPath error='ruta'/>}>
            <Route path='/' element={<EmployeesList />} />
            <Route path='/new' element={<EmployeesForm />} />
            <Route path='/employees/:id' element={<EmployeesForm />} errorElement={<ErrorPath error='empleado'/>}/>
            <Route path='/assets' element={<AssetsList />} />
            <Route path='/assets/:id' element={<AssetsForm />} />
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
