const chatBox = document.getElementById("chatBox");
const questionBox = document.getElementById("question");
const languageSelect = document.getElementById("language");
const themeBtn = document.getElementById("themeBtn");
const sendBtn = document.getElementById("sendBtn");
const micBtn = document.getElementById("micBtn");
const welcomeMessage = document.getElementById("welcomeMessage");
const sidebarDrawer = document.getElementById("sidebarDrawer");
const drawerOverlay = document.getElementById("drawerOverlay");

// ======================
// DRAWER TOGGLE LOGIC
// ======================
function toggleDrawer() {
    sidebarDrawer.classList.toggle("open");
    drawerOverlay.classList.toggle("show");
}

// ======================
// DARK MODE
// ======================
themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    const lang = languageSelect.value;

    if(document.body.classList.contains("dark")){
        themeBtn.innerHTML = translations[lang].lightMode;
    }else{
        themeBtn.innerHTML = translations[lang].darkMode;
    }
});

// ======================
// TRANSLATIONS
// ======================
const translations={

    English:{
        title:"Agriculture Assistant SLM",
        subtitle:"AI Powered Agriculture Chatbot",
        placeholder:"Ask an agriculture question...",
        send:"Send",
        darkMode:"🌙 Dark Mode",
        lightMode:"☀️ Light Mode",
        actionsTitle:"Chat Actions",
        examplesTitle:"Example Questions",
        thinking:"🌱 Thinking...",
        alert:"Please enter a question.",
        error:"❌ Unable to connect to backend.",
        welcome:`
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
        examples:[
            "How to grow rice?",
            "Best fertilizer for rice?",
            "Suggest a crop for black soil",
            "What is drip irrigation?"
        ]
    },

    Telugu:{
        title:"వ్యవసాయ సహాయకుడు",
        subtitle:"AI ఆధారిత వ్యవసాయ చాట్‌బాట్",
        placeholder:"వ్యవసాయ ప్రశ్న అడగండి...",
        send:"పంపండి",
        darkMode:"🌙 డార్క్ మోడ్",
        lightMode:"☀️ లైట్ మోడ్",
        actionsTitle:"చాట్ ఆప్షన్స్",
        examplesTitle:"ఉదాహరణ ప్రశ్నలు",
        thinking:"🌱 ఆలోచిస్తున్నాను...",
        alert:"దయచేసి ఒక ప్రశ్న నమోదు చేయండి.",
        error:"❌ సర్వర్‌తో కనెక్ట్ కాలేకపోయాను.",
        welcome:`
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
        examples:[
            "వరి ఎలా పండించాలి?",
            "వరికి మంచి ఎరువు ఏది?",
            "నల్ల నేలకు ఏ పంట మంచిది?",
            "డ్రిప్ ఇరిగేషన్ అంటే ఏమిటి?"
        ]
    },

    Hindi:{
        title:"कृषि सहायक",
        subtitle:"AI आधारित कृषि चैटबॉट",
        placeholder:"कृषि से संबंधित प्रश्न पूछें...",
        send:"भेजें",
        darkMode:"🌙 डार्क मोड",
        lightMode:"☀️ लाइट मोड",
        actionsTitle:"चैट विकल्प",
        examplesTitle:"उदाहरण प्रश्न",
        thinking:"🌱 सोच रहा हूँ...",
        alert:"कृपया प्रश्न लिखें।",
        error:"❌ सर्वर से कनेक्ट नहीं हो सका।",
        welcome:`
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
        examples:[
            "धान की खेती कैसे करें?",
            "धान के लिए सबसे अच्छा उर्वरक कौन सा है?",
            "काली मिट्टी के लिए कौन सी फसल अच्छी है?",
            "ड्रिप सिंचाई क्या है?"
        ]
    }
};

// ======================
// LANGUAGE CHANGE
// ======================
languageSelect.addEventListener("change",changeLanguage);

function changeLanguage(){
    const lang=languageSelect.value;
    document.querySelector(".header h1").innerText=translations[lang].title;
    document.querySelector(".header p").innerText=translations[lang].subtitle;
    questionBox.placeholder=translations[lang].placeholder;
    sendBtn.innerText = translations[lang].send;

    if(document.body.classList.contains("dark")){
        themeBtn.innerHTML = translations[lang].lightMode;
    }else{
        themeBtn.innerHTML = translations[lang].darkMode;
    }

    document.getElementById("exampleHeading").innerText = translations[lang].examplesTitle;
    document.getElementById("actionsHeading").innerText = translations[lang].actionsTitle;

    const currentWelcomeMessage = document.getElementById("welcomeMessage");
    if (currentWelcomeMessage) {
        currentWelcomeMessage.innerHTML = translations[lang].welcome;
    }

    const buttons=document.querySelectorAll(".examples button");
    buttons.forEach((btn,index)=>{
        btn.innerText= ["🌱","🌾","🌿","💧"][index]+" "+translations[lang].examples[index];
        btn.setAttribute("onclick", `fillQuestion('${translations[lang].examples[index]}')`);
    });
}

changeLanguage();

// ======================
// EXAMPLE QUESTION CLICK
// ======================
function fillQuestion(text){
    questionBox.value=text;
    questionBox.focus();
    toggleDrawer();
}

// ======================
// ENTER KEY
// ======================
questionBox.addEventListener("keypress",e=>{
    if(e.key==="Enter"){
        askAI();
    }
});

// ======================
// VOICE INPUT
// ======================
const SpeechRecognition= window.SpeechRecognition|| window.webkitSpeechRecognition;
let recognition;

if(SpeechRecognition){
    recognition=new SpeechRecognition();
    recognition.continuous=false;
    recognition.interimResults=false;

    recognition.onstart=()=>{
        micBtn.classList.add("recording");
        questionBox.placeholder="🎤 Listening...";
    };

    recognition.onresult=(event)=>{
        questionBox.value= event.results[0][0].transcript;
    };

    recognition.onend=()=>{
        micBtn.classList.remove("recording");
        changeLanguage();
    };

    recognition.onerror=()=>{
        micBtn.classList.remove("recording");
    };
} else{
    micBtn.style.display="none";
}

function startVoiceInput(){
    if(!recognition){
        alert("Voice Input not supported.");
        return;
    }

    const lang=languageSelect.value;
    if(lang==="English") recognition.lang="en-IN";
    if(lang==="Telugu") recognition.lang="te-IN";
    if(lang==="Hindi") recognition.lang="hi-IN";
    
    recognition.start();
}

// ==========================
// CHAT HISTORY & PDF LOGIC
// ==========================
function saveChatToHistory() {
    localStorage.setItem("agri_chat_history", chatBox.innerHTML);
}

function loadChatHistory() {
    const savedChat = localStorage.getItem("agri_chat_history");
    if (savedChat) {
        chatBox.innerHTML = savedChat;
        chatBox.scrollTop = chatBox.scrollHeight;
    }
}

// Clear History
function clearChatHistory() {
    if (confirm("Are you sure you want to clear the entire chat history?")) {
        localStorage.removeItem("agri_chat_history");
        
        const lang = languageSelect.value;
        chatBox.innerHTML = `
        <div id="welcomeMessage" class="botMessage">
            ${translations[lang].welcome}
        </div>
        `;
        chatBox.scrollTop = chatBox.scrollHeight;
        toggleDrawer();
    }
}

// Download PDF
function downloadChatPDF() {
    toggleDrawer();
    const element = document.getElementById("chatBox");
    
    const options = {
        margin:       15,
        filename:     'Agriculture_Assistant_Chat.pdf',
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2, useCORS: true },
        jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    html2pdf().set(options).from(element).save();
}

window.addEventListener("DOMContentLoaded", loadChatHistory);

// ======================
// CHAT MAIN FUNCTION
// ======================
async function askAI(){
    const question=questionBox.value.trim();
    const language=languageSelect.value;

    if(question===""){
        alert(translations[language].alert);
        return;
    }

    chatBox.innerHTML+=`
    <div class="userMessage">
    👤 ${question}
    </div>
    `;

    saveChatToHistory();
    questionBox.value="";

    const loading=document.createElement("div");
    loading.className="loading";
    loading.innerHTML=translations[language].thinking;
    chatBox.appendChild(loading);
    chatBox.scrollTop=chatBox.scrollHeight;

    try{
        const response=await fetch(
            "http://127.0.0.1:8000/chat?prompt="+
            encodeURIComponent(question)+
            "&language="+
            encodeURIComponent(language)
        );

        const data=await response.json();
        loading.remove();
        let answer="";

        if(typeof data==="string"){
            answer=data;
        }
        else if(data.response){
            answer=data.response;
        }
        else if(data.message){
            answer=data.message;
        }
        else if(data.error){
            answer=data.error;
        }
        else{
            answer=JSON.stringify(data);
        }

        chatBox.innerHTML+=`
        <div class="botMessage">
        🤖 ${answer}
        </div>
        `;
        
        saveChatToHistory();

    } catch{
        loading.remove();
        chatBox.innerHTML+=`
        <div class="botMessage">
        ${translations[language].error}
        </div>
        `;
        
        saveChatToHistory();
    }

    chatBox.scrollTop=chatBox.scrollHeight;
}