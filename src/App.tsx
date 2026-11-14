
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import MainLayout from './components/MainLayout';
import ScrollToTop from './components/ScrollToTop';
import HomeView from './views/HomeView';
import ProjectsView from './views/ProjectsView';
import ProjectDetailView from './views/ProjectDetailView';
import AboutView from './views/AboutView';
import NotFoundView from './views/NotFoundView';
import GalleryView from './views/GalleryView';
import ZenView from './views/ZenView';
import './i18n';

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomeView />} />
          <Route path="projects" element={<ProjectsView />} />
          <Route path="projects/:id" element={<ProjectDetailView />} />
          <Route path="gallery" element={<GalleryView />} />
          <Route path="about" element={<AboutView />} />
          <Route path="zen" element={<ZenView />} />
          {/* /writing (WritingView.tsx) is parked until the blog launches */}
          <Route path="*" element={<NotFoundView />} />
        </Route>
      </Routes>
      <Analytics />
    </BrowserRouter>
  );
}

export default App;
