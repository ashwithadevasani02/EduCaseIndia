import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InputField from '../components/InputField';
import Button from '../components/Button';

const validate = (field, val) => {
  let err = '';
  if (field === 'email') {
    if (!val) {
      err = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(val)) {
      err = 'Please enter a valid email address';
    }
  } else if (field === 'password') {
    if (!val) {
      err = 'Password is required';
    }
  }
  return err;
};

const Login = () => {
  const navigate = useNavigate();
  
  const [values, setValues] = useState(() => {
    const savedEmail = localStorage.getItem('lastEnteredEmail') || '';
    return {
      email: savedEmail,
      password: '',
    };
  });

  const [errors, setErrors] = useState(() => {
    const savedEmail = localStorage.getItem('lastEnteredEmail') || '';
    if (savedEmail) {
      const err = validate('email', savedEmail);
      return err ? { email: err } : {};
    }
    return {};
  });

  const [touched, setTouched] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    
    // Live validation
    if (touched[name]) {
      const err = validate(name, value);
      setErrors((prev) => ({ ...prev, [name]: err }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const err = validate(name, value);
    setErrors((prev) => ({ ...prev, [name]: err }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate all fields
    const emailErr = validate('email', values.email);
    const passErr = validate('password', values.password);

    if (emailErr || passErr) {
      setErrors({ email: emailErr, password: passErr });
      setTouched({ email: true, password: true });
      return;
    }

    const savedUserJson = localStorage.getItem('registeredUser');
    const savedUser = savedUserJson ? JSON.parse(savedUserJson) : null;

    // Check if logging in as the registered user
    if (savedUser && savedUser.email.toLowerCase() === values.email.toLowerCase()) {
      if (savedUser.password && savedUser.password !== values.password) {
        setErrors({ password: 'Incorrect password for this email' });
        setTouched({ password: true });
        return;
      }
      
      setIsLoading(true);
      localStorage.setItem('lastEnteredEmail', values.email);
      
      setTimeout(() => {
        localStorage.setItem('currentUser', JSON.stringify(savedUser));
        setIsLoading(false);
        navigate('/account');
      }, 1000);
      return;
    }

    setIsLoading(true);
    localStorage.setItem('lastEnteredEmail', values.email);

    // If no registered user exists or logging in with new email, create placeholder data
    setTimeout(() => {
      const placeholderUser = {
        name: 'Marry Doe',
        email: values.email || 'Marry@Gmail.Com',
        password: values.password,
        phone: '9876543210',
        company: 'PopX Agency',
        isAgency: 'Yes',
        description: 'Lorem Ipsum Dolor Sit Amet, Consetetur Sadipscing Elitr, Sed Diam Nonumy Eirmod Tempor Invidunt Ut Labore Et Dolore Magna Aliquyam Erat, Sed Diam'
      };
      localStorage.setItem('registeredUser', JSON.stringify(placeholderUser));
      localStorage.setItem('currentUser', JSON.stringify(placeholderUser));
      setIsLoading(false);
      navigate('/account');
    }, 1000);
  };

  // Button is disabled/grayed-out if form is untouched or has validation errors
  const isFormInvalid = 
    !values.email || 
    !values.password || 
    errors.email || 
    errors.password;

  return (
    <div className="flex-1 flex flex-col justify-between p-6 bg-[#F8F9FA] animate-fade-in">
      <div className="flex flex-col mt-4">
        {/* Title and Description */}
        <h1 className="text-[28px] font-extrabold text-[#1E293B] tracking-tight text-left mb-2 leading-tight">
          Signin to your PopX account
        </h1>
        <p className="text-sm text-[#64748B] text-left leading-relaxed max-w-[260px] mb-8 font-medium">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit,
        </p>

        {/* Form Container */}
        <form onSubmit={handleSubmit} noValidate>
          <InputField
            label="Email Address"
            type="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Enter email address"
            required
            error={errors.email}
            touched={touched.email}
            autoComplete="email"
          />

          <InputField
            label="Password"
            type="password"
            name="password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Enter password"
            required
            error={errors.password}
            touched={touched.password}
            autoComplete="current-password"
          />

          <Button
            type="submit"
            variant={isFormInvalid ? 'disabled' : 'primary'}
            disabled={isFormInvalid}
            isLoading={isLoading}
            className="mt-2"
          >
            Login
          </Button>
        </form>
      </div>

      {/* Back to welcome link */}
      <div className="text-center mt-6">
        <button
          type="button"
          onClick={() => navigate('/')}
          className="text-xs text-[#6C25FF] hover:underline font-semibold cursor-pointer focus:outline-none"
        >
          Back to Welcome
        </button>
      </div>
    </div>
  );
};

export default Login;
