import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import MenuPage from '../features/menu/MenuSection';
import AuthModal from '../features/auth/AuthModal';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            { index: true, element: <MenuPage /> },
            { path: 'menu', element: <MenuPage /> },
            { path: 'login', element: <AuthModal /> },
        ],
    },

]);
