import React, { useState } from "react";
import { FaClipboard } from "react-icons/fa"; 

const App = () => {

  const [password, setPassword] = useState("");
  const [length, setLength] = useState(12);

  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(false);
  const [includeSymbols, setIncludeSymbols] = useState(false); 
  // to copy..
  const [isCopied, setIsCopied] = useState(false);


  // gernerating the password 
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
    setIsCopied(false);
  };

 
  // check password strength
  const getPasswordStrength = () => {
    if (length < 8) return { label: "Weak", color: "bg-red-500" };
    if (length < 12) return { label: "Moderate", color: "bg-yellow-500" };
    if (includeUppercase && includeLowercase && includeNumbers && (includeSymbols || length>=15))
      return { label: "Strong", color: "bg-green-500" };
    return { label: "Moderate", color: "bg-yellow-500" };
  };

  const { label, color } = getPasswordStrength();

  
  // copy password..
  const copyToClipboard = () => {
    if (password && password !== "Select at least one option!") {
      navigator.clipboard.writeText(password);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000); 
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">

      <div className="bg-white shadow-2xl rounded-3xl px-8 py-3 w-full max-w-lg font-sans text-gray-800">
        <div className="flex justify-between items-center mb-3">
          <h1 className="text-4xl font-extrabold text-indigo-900">CryptKey</h1>
        </div>

        {/* slider  */}
        <div className="mb-4">
          <label className="block text-xl font-bold text-gray-800 mb-3">Password Length: <span className="text-indigo-700">{length}</span></label>
          <input
            type="range"
            min="4"
            max="20"
            value={length}
            onChange={(e) => setLength(parseInt(e.target.value, 10))}
            className="w-full size-lg h-4 bg-gray-300 rounded-lg cursor-pointer shadow-xl"
          />
        </div>

         {/* settings */}
        <div className="mb-3 space-y-2">
          <label className="flex items-center text-lg font-semibold text-gray-700">
            <input
              type="checkbox"
              checked={includeLowercase}
              onChange={(e) => setIncludeLowercase(e.target.checked)}
              className="mr-3 accent-indigo-600"
            />
            Include Lowercase Letters
          </label>
          <label className="flex items-center text-lg font-semibold text-gray-700">
            <input
              type="checkbox"
              checked={includeUppercase}
              onChange={(e) => setIncludeUppercase(e.target.checked)}
              className="mr-3 accent-indigo-600"
            />
            Include Uppercase Letters
          </label>
          <label className="flex items-center text-lg font-semibold text-gray-700">
            <input
              type="checkbox"
              checked={includeNumbers}
              onChange={(e) => setIncludeNumbers(e.target.checked)}
              className="mr-3 accent-indigo-600"
            />
            Include Numbers
          </label>
          <label className="flex items-center text-lg font-semibold text-gray-700">
            <input
              type="checkbox"
              checked={includeSymbols}
              onChange={(e) => setIncludeSymbols(e.target.checked)}
              className="mr-3 accent-indigo-600"
            />
            Include Symbols
          </label>
        </div>

        
        <button
          onClick={generatePassword}
          className="w-full bg-indigo-600 text-white py-2.5 rounded-lg hover:bg-indigo-700 text-xl font-extrabold shadow-lg transform hover:scale-105 transition-transform"
        >
          Generate Password
        </button>

        
        <div className="mt-6">
          <h2 className="text-xl font-bold text-gray-800">Generated Password:</h2>
          <p
            className={`font-mono bg-gray-200 p-4 rounded-lg mt-4 text-lg break-all font-bold shadow-inner transition-colors duration-300 ${
              password === "Select at least one option!" ? "text-red-500" : "text-gray-800"
            }`}
          >
            {password || "Click 'Generate Password' to create one"}
          </p>
          <button
            onClick={copyToClipboard}
            className="mt-4 w-full bg-green-500 text-white py-2.5 rounded-lg hover:bg-green-600 flex items-center justify-center text-lg font-extrabold shadow-lg transform hover:scale-105 transition-transform"
          >
            <FaClipboard className="mr-3" />
            {isCopied ? "Copied!" : "Copy to Clipboard"}
          </button>
        </div>

        
        <div className="mt-6 flex items-center justify-center space-x-3">
          <div className={`w-6 h-6 rounded-full ${color}`}></div>
          <h2 className="text-lg font-bold text-gray-800">Password Strength: {label}</h2>
        </div>
        
      </div>

    </div>
  );
};

export default App;
