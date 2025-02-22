import { useState } from 'react';
import { useNavigate } from "react-router-dom";

import { SwitchCamera, ChevronRight, SearchIcon, SubtitlesIcon,BookOpenText, } from 'lucide-react';

const LandingPage = () => {
  const navigate = useNavigate(); // Hook for navigation

  const [darkMode, setDarkMode] = useState(true);

  // Toggle dark/light mode
  const toggleTheme = () => {
    setDarkMode((prev) => !prev);
  };

  // Theme classes
  const themeClasses = {
    background: darkMode ? 'bg-gray-900' : 'bg-text-color',
    text: darkMode ? 'text-gray-100' : 'text-gray-900',
    card: darkMode ? 'bg-gray-800' : 'bg-white',
    button: darkMode ? 'bg-teal-500 hover:bg-teal-600 text-white' : 'bg-teal-500 hover:bg-teal-600 text-white',
  };

  return (
    <div className={` ${themeClasses.background} flex flex-col transition-colors duration-300 w-full`}>
      {/* Header */}
      <header className={`${themeClasses.card} py-4 px-6 shadow-lg`}>
        <div className="max-w-6xl w-full mx-auto flex justify-between items-center">
          <h1 className={`text-2xl font-bold ${themeClasses.text}`}>
            <span className='bg-gradient-to-r from-purple-700 via-green-900 to-cyan-600 bg-clip-text text-transparent text-3xl'>AI Text Processor </span></h1>
          <button
            className={`p-2 rounded-lg ${themeClasses.button} transition-transform hover:scale-105`}
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            <SwitchCamera className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="flex-1 flex items-center justify-center py-20 px-4">
        <div className="max-w-4xl text-center">
          <h1 className={`text-5xl font-bold ${themeClasses.text} mb-6`}>
            Transform Your Text with AI
          </h1>
          <p className={`text-xl ${themeClasses.text} opacity-80 mb-8`}>
            Translate, summarize, and process text effortlessly using the power of <span className= 'font-semibold text-3xl inline-block bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent'> Chrome AI.</span> 
          </p>
          <button 
        onClick={() => navigate("/text-processing")} 
        className="mt-4 mx-auto p-2 bg-teal-500 hover:bg-teal-600 text-white font-semibold flex items-center justify-center rounded transition sm:w-8/12 md:w-6/12 lg:w-4/12 xl:w-3/12 "
      >
        Try It Now <ChevronRight className="ml-2" size={20} />
      </button>
        </div>
      </section>

      {/* Features Section */}
      <section className={`py-20 ${themeClasses.background}`}>
        <div className="max-w-6xl mx-auto px-4">
          <h2 className={`text-3xl font-bold ${themeClasses.text} text-center mb-12`}>
            Key Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1: Translation */}
            <div className={`p-6 rounded-lg shadow-lg ${themeClasses.card}`}>
              <div className="flex items-center mb-4">
                <div className={`p-3 rounded-full ${themeClasses.button}`}>
                  <BookOpenText className="w-6 h-6" />
                </div>
                <h3 className={`text-xl font-semibold ${themeClasses.text} ml-4`}>
                  Translation 
                </h3>
              </div>
              <p className={`${themeClasses.text} opacity-80`}>
                Translate text into multiple languages seamlessly using <span className= 'font-semibold  inline-block bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent'> Chrome AI</span>
                </p>
                <a 
                href="https://developer.chrome.com/docs/ai/translator-api"
        className="mt-4 mx-auto p-2 bg-card-color hover:bg-gray-600 text-white flex items-center justify-center rounded transition"
      >
        Learn More <ChevronRight className="ml-2" size={20} />
      </a>
      </div>

            {/* Feature 2: Summarization */}
            <div className={`p-6 rounded-lg shadow-lg ${themeClasses.card}`}>
              <div className="flex items-center mb-4">
                <div className={`p-3 rounded-full ${themeClasses.button}`}>
                  <SubtitlesIcon className="w-6 h-6" />
                </div>
                <h3 className={`text-xl font-semibold ${themeClasses.text} ml-4`}>
                  Summarization
                </h3>
              </div>
              <p className={`${themeClasses.text} opacity-80`}>
                Automatically summarize long texts into concise, meaningful points.</p>
                <a 
                href="https://developer.chrome.com/docs/ai/summarizer-api"
        className="mt-4 mx-auto p-2 bg-card-color hover:bg-gray-600 text-white flex items-center justify-center rounded transition"
      >
        Learn More <ChevronRight className="ml-2" size={20} />
      </a>
      </div>

            {/* Feature 3: Language Detection */}
            <div className={`p-6 rounded-lg shadow-lg ${themeClasses.card}`}>
              <div className="flex items-center mb-4">
                <div className={`p-3 rounded-full ${themeClasses.button}`}>
                  <SearchIcon className="w-6 h-6" />
                </div>
                <h3 className={`text-xl font-semibold ${themeClasses.text} ml-4`}>
                  Language Detection
                </h3>
              </div>
              <p className={`${themeClasses.text} opacity-80`}>
                Detect the language of your text with high accuracy.</p>
                <a 
                href="https://developer.chrome.com/docs/ai/summarizer-api"
        className="mt-4 mx-auto p-2 bg-card-color hover:bg-gray-600 text-white flex items-center justify-center rounded transition"
      >
        Learn More <ChevronRight className="ml-2" size={20} />
                </a>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className={`py-20 ${themeClasses.background}`}>
        <div className="max-w-6xl mx-auto px-4">
          <h2 className={`text-3xl font-bold ${themeClasses.text} text-center mb-12`}>
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1: Input Text */}
            <div className={`p-6 rounded-lg shadow-lg ${themeClasses.card}`}>
              <div className="flex items-center mb-4">
                <div className={`p-3 rounded-full ${themeClasses.button}`}>
                  <span className="text-lg font-bold">1</span>
                </div>
                <h3 className={`text-xl font-semibold ${themeClasses.text} ml-4`}>
                  Input Text
                </h3>
              </div>
              <p className={`${themeClasses.text} opacity-80`}>
                Type or paste your text into the input field.
              </p>
            </div>

            {/* Step 2: Process Text */}
            <div className={`p-6 rounded-lg shadow-lg ${themeClasses.card}`}>
              <div className="flex items-center mb-4">
                <div className={`p-3 rounded-full ${themeClasses.button}`}>
                  <span className="text-lg font-bold">2</span>
                </div>
                <h3 className={`text-xl font-semibold ${themeClasses.text} ml-4`}>
                  Process Text
                </h3>
              </div>
              <p className={`${themeClasses.text} opacity-80`}>
                Choose to translate, summarize, or detect the language of your text.
              </p>
            </div>

            {/* Step 3: Get Results */}
            <div className={`p-6 rounded-lg shadow-lg ${themeClasses.card}`}>
              <div className="flex items-center mb-4">
                <div className={`p-3 rounded-full ${themeClasses.button}`}>
                  <span className="text-lg font-bold">3</span>
                </div>
                <h3 className={`text-xl font-semibold ${themeClasses.text} ml-4`}>
                  Get Results
                </h3>
              </div>
              <p className={`${themeClasses.text} opacity-80`}>
                Instantly receive the processed text in your desired format.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className={`py-20 ${themeClasses.background}`}>
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className={`text-3xl font-bold ${themeClasses.text} mb-6`}>
            Ready to Transform Your Text?
          </h2>
          <p className={`text-xl ${themeClasses.text} opacity-80 mb-8`}>
            Experience the power of AI-driven text processing today.
          </p>

            <button 
        onClick={() => navigate("/text-processing")} 
        className="mt-4 mx-auto p-2 bg-teal-500 hover:bg-teal-600 text-white flex items-center justify-center rounded transition sm:w-8/12 md:w-6/12 lg:w-4/12 xl:w-3/12"
      >
        Get Started <ChevronRight className="ml-2" size={20} />
      </button>
  
        </div>
      </section>

      {/* Footer */}
      <footer className={`${themeClasses.card} py-6`}>
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className={`${themeClasses.text} opacity-80`}>
            &copy; 2025 AI Text Processor. All rights reserved.
          </p>
          
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;