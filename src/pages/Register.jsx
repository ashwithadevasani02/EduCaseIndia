import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InputField from '../components/InputField';
import Button from '../components/Button';
import Toast from '../components/Toast';
const Register = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    name: '',
    phone: '',
    email: '',
    password: '',
    company: '',
    isAgency: 'Yes', // Default to Yes as checked in screenshot
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const validate = (field, val) => {
    let err = '';
    if (field === 'name') {
      if (!val.trim()) {
        err = 'Full name is required';
      }
    } else if (field === 'phone') {
      if (!val) {
        err = 'Phone number is required';
      } else if (val.length < 10) {
        err = 'Phone number must be at least 10 digits';
      }
    } else if (field === 'email') {
      if (!val) {
        err = 'Email address is required';
      } else if (!/\S+@\S+\.\S+/.test(val)) {
        err = 'Please enter a valid email address';
      }
    } else if (field === 'password') {
      if (!val) {
        err = 'Password is required';
      } else if (val.length < 6) {
        err = 'Password must be at least 6 characters';
      }
    }
    return err;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'phone') {
      // Allow only digits
      const digitsOnly = value.replace(/\D/g, '');
      setValues((prev) => ({ ...prev, phone: digitsOnly }));

      if (touched.phone) {
        const err = validate('phone', digitsOnly);
        setErrors((prev) => ({ ...prev, phone: err }));
      }
      return;
    }

    if (name === 'company') {
      // Limit to 50 characters
      if (value.length > 50) return;
    }

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
    const nameErr = validate('name', values.name);
    const phoneErr = validate('phone', values.phone);
    const emailErr = validate('email', values.email);
    const passErr = validate('password', values.password);

    if (nameErr || phoneErr || emailErr || passErr) {
      setErrors({
        name: nameErr,
        phone: phoneErr,
        email: emailErr,
        password: passErr,
      });
      setTouched({
        name: true,
        phone: true,
        email: true,
        password: true,
      });
      return;
    }

    setIsLoading(true);

    // Save registration payload to localStorage
    const userProfile = {
      name: values.name,
      email: values.email,
      phone: values.phone,
      password: values.password, // Store password for verification on login
      company: values.company || 'Not Specified',
      isAgency: values.isAgency,
      description: 'Lorem Ipsum Dolor Sit Amet, Consetetur Sadipscing Elitr, Sed Diam Nonumy Eirmod Tempor Invidunt Ut Labore Et Dolore Magna Aliquyam Erat, Sed Diam'
    };
    localStorage.setItem('registeredUser', JSON.stringify(userProfile));
    localStorage.setItem('currentUser', JSON.stringify(userProfile));
    localStorage.setItem('lastEnteredEmail', values.email);

    // Show Success Toast
    setShowToast(true);

    // Navigate to Account screen after 1.2 seconds delay
    setTimeout(() => {
      setIsLoading(false);
      navigate('/account');
    }, 1200);
  };

  const isFormInvalid =
    !values.name ||
    !values.phone ||
    !values.email ||
    !values.password ||
    errors.name ||
    errors.phone ||
    errors.email ||
    errors.password;

  return (
    <div className="flex-1 flex flex-col justify-between p-6 bg-[#F8F9FA] relative overflow-hidden animate-fade-in">
      {/* Success Toast */}
      <Toast
        message="Registration successful! Redirecting..."
        show={showToast}
        onClose={() => setShowToast(false)}
        duration={1200}
      />

      <div className="flex flex-col mt-4">
        {/* Title */}
        <h1 className="text-[28px] font-extrabold text-[#1E293B] tracking-tight text-left mb-6 leading-tight">
          Create your<br />PopX account
        </h1>

        {/* Signup Form */}
        <form onSubmit={handleSubmit} noValidate>
          <InputField
            label="Full Name"
            type="text"
            name="name"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Enter full name"
            required
            error={errors.name}
            touched={touched.name}
            autoComplete="name"
          />

          <InputField
            label="Phone number"
            type="tel"
            name="phone"
            value={values.phone}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Enter phone number"
            required
            error={errors.phone}
            touched={touched.phone}
            autoComplete="tel"
          />

          <InputField
            label="Email address"
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
            autoComplete="new-password"
          />

          <InputField
            label="Company name"
            type="text"
            name="company"
            value={values.company}
            onChange={handleChange}
            placeholder="Enter company name"
            maxLength={50}
            showCharCount
          />

          {/* Agency Radio Options */}
          <div className="flex flex-col text-left mb-6">
            <label className="text-xs font-semibold text-[#1D2939] mb-2 select-none">
              Are you an Agency?<span className="text-red-500 ml-0.5">*</span>
            </label>
            <div className="flex items-center gap-6">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="radio"
                  name="isAgency"
                  value="Yes"
                  checked={values.isAgency === 'Yes'}
                  onChange={handleChange}
                  className="sr-only"
                />
                <span className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all duration-150
                  ${values.isAgency === 'Yes' ? 'border-[#6C25FF] bg-white' : 'border-[#CBCBCB] bg-white'}`}>
                  {values.isAgency === 'Yes' && (
                    <span className="w-2.5 h-2.5 rounded-full bg-[#6C25FF]" />
                  )}
                </span>
                <span className="text-sm font-medium text-[#1E293B]">Yes</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="radio"
                  name="isAgency"
                  value="No"
                  checked={values.isAgency === 'No'}
                  onChange={handleChange}
                  className="sr-only"
                />
                <span className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all duration-150
                  ${values.isAgency === 'No' ? 'border-[#6C25FF] bg-white' : 'border-[#CBCBCB] bg-white'}`}>
                  {values.isAgency === 'No' && (
                    <span className="w-2.5 h-2.5 rounded-full bg-[#6C25FF]" />
                  )}
                </span>
                <span className="text-sm font-medium text-[#1E293B]">No</span>
              </label>
            </div>
          </div>

          <Button
            type="submit"
            variant={isFormInvalid ? 'disabled' : 'primary'}
            disabled={isFormInvalid}
            isLoading={isLoading}
            className="mt-6"
          >
            Create Account
          </Button>
        </form>
      </div>

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

export default Register;
