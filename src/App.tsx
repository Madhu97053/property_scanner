import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CompareBar from '@/components/CompareBar';
import Home from '@/pages/Home';
import Search from '@/pages/Search';
import PropertyDetails from '@/pages/PropertyDetails';
import Compare from '@/pages/Compare';
import Saved from '@/pages/Saved';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/property/:id" element={<PropertyDetails />} />
            <Route path="/compare" element={<Compare />} />
            <Route path="/saved" element={<Saved />} />
          </Routes>
        </main>
        <Footer />
        <CompareBar />
      </div>
    </BrowserRouter>
  );
}

export default App;
