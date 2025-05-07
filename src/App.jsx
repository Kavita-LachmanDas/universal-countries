
import './App.css';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import DetailPage from './components/DetailPage';
import Header from './components/Header';

function App() {
  let router = createBrowserRouter([
    {
     path:'/', 
     element:<Header/>

    },
    {
     path:'/countriesApi/:id' ,
     element:<DetailPage/>
    }
  ])
  return (
<>

<RouterProvider router={router}  />
</>
  );
}

export default App;
