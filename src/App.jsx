import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Welcome from './pages/Welcome';
import Login from './pages/Login';
import Register from './pages/Register';
import Account from './pages/Account';

function App() {
  return (
    <Router>
      <div className="min-h-screen w-full flex items-center justify-center bg-[#F1F5F9] sm:p-8 antialiased">
        <div className="relative w-full max-w-[375px] h-[100svh] sm:h-[680px] bg-[#F8F9FA] sm:rounded-[36px] sm:shadow-[0_24px_60px_-15px_rgba(0,0,0,0.15)] sm:border-[8px] sm:border-[#1E293B] overflow-hidden flex flex-col transition-all duration-300">

          <div className="flex-1 flex flex-col overflow-y-auto no-scrollbar relative">
            <Routes>
              <Route path="/" element={<Welcome />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/account" element={<Account />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
