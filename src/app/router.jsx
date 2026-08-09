import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import HeroSection from '../shared/components/HeroSection';
import MenuSection from '../features/menu/MenuSection';
import BuilderSection from '../features/builder/BuilderSection';
import OrdersSection from '../features/orders/OrdersSection';
import BranchesSection from '../features/branches/BranchesSection';

export const router = createBrowserRouter([
   {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <HeroSection /> },
      { path: 'menu', element: <MenuSection /> },
      { path: 'builder', element: <BuilderSection /> },
      { path: 'orders', element: <OrdersSection /> },
      { path: 'branches', element: <BranchesSection /> },
    ],
  },
]);

