const Button = ({
  children,
  type = 'button',
  onClick,
  disabled = false,
  isLoading = false,
  variant = 'primary',
  className = '',
  ...props
}) => {
  const isButtonDisabled = disabled || isLoading;
  const baseStyles = 'w-full py-4 px-4 rounded-xl text-sm font-semibold transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2';
  const variants = {
    primary: 'bg-[#6C25FF] text-white hover:bg-[#5B1BE0] active:scale-[0.98] focus:ring-[#6C25FF] shadow-sm',
    secondary: 'bg-[#E1D5FF] text-[#1D2939] hover:bg-[#D5C4FF] active:scale-[0.98] focus:ring-[#BCA4FF]',
    disabled: 'bg-[#CBCBCB] text-white cursor-not-allowed select-none'
  };

  const selectedVariant = isButtonDisabled ? variants.disabled : variants[variant];
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isButtonDisabled}
      className={`${baseStyles} ${selectedVariant} ${className}`}
      {...props}
    >
      {isLoading && (
        <svg
          className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      )}
      <span>{children}</span>
    </button>
  );
};

export default Button;
