import HomePage from '../../components/home-page/HomePage';
import SpiderPage from '../../components/spider-page/SpiderPage';
import SeismographPage from '../../components/seismograph-page/SeismographPage';

export const ROUTES = {
    HOME: '/',
    SPIDER: '/spider',
    SEISMOGRAPH: '/seismograph',
};

export const ROUTES_COMPONENTS = {
    [ROUTES.HOME]: HomePage,
    [ROUTES.SPIDER]: SpiderPage,
    [ROUTES.SEISMOGRAPH]: SeismographPage,
};
