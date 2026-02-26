import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import AnimatedBackground from './AnimatedBackground';

const MainLayout: React.FC = () => {
    return (
        <>
            <AnimatedBackground />
            <Header />
            <Outlet />
            <Footer />
        </>
    );
};

export default MainLayout;
