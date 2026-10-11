import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CompareBar from '@/components/CompareBar';
import LoginModal from '@/components/LoginModal';
import { AuthProvider } from '@/context/AuthContext';
import Home from '@/pages/Home';
import Search from '@/pages/Search';
import PropertyDetails from '@/pages/PropertyDetails';
import Compare from '@/pages/Compare';
import Saved from '@/pages/Saved';
import Login from '@/pages/Login';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="min-h-screen bg-gray-50 flex flex-col">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/search" element={<Search />} />
              <Route path="/property/:id" element={<PropertyDetails />} />
              <Route path="/compare" element={<Compare />} />
              <Route path="/saved" element={<Saved />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </main>
          <Footer />
          <CompareBar />
          <LoginModal />
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
