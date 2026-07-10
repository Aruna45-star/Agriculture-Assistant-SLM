import { useEffect, useRef, useState } from 'react';
import './App.css';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import ChatBox from './components/ChatBox';
import InputArea from './components/InputArea';

const translations = {
  English: {
    title: 'Agriculture Assistant SLM',
    subtitle: 'AI Powered Agriculture Chatbot',
    placeholder: 'Ask an agriculture question...',
    send: 'Send',
    darkMode: '🌙 Dark Mode',
    lightMode: '☀️ Light Mode',
    actionsTitle: 'Chat Actions',
    examplesTitle: 'Example Questions',
    thinking: '🌱 Thinking...',
    alert: 'Please enter a question.',
    error: '❌ Unable to connect to backend.',
    confirmClear: 'Are you sure you want to clear the entire chat history?',
    welcome: `
👋 Welcome!
<br><br>
Ask me anything related to:
<ul>
<li>🌾 Crop Recommendation</li>
<li>🌱 Farming Practices</li>
<li>💧 Irrigation</li>
<li>🌿 Fertilizers</li>
<li>🐛 Pest Management</li>
</ul>
`,
    examples: [
      'How to grow rice?',
      'Best fertilizer for rice?',
      'Suggest a crop for black soil',
      'What is drip irrigation?'
    ]
  },
  Telugu: {
    title: 'వ్యవసాయ సహాయకుడు',
    subtitle: 'AI ఆధారిత వ్యవసాయ చాట్‌బాట్',
    placeholder: 'వ్యవసాయ ప్రశ్న అడగండి...',
    send: 'పంపండి',
    darkMode: '🌙 డార్క్ మోడ్',
    lightMode: '☀️ లైట్ మోడ్',
    actionsTitle: 'చాట్ ఆప్షన్స్',
    examplesTitle: 'ఉదాహరణ ప్రశ్నలు',
    thinking: '🌱 ఆలోచిస్తున్నాను...',
    alert: 'దయచేసి ఒక ప్రశ్న నమోదు చేయండి.',
    error: '❌ సర్వర్‌తో కనెక్ట్ కాలేకపోయాను.',
    confirmClear: 'మీరు చాట్ చరిత్రను పూర్తిగా క్లియర్ చేయాలనుకుంటున్నారా?',
    welcome: `
👋 స్వాగతం!
<br><br>
మీరు అడగవచ్చు:
<ul>
<li>🌾 పంటల సిఫార్సు</li>
<li>🌱 వ్యవసాయ పద్ధతులు</li>
<li>💧 నీటి పారుదల</li>
<li>🌿 ఎరువులు</li>
<li>🐛 పురుగు నివారణ</li>
</ul>
`,
    examples: [
      'వరి ఎలా పండించాలి?',
      'వరికి మంచి ఎరువు ఏది?',
      'నల్ల నేలకు ఏ పంట మంచిది?',
      'డ్రిప్ ఇరిగేషన్ అంటే ఏమిటి?'
    ]
  },
  Hindi: {
    title: 'कृषि सहायक',
    subtitle: 'AI आधारित कृषि चैटबॉट',
    placeholder: 'कृषि से संबंधित प्रश्न पूछें...',
    send: 'भेजें',
    darkMode: '🌙 डार्क मोड',
    lightMode: '☀️ लाइट मोड',
    actionsTitle: 'चैट विकल्प',
    examplesTitle: 'उदाहरण प्रश्न',
    thinking: '🌱 सोच रहा हूँ...',
    alert: 'कृपया प्रश्न लिखें।',
    error: '❌ सर्वर से कनेक्ट नहीं हो सका।',
    confirmClear: 'क्या आप पूरी चैट इतिहास साफ़ करना चाहते हैं?',
    welcome: `
👋 स्वागत है!
<br><br>
आप पूछ सकते हैं:
<ul>
<li>🌾 फसल की सिफारिश</li>
<li>🌱 खेती के तरीके</li>
<li>💧 सिंचाई</li>
<li>🌿 उर्वरक</li>
<li>🐛 कवक नियंत्रण</li>
</ul>
`,
    examples: [
      'धान की खेती कैसे करें?',
      'धान के लिए सबसे अच्छा उर्वरक कौन सा है?',
      'काली मिट्टी के लिए कौन सी फसल अच्छी है?',
      'ड्रिप सिंचाई क्या है?'
    ]
  }
};

const STORAGE_KEY = 'agri_chat_history';
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';
const API_URL = API_BASE_URL.endsWith('/chat') ? API_BASE_URL : `${API_BASE_URL}/chat`;

function App() {
  const [language, setLanguage] = useState('English');
  const [darkMode, setDarkMode] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [voiceSupported, setVoiceSupported] = useState(false);
  const recognitionRef = useRef(null);
  const chatBoxRef = useRef(null);

  const activeTranslations = translations[language];

  useEffect(() => {
    document.body.classList.toggle('dark', darkMode);
    return () => document.body.classList.remove('dark');
  }, [darkMode]);

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          setMessages(parsed);
        }
      } catch {
        window.localStorage.removeItem(STORAGE_KEY);
      }
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = language === 'Telugu' ? 'te-IN' : language === 'Hindi' ? 'hi-IN' : 'en-IN';
      recognition.onstart = () => setIsListening(true);
      recognition.onresult = (event) => {
        setInputValue(event.results[0][0].transcript);
      };
      recognition.onend = () => setIsListening(false);
      recognition.onerror = () => setIsListening(false);
      recognitionRef.current = recognition;
      setVoiceSupported(true);
    } else {
      setVoiceSupported(false);
    }
  }, []);

  useEffect(() => {
    if (recognitionRef.current) {
      recognitionRef.current.lang = language === 'Telugu' ? 'te-IN' : language === 'Hindi' ? 'hi-IN' : 'en-IN';
    }
  }, [language]);

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
  }, [messages]);

  const toggleDrawer = () => {
    setIsDrawerOpen((prev) => !prev);
  };

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  const handleExampleSelect = (text) => {
    setInputValue(text);
    setIsDrawerOpen(false);
  };

  const clearChatHistory = () => {
    if (window.confirm(activeTranslations.confirmClear)) {
      window.localStorage.removeItem(STORAGE_KEY);
      setMessages([]);
      setIsDrawerOpen(false);
    }
  };

  const downloadChatPDF = () => {
    setIsDrawerOpen(false);
    if (window.html2pdf && chatBoxRef.current) {
      const options = {
        margin: 15,
        filename: 'Agriculture_Assistant_Chat.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
      };
      window.html2pdf().set(options).from(chatBoxRef.current).save();
    }
  };

  const startVoiceInput = () => {
    if (!recognitionRef.current) {
      window.alert('Voice Input not supported.');
      return;
    }

    recognitionRef.current.start();
  };

  const handleSend = async () => {
    const question = inputValue.trim();
    if (question === '') {
      window.alert(activeTranslations.alert);
      return;
    }

    const nextMessages = [...messages, { type: 'user', content: question }];
    setMessages(nextMessages);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await fetch(`${API_URL}?prompt=${encodeURIComponent(question)}&language=${encodeURIComponent(language)}`);
      const data = await response.json();

      let answer = '';
      if (typeof data === 'string') {
        answer = data;
      } else if (data.response) {
        answer = data.response;
      } else if (data.message) {
        answer = data.message;
      } else if (data.error) {
        answer = data.error;
      } else {
        answer = JSON.stringify(data);
      }

      setMessages([...nextMessages, { type: 'bot', content: answer }]);
    } catch {
      setMessages([...nextMessages, { type: 'bot', content: activeTranslations.error }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      <Sidebar
        isOpen={isDrawerOpen}
        toggleDrawer={toggleDrawer}
        translations={activeTranslations}
        examples={activeTranslations.examples}
        onExampleSelect={handleExampleSelect}
        onClearHistory={clearChatHistory}
        onDownloadPDF={downloadChatPDF}
      />

      <div className="main">
        <Header
          toggleDrawer={toggleDrawer}
          language={language}
          setLanguage={setLanguage}
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
          translations={activeTranslations}
        />

        <ChatBox
          messages={messages}
          isLoading={isLoading}
          translations={activeTranslations}
          chatBoxRef={chatBoxRef}
        />

        <InputArea
          inputValue={inputValue}
          setInputValue={setInputValue}
          onSend={handleSend}
          onStartVoice={startVoiceInput}
          isListening={isListening}
          voiceSupported={voiceSupported}
          translations={activeTranslations}
        />
      </div>
    </div>
  );
}

export default App;
