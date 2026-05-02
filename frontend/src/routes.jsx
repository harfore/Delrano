import Join from './pages/Auth/Join';
import Login from './pages/Auth/Login';
import Profile from './pages/Profile';
import TestPage from './components/TestPage';
import NewYorkConcerts from './components/NewYorkTester';
import Renovation from './components/Renovation';
import Settings from './pages/Settings';
import ConcertsByCity from './pages/ConcertsByCity';

const routes = [
    { path: '/', element: <Renovation /> },
    { path: '/join', element: <Join /> },
    { path: '/login', element: <Login /> },
    { path: '/profile', element: <Profile /> },
    { path: '/dev/tests', element: <TestPage /> },
    { path: '/dev/tests/newyork', element: <NewYorkConcerts /> },
    { path: '/profile/settings', element: <Settings /> },
    { path: '/concerts/:cityId', element: < ConcertsByCity /> }
];

export default routes;