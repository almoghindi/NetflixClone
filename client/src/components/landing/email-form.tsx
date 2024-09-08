import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const EmailForm: React.FC = () => {
  const navigate = useNavigate();
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);
  const [isInvalid, setIsInvalid] = useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    setHasValue(!!event.target.value);
    setIsInvalid(!event.target.validity.valid);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const emailInput = event.currentTarget.querySelector(
      "#email"
    ) as HTMLInputElement;
    if (!emailInput.validity.valid) {
      setIsInvalid(true);
      return;
    }

    navigate("/signup", { state: { emailInput: emailInput.value } });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-2xl mt-4 flex flex-col sm:flex-row gap-4"
    >
      <div className="relative flex-grow">
        <input
          type="email"
          id="email"
          className={`w-full py-3 px-4 bg-black bg-opacity-50 border ${
            isInvalid ? "border-red-600" : "border-gray-600"
          } rounded text-white peer focus:outline-none`}
          required
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        <label
          htmlFor="email"
          className={`absolute left-4 top-1/2 transform -translate-y-1/2 transition-all duration-300 ease-in-out ${
            isFocused || hasValue
              ? "top-2 text-xs text-gray-400"
              : "text-base text-gray-500"
          }`}
        >
          Email address
        </label>
        {isInvalid && (
          <p className="absolute text-xs left-0 text-red-600">
            Email is required.
          </p>
        )}
      </div>
      <button
        type="submit"
        className="bg-red-600 hover:bg-red-700 text-white font-bold text-xl py-3 px-8 rounded"
      >
        Get Started &gt;
      </button>
    </form>
  );
};

export default EmailForm;
