import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
const Welcome = () => {
  const navigate = useNavigate();
  return (
    <div className="flex-1 flex flex-col justify-end p-6 bg-[#F8F9FA] animate-fade-in pb-10">
      <div className="flex-1"></div>
      <div className="flex flex-col mb-4">
        <h1 className="text-[28px] font-extrabold text-[#1E293B] tracking-tight text-left mb-2">
          Welcome to PopX
        </h1>
        <p className="text-sm text-[#64748B] text-left leading-relaxed max-w-[260px] mb-8 font-medium">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit,
        </p>

        <div className="flex flex-col gap-3">
          <Button
            variant="primary"
            onClick={() => navigate('/register')}
          >
            Create Account
          </Button>

          <Button
            variant="secondary"
            onClick={() => navigate('/login')}
          >
            Already Registered? Login
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
