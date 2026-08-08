import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import MenuPage from '../features/menu/MenuSection';
import LoginForm from '../features/auth/LoginForm';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            { index: true, element: <MenuPage /> },
            { path: 'menu', element: <MenuPage /> },
            { path: 'login', element: <LoginForm /> },
        ],
    },

]);
