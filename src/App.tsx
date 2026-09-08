import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './hooks/useAuth';
import { SiteDataProvider } from './hooks/useSiteData';

// Public layout and pages
import { PublicLayout } from './components/public/PublicLayout';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ProgramsPage } from './pages/ProgramsPage';
import { TeachersPage } from './pages/TeachersPage';
import { AdmissionPage } from './pages/AdmissionPage';
import { NoticesPage } from './pages/NoticesPage';
import { ResultsPage } from './pages/ResultsPage';
import { GalleryPage } from './pages/GalleryPage';
import { ContactPage } from './pages/ContactPage';

// Auth and Admin pages
import { LoginPage } from './components/auth/LoginPage';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { AdminSettings } from './components/admin/AdminSettings';
import { AdminAbout } from './components/admin/AdminAbout';
import { AdminPrograms } from './components/admin/AdminPrograms';
import { AdminTeachers } from './components/admin/AdminTeachers';
import { AdminPrincipal } from './components/admin/AdminPrincipal';
import { AdminNotices } from './components/admin/AdminNotices';
import { AdminResults } from './components/admin/AdminResults';
import { AdminGallery } from './components/admin/AdminGallery';
import { AdminVideos } from './components/admin/AdminVideos';
import { AdminAdmissions } from './components/admin/AdminAdmissions';
import { AdminMessages } from './components/admin/AdminMessages';

export default function App() {
  return (
    <AuthProvider>
      <SiteDataProvider>
        <Router>
          <Routes>
            {/* Public website routes */}
            <Route
              path="/"
              element={
                <PublicLayout>
                  <HomePage />
                </PublicLayout>
              }
            />
            <Route
              path="/about"
              element={
                <PublicLayout>
                  <AboutPage />
                </PublicLayout>
              }
            />
            <Route
              path="/programs"
              element={
                <PublicLayout>
                  <ProgramsPage />
                </PublicLayout>
              }
            />
            <Route
              path="/teachers"
              element={
                <PublicLayout>
                  <TeachersPage />
                </PublicLayout>
              }
            />
            <Route
              path="/admission"
              element={
                <PublicLayout>
                  <AdmissionPage />
                </PublicLayout>
              }
            />
            <Route
              path="/notices"
              element={
                <PublicLayout>
                  <NoticesPage />
                </PublicLayout>
              }
            />
            <Route
              path="/results"
              element={
                <PublicLayout>
                  <ResultsPage />
                </PublicLayout>
              }
            />
            <Route
              path="/gallery"
              element={
                <PublicLayout>
                  <GalleryPage />
                </PublicLayout>
              }
            />
            <Route
              path="/contact"
              element={
                <PublicLayout>
                  <ContactPage />
                </PublicLayout>
              }
            />

            {/* Authentication */}
            <Route path="/login" element={<LoginPage />} />

            {/* Protected Admin routes */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/settings"
              element={
                <ProtectedRoute>
                  <AdminSettings />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/about"
              element={
                <ProtectedRoute>
                  <AdminAbout />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/programs"
              element={
                <ProtectedRoute>
                  <AdminPrograms />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/teachers"
              element={
                <ProtectedRoute>
                  <AdminTeachers />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/principal"
              element={
                <ProtectedRoute>
                  <AdminPrincipal />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/notices"
              element={
                <ProtectedRoute>
                  <AdminNotices />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/results"
              element={
                <ProtectedRoute>
                  <AdminResults />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/gallery"
              element={
                <ProtectedRoute>
                  <AdminGallery />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/videos"
              element={
                <ProtectedRoute>
                  <AdminVideos />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/admissions"
              element={
                <ProtectedRoute>
                  <AdminAdmissions />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/messages"
              element={
                <ProtectedRoute>
                  <AdminMessages />
                </ProtectedRoute>
              }
            />

            {/* Catch-all fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </SiteDataProvider>
    </AuthProvider>
  );
}
