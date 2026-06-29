import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
const InputField = React.forwardRef(({
  label,
  type = 'text',
  value = '',
  onChange,
  name,
  placeholder,
  required = false,
  error = '',
  touched = false,
  maxLength,
  showCharCount = false,
  onBlur,
  ...props
}, ref) => {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === 'password';
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;
  const hasError = touched && error;

  return (
    <div className="w-full mb-3 text-left">
      <div className="relative rounded-md">
        {/* Input Control */}
        <input
          ref={ref}
          type={inputType}
          name={name}
          id={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          maxLength={maxLength}
          className={`block w-full rounded-lg border bg-[#F8F9FA] px-3.5 py-3.5 text-sm text-[#1D2939] placeholder:text-gray-400 focus:outline-none transition-all duration-150
            ${hasError
              ? 'border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500'
              : 'border-[#CBCBCB] focus:border-[#6C25FF] focus:ring-1 focus:ring-[#6C25FF]'
            } ${isPassword ? 'pr-10' : ''}`}
          {...props}
        />

        {/* Floating Label sitting on border */}
        <label
          htmlFor={name}
          className={`absolute left-3.5 -top-2.5 px-1.5 text-xs font-semibold bg-[#F8F9FA] rounded transition-all duration-150 select-none
            ${hasError ? 'text-red-500' : 'text-[#6C25FF]'}`}
        >
          {label}
          {required && <span className="text-red-500 ml-0.5">*</span>}
        </label>

        {/* Password Visibility Toggle */}
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700 focus:outline-none cursor-pointer"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5 text-gray-500" aria-hidden="true" />
            ) : (
              <Eye className="h-5 w-5 text-gray-500" aria-hidden="true" />
            )}
          </button>
        )}
      </div>

      {/* Helper message / Character Counter */}
      <div className="flex justify-between items-start mt-1 px-1">
        <span className={`text-[11px] min-h-[14px] leading-tight ${hasError ? 'text-red-500 font-medium' : 'text-gray-500'}`}>
          {hasError ? error : ''}
        </span>

        {showCharCount && maxLength && (
          <span className="text-[11px] text-gray-400 font-mono">
            {value.length} / {maxLength}
          </span>
        )}
      </div>
    </div>
  );
});

InputField.displayName = 'InputField';

export default InputField;
