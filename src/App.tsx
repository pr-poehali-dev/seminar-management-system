import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { Toaster } from 'sonner';
import SeminarsPage from './pages/SeminarsPage';
import EmptyPage from './pages/EmptyPage';

export default function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/seminars" replace />} />
          <Route path="/seminars" element={<SeminarsPage />} />
          <Route path="/applications" element={<EmptyPage />} />
          <Route path="/products" element={<EmptyPage />} />
          <Route path="/users" element={<EmptyPage />} />
          <Route path="/categories" element={<EmptyPage />} />
          <Route path="/cities" element={<EmptyPage />} />
          <Route path="/brands" element={<EmptyPage />} />
          <Route path="/protocols" element={<EmptyPage />} />
          <Route path="/orders" element={<EmptyPage />} />
          <Route path="/banners" element={<EmptyPage />} />
          <Route path="/promocodes" element={<EmptyPage />} />
          <Route path="/settings" element={<EmptyPage />} />
        </Routes>
        <Toaster position="top-right" />
      </BrowserRouter>
    </Provider>
  );
}