import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import type { RouteObject } from 'react-router-dom';
import lazyload from './lazyload';
import { lazy } from 'react';
import CustomHeader from '@/components/customHeader';
import CustomFooter from '@/components/customFooter';

const Home = lazy(() => import('@/pages/home'));
const Blog = lazy(() => import('@/pages/blog'));
const Category = lazy(() => import('@/pages/category'));
const About = lazy(() => import('@/pages/about'));
const NotFound = lazy(() => import('@/pages/404'));

const routes: RouteObject[] = [
  {
    path: '/',
    index: true,
    element: <Navigate to="/home" replace />,
  },
  {
    path: '/home',
    element: lazyload(Home),
  },
  {
    path: '/blog',
    element: lazyload(Blog),
  },
  {
    path: '/category',
    element: lazyload(Category),
  },
  {
    path: '/about',
    element: lazyload(About),
  },
  {
    path: '/404',
    element: lazyload(NotFound),
  },
];

const CustomRouter = () => {
  return (
    <Router>
      <CustomHeader />
      <Routes>
        {routes.map(item => {
          const { path, element } = item;
          return <Route key={path} path={path} element={element} />;
        })}
        {/* <Route key="notFound" path="*" element={<Navigate to="/404" replace />} /> */}
      </Routes>
      <CustomFooter />
    </Router>
  );
};
export default CustomRouter;
