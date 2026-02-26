
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './components/MainLayout';
import HomeView from './views/HomeView';
import ProjectsView from './views/ProjectsView';
import ProjectDetailView from './views/ProjectDetailView';
import AboutView from './views/AboutView';
import WritingView from './views/WritingView';
import GalleryView from './views/GalleryView';
import ZenView from './views/ZenView';
import './i18n';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomeView />} />
          <Route path="projects" element={<ProjectsView />} />
          <Route path="projects/:id" element={<ProjectDetailView />} />
          <Route path="gallery" element={<GalleryView />} />
          <Route path="about" element={<AboutView />} />
          <Route path="writing" element={<WritingView />} />
          <Route path="zen" element={<ZenView />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
