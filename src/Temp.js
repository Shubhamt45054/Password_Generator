import React, { useState } from "react";
import { FaClipboard } from "react-icons/fa"; // Clipboard Icon

const App = () => {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(12);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(false); // Disabled by default
  const [isCopied, setIsCopied] = useState(false); // State to track copy status

  // Generate Password
  const generatePassword = () => {
    const lowerCaseChars = "abcdefghijklmnopqrstuvwxyz";
    const upperCaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numberChars = "0123456789";
    const symbolChars = "!@#$%^&*()_+~`|}{[]:;?><,./-=";

    let characters = "";
    if (includeLowercase) characters += lowerCaseChars;
    if (includeUppercase) characters += upperCaseChars;
    if (includeNumbers) characters += numberChars;
    if (includeSymbols) characters += symbolChars;

    if (!characters) {
      setPassword("Select at least one option!");
      return;
    }

    let generatedPassword = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      generatedPassword += characters[randomIndex];
    }
    setPassword(generatedPassword);
    setIsCopied(false); // Reset copy status on password generation
  };

  // Get Password Strength
  const getPasswordStrength = () => {
    if (length < 8) return { label: "Weak", color: "bg-red-500" };
    if (length < 12) return { label: "Moderate", color: "bg-yellow-500" };
    if (includeUppercase && includeLowercase && includeNumbers && includeSymbols)
      return { label: "Strong", color: "bg-green-500" };
    return { label: "Moderate", color: "bg-yellow-500" };
  };

  const { label, color } = getPasswordStrength();

  // Copy to Clipboard
  const copyToClipboard = () => {
    if (password && password !== "Select at least one option!") {
      navigator.clipboard.writeText(password);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000); // Reset copy status after 2 seconds
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="bg-gray-50 shadow-lg rounded-lg p-6 w-full max-w-lg font-sans text-gray-800">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Password Generator</h1>
        </div>

        {/* Password Length Slider */}
        <div className="mb-6">
          <label className="block text-lg font-medium text-gray-700 mb-2">Password Length: {length}</label>
          <input
            type="range"
            min="4"
            max="20"
            value={length}
            onChange={(e) => setLength(parseInt(e.target.value, 10))}
            className="w-full h-2 bg-gray-300 rounded-lg cursor-pointer"
          />
        </div>

        {/* Password Generation Settings */}
        <div className="mb-4">
          <label className="flex items-center text-lg">
            <input
              type="checkbox"
              checked={includeLowercase}
              onChange={(e) => setIncludeLowercase(e.target.checked)}
              className="mr-2"
            />
            Include Lowercase Letters
          </label>
          <label className="flex items-center text-lg">
            <input
              type="checkbox"
              checked={includeUppercase}
              onChange={(e) => setIncludeUppercase(e.target.checked)}
              className="mr-2"
            />
            Include Uppercase Letters
          </label>
          <label className="flex items-center text-lg">
            <input
              type="checkbox"
              checked={includeNumbers}
              onChange={(e) => setIncludeNumbers(e.target.checked)}
              className="mr-2"
            />
            Include Numbers
          </label>
          <label className="flex items-center text-lg">
            <input
              type="checkbox"
              checked={includeSymbols}
              onChange={(e) => setIncludeSymbols(e.target.checked)}
              className="mr-2"
            />
            Include Symbols
          </label>
        </div>

        {/* Generate Password Button */}
        <button
          onClick={generatePassword}
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 text-lg"
        >
          Generate Password
        </button>

        {/* Generated Password Display */}
        <div className="mt-4">
          <h2 className="text-lg font-medium text-gray-700">Generated Password:</h2>
          <p
            className={`font-mono bg-gray-100 p-2 rounded-md mt-2 text-lg break-all ${
              password === "Select at least one option!" ? "text-red-500" : "text-gray-800"
            }`}
          >
            {password || "Click 'Generate Password' to create one"}
          </p>
          <button
            onClick={copyToClipboard}
            className="mt-2 w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 flex items-center justify-center text-lg"
          >
            <FaClipboard className="mr-2" />
            {isCopied ? "Copied!" : "Copy to Clipboard"}
          </button>
        </div>

        {/* Password Strength Indicator */}
        <div className="mt-4 flex items-center justify-center space-x-2">
          <div className={`w-4 h-4 rounded-full ${color}`}></div>
          <h2 className="text-lg font-medium text-gray-700">Password Strength: {label}</h2>
        </div>
      </div>
    </div>
  );
};

export default App;
