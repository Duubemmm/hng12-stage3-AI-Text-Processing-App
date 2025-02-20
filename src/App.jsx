import { BrowserRouter as Router, Routes, Route, useNavigate} from "react-router-dom";
import LandingPage from "./components/LandingPage";
import TextProcessing from "./components/TextProcessing";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#798486] w-full">
        <Routes>
          <Route path="/" element={<LandingPageWithNav />} />
          <Route path="/text-processing" element={<TextProcessingWithNav />} />
        </Routes>
      </div>
    </Router>
  );
}

function LandingPageWithNav() {
  return (
    <div>
      <LandingPage />

    </div>
  );
}

function TextProcessingWithNav() {
  const navigate = useNavigate();
  return (
    <div className="p-4 h-auto mt-4 w-full max-w-3xl mx-auto">
      <TextProcessing />
      <div className="mt-4">
      <button 
          onClick={() => navigate("/")} 
          className="p-2 font-semibold flex justify-center align-center w-1/3 bg-gray-600 mx-auto text-white rounded hover:bg-gray-800 transition"
        >
          Back
        </button>
      </div>
    </div>
  );
}

export default App;

