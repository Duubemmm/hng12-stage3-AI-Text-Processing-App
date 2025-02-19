import { useState, useEffect, useRef } from 'react';
import { Send, SwitchCamera } from 'lucide-react';

// Language mapping
const languageMap = {
  'en': 'English',
  'es': 'Spanish',
  'fr': 'French',
  'pt': 'Portuguese',
  'ru': 'Russian',
};

const TextProcessing = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [targetLanguage, setTargetLanguage] = useState('fr'); // Default to French
  const [isProcessing, setIsProcessing] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [error, setError] = useState('');
  const [showDropdown, setShowDropdown] = useState({}); // Tracks visibility of dropdown per message
  const messagesEndRef = useRef(null);

  console.log(setTargetLanguage);
  // Auto-scroll to the newest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Detect language using Chrome AI API
  const detectLanguage = async (text) => {
    if (!text.trim()) {
      setError('Input text cannot be empty.');
      return null;
    }

    try {
      const detector = await self.ai.languageDetector.create();
      const results = await detector.detect(text);
      const topResult = results[0];
      return {
        code: topResult.detectedLanguage,
        name: languageMap[topResult.detectedLanguage] || topResult.detectedLanguage,
        confidence: topResult.confidence,
      };
    } catch (error) {
      console.error('Language detection error:', error);
      setError('Failed to detect language. Please try again.');
      return null;
    }
  };

  // Translate text using Chrome AI API
  const translateText = async (text, sourceLang, targetLang) => {
    if (!text.trim()) {
      setError('Input text cannot be empty.');
      return '';
    }

    try {
      const translator = await self.ai.translator.create({
        sourceLanguage: sourceLang || 'auto',
        targetLanguage: targetLang,
      });
      const translatedText = await translator.translate(text);
      return translatedText;
    } catch (error) {
      console.error('Translation error:', error);
      setError('Failed to translate text. Please try again.');
      throw error;
    }
  };

  // Summarize text (mock implementation)
  const summarizeText = async (text) => {
    if (!text.trim()) {
      setError('Input text cannot be empty.');
      return '';
    }

    try {
      const sentences = text.match(/[^.!?]+[.!?]+/g) || [];
      if (sentences.length <= 3) return text;
      return sentences.slice(0, 3).join(' ') + '...';
    } catch (error) {
      console.error('Summarization error:', error);
      setError('Failed to summarize text. Please try again.');
      throw error;
    }
  };

  // Handle sending a new message
  const handleSendMessage = async () => {
    if (!inputText.trim()) {
      setError('Input text cannot be empty.');
      return;
    }

    setIsProcessing(true);
    setError('');

    try {
      // Add user message to chat
      const messageId = Date.now();
      setMessages((prev) => [
        ...prev,
        {
          id: messageId,
          type: 'user',
          text: inputText,
          timestamp: new Date(),
          pending: true,
        },
      ]);
      setInputText('');

      // Detect language
      const detected = await detectLanguage(inputText);
      if (!detected) return;

      // Update message with language detection
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === messageId
            ? {
                ...msg,
                pending: false,
                language: detected,
              }
            : msg
        )
      );
    } catch (error) {
      console.error('Error processing message:', error);
      setError('An error occurred. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  // Handle translation
  const handleTranslate = async (messageId, targetLang) => {
    const message = messages.find((msg) => msg.id === messageId);
    if (!message || !message.text) {
      setError('No text available for translation.');
      return;
    }

    setIsProcessing(true);
    setError('');

    try {
      const sourceLang = message.language?.code || 'auto';
      const translatedText = await translateText(message.text, sourceLang, targetLang);

      // Update message with translation
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === messageId
            ? {
                ...msg,
                translations: {
                  ...(msg.translations || {}),
                  [targetLang]: translatedText,
                },
              }
            : msg
        )
      );

      // Hide dropdown after translation
      setShowDropdown((prev) => ({ ...prev, [messageId]: false }));
    } catch (error) {
      console.error('Translation error:', error);
      setError('Failed to translate text. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  // Handle summarization
  const handleSummarize = async (messageId) => {
    const message = messages.find((msg) => msg.id === messageId);
    if (!message || !message.text) {
      setError('No text available for summarization.');
      return;
    }

    setIsProcessing(true);
    setError('');

    try {
      const summary = await summarizeText(message.text);

      // Update message with summary
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === messageId
            ? {
                ...msg,
                summary,
              }
            : msg
        )
      );
    } catch (error) {
      console.error('Summarization error:', error);
      setError('Failed to summarize text. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  // Toggle dark/light mode
  const toggleTheme = () => {
    setDarkMode((prev) => !prev);
  };

  // Theme classes
  const themeClasses = {
    background: darkMode ? 'bg-gray-900' : 'bg-[#ded2c9]',
    card: darkMode ? 'bg-gray-800' : 'bg-white',
    text: darkMode ? 'text-gray-100' : 'text-gray-900',
    input: darkMode ? 'bg-gray-700 text-gray-100 placeholder-gray-400' : 'bg-gray-100 text-gray-900 placeholder-gray-500',
    button: darkMode ? 'bg-teal-500 hover:bg-teal-600 text-white' : 'bg-teal-500 hover:bg-teal-600 text-white',
    dropdown: darkMode ? 'bg-gray-700 text-gray-100' : 'bg-gray-100 text-gray-900',
    messageUser: darkMode ? 'bg-teal-600 text-white' : 'bg-teal-500 text-white',
    messageTranslation: darkMode ? 'bg-gray-700 text-gray-100' : 'bg-gray-100 text-gray-900',
    error: darkMode ? 'bg-red-900/50 text-red-200' : 'bg-red-100 text-red-800',
  };

  return (
    <div className={`h-auto ${themeClasses.background} flex flex-col transition-colors duration-300 w-3/4 max-w-xl rounded-lg shadow-xl`}>
      {/* Header */}
      <header className={`${themeClasses.card} py-4 px-6 shadow-lg`}>
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <h1 className={`text-2xl font-bold ${themeClasses.text}`}>AI Text Processor</h1>
          <button
            className={`p-2 rounded-lg ${themeClasses.button} transition-transform hover:scale-105`}
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            <SwitchCamera className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Error message */}
      {error && (
        <div className="max-w-4xl mx-auto mt-4 px-4">
          <div className={`p-3 rounded-lg ${themeClasses.error}`}>
            {error}
            <button
              className="ml-2 underline"
              onClick={() => setError('')}
              aria-label="Dismiss error"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}

      {/* Chat Messages Area */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="max-w-4xl mx-auto space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={`${message.pending ? 'opacity-70' : ''}`}>
              {/* Message bubble */}
              <div className={`p-4 rounded-lg shadow-md ${themeClasses.messageUser}`}>
                <div className="font-medium">{message.text}</div>

                {/* Message metadata */}
                {!message.pending && (
                  <div className="mt-2 text-sm opacity-80">
                    Detected: {message.language.name} ({(message.language.confidence * 100).toFixed(1)}%)
                  </div>
                )}

                {/* Action buttons */}
                {!message.pending && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    <button
                      onClick={() => handleSummarize(message.id)}
                      disabled={isProcessing}
                      className={`px-3 py-1 text-sm rounded-lg ${themeClasses.button} disabled:opacity-50`}
                      aria-label="Summarize message"
                    >
                      Summarize
                    </button>
                    <button
                      onClick={() => setShowDropdown((prev) => ({ ...prev, [message.id]: !prev[message.id] }))}
                      disabled={isProcessing}
                      className={`px-3 py-1 text-sm rounded-lg ${themeClasses.button} disabled:opacity-50`}
                      aria-label="Translate message"
                    >
                      Translate
                    </button>
                    {showDropdown[message.id] && (
                      <select
                        value={targetLanguage}
                        onChange={(e) => handleTranslate(message.id, e.target.value)}
                        className={`p-2 rounded-lg ${themeClasses.dropdown} focus:outline-none focus:ring-2 focus:ring-teal-500`}
                        disabled={isProcessing}
                        aria-label="Select target language for translation"
                      >
                        {Object.entries(languageMap).map(([code, name]) => (
                          <option key={code} value={code}>
                            {name}
                          </option>
                        ))}
                      </select>
                    )}
                  </div>
                )}

                {/* Summary result */}
                {message.summary && (
                  <div className={`mt-3 p-3 rounded-lg ${themeClasses.messageTranslation}`}>
                    <div className="text-sm font-medium mb-1">Summary:</div>
                    <div>{message.summary}</div>
                  </div>
                )}

                {/* Translation results */}
                {message.translations && Object.entries(message.translations).map(([langCode, content]) => (
                  <div key={langCode} className={`mt-3 p-3 rounded-lg ${themeClasses.messageTranslation}`}>
                    <div className="text-sm font-medium mb-1">
                      Translated to {languageMap[langCode] || langCode}:
                    </div>
                    <div>{content}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className={`border-t ${themeClasses.card} p-4 shadow-lg`}>
        <div className="max-w-4xl mx-auto">
          <div className="flex items-end gap-2">
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type or paste text here..."
              disabled={isProcessing}
              className={`flex-1 p-3 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-teal-500 ${themeClasses.input}`}
              aria-label="Input text for processing"
            />
            <button
              onClick={handleSendMessage}
              disabled={isProcessing || !inputText.trim()}
              className={`p-3 rounded-lg ${themeClasses.button} transition-transform hover:scale-105 disabled:opacity-50`}
              aria-label="Send message"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TextProcessing;