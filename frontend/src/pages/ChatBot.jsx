import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Picker from 'emoji-picker-react';
import { useSpeechRecognition } from 'react-speech-recognition';

const ChatBot = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem('chatMessages');
    return saved ? JSON.parse(saved) : [];
  });
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [voiceGender, setVoiceGender] = useState('female');
  const [language, setLanguage] = useState('en-IN');
  const [isLoading, setIsLoading] = useState(false);

  const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } =
    useSpeechRecognition();

  // Enhanced AI responses database
  const aiKnowledgeBase = {
    // Personal Information
    personal: {
      'who are you': "I'm your AI assistant! I'm here to help you with information about Mohammad Rehan and answer your questions.",
      'what is your name': "I'm an AI assistant created to help you learn more about Mohammad Rehan's portfolio and skills.",
      'tell me about yourself': "I'm an intelligent chatbot designed to provide information about Mohammad Rehan's professional background, skills, and projects.",
    },

    // About Mohammad Rehan
    about: {
      'who is mohammad rehan': "Mohammad Rehan is a passionate developer and engineer with expertise in full-stack development, VLSI design, and modern web technologies.",
      'what does mohammad rehan do': "He's a skilled developer specializing in React.js, Node.js, Python, and VLSI design. He creates innovative web applications and hardware solutions.",
      'tell me about mohammad rehan': "Mohammad Rehan is a tech enthusiast with strong skills in web development, machine learning, and electronics. He's currently pursuing his education while working on various projects.",
      'background': "He has a strong foundation in computer science and electronics, with experience in both software development and hardware design.",
    },

    // Skills
    skills: {
      'what are his skills': "Mohammad Rehan is skilled in:\n• Frontend: React.js, JavaScript, HTML, CSS\n• Backend: Node.js, Express, Python\n• Databases: MongoDB, MySQL\n• VLSI & Hardware: Digital Design, Verilog\n• Tools: Git, Docker, Linux",
      'technical skills': "His technical expertise includes:\n🛠 Web Development: MERN Stack\n💻 Programming: JavaScript, Python, C++\n🔧 Tools: Git, VS Code, Postman\n📊 Databases: MongoDB, MySQL",
      'programming languages': "He works with JavaScript, Python, C++, Java, and Verilog for hardware design.",
      'frameworks': "He uses React.js, Node.js, Express.js, and various CSS frameworks.",
    },

    // Projects
    projects: {
      'what projects has he done': "He has worked on several projects including:\n• Portfolio Website (React.js)\n• VLSI Design Projects\n• Machine Learning Models\n• Web Applications\n• Hardware implementations",
      'tell me about his projects': "His projects showcase full-stack development skills, from responsive frontends to robust backends, along with hardware design capabilities.",
      'github projects': "You can check his GitHub profile for detailed project repositories and source code.",
    },

    // Contact
    contact: {
      'how to contact': "You can reach Mohammad Rehan through:\n📧 Email: mohdrehanansari95@gmail.com\n📱 Phone: +91 70523 28932\n💼 LinkedIn: Check his portfolio",
      'email': "His email is mohdrehanansari95@gmail.com",
      'phone': "You can contact him at +91 70523 28932",
      'linkedin': "Connect with him on LinkedIn for professional inquiries.",
    },

    // Education
    education: {
      'education background': "Mohammad Rehan is pursuing his education in technology with focus on computer science and electronics engineering.",
      'qualifications': "He has strong academic background in technology and continues to learn new skills through projects and self-study.",
    },

    // General Help
    help: {
      'help': "I can help you with information about:\n• Mohammad Rehan's background\n• Technical skills and expertise\n• Projects and portfolio\n• Contact information\n• Education and qualifications\n\nJust ask me anything!",
      'what can you do': "I can provide information about Mohammad Rehan's professional profile, answer questions about his skills and projects, and help you understand his technical capabilities.",
      'options': "Ask me about:\n• Skills and technologies\n• Projects and experience\n• Contact information\n• Education background\n• Technical expertise",
    },

    // Greetings
    greetings: {
      'hello': "Hello! 👋 How can I help you today?",
      'hi': "Hi there! 😊 What would you like to know about Mohammad Rehan?",
      'hey': "Hey! 👋 Ready to explore Mohammad Rehan's portfolio?",
      'good morning': "Good morning! 🌞 How can I assist you today?",
      'good afternoon': "Good afternoon! ☀️ What would you like to know?",
      'good evening': "Good evening! 🌙 How can I help you?",
    },

    // Polite responses
    polite: {
      'thank you': "You're welcome! 😊 Is there anything else you'd like to know?",
      'thanks': "You're welcome! Feel free to ask more questions.",
      'ok': "Great! Let me know if you need more information.",
      'okay': "Alright! I'm here if you have more questions.",
    }
  };

  // Save chat to localStorage
  useEffect(() => {
    localStorage.setItem('chatMessages', JSON.stringify(messages));
  }, [messages]);

  // Update input with speech recognition
  useEffect(() => {
    if (transcript) {
      setInput(transcript);
    }
  }, [transcript]);

  const findBestResponse = (userInput) => {
    const input = userInput.toLowerCase().trim();
    
    // Check for exact matches first
    for (const category in aiKnowledgeBase) {
      for (const question in aiKnowledgeBase[category]) {
        if (input === question) {
          return aiKnowledgeBase[category][question];
        }
      }
    }

    // Check for partial matches
    for (const category in aiKnowledgeBase) {
      for (const question in aiKnowledgeBase[category]) {
        if (input.includes(question) || question.includes(input)) {
          return aiKnowledgeBase[category][question];
        }
      }
    }

    // Keyword-based matching
    const keywords = {
      // Personal
      'who': aiKnowledgeBase.personal['who are you'],
      'name': aiKnowledgeBase.personal['what is your name'],
      'yourself': aiKnowledgeBase.personal['tell me about yourself'],

      // About
      'mohammad': aiKnowledgeBase.about['who is mohammad rehan'],
      'rehan': aiKnowledgeBase.about['who is mohammad rehan'],
      'about': aiKnowledgeBase.about['tell me about mohammad rehan'],
      'background': aiKnowledgeBase.about['background'],

      // Skills
      'skill': aiKnowledgeBase.skills['what are his skills'],
      'technology': aiKnowledgeBase.skills['technical skills'],
      'programming': aiKnowledgeBase.skills['programming languages'],
      'framework': aiKnowledgeBase.skills['frameworks'],
      'javascript': aiKnowledgeBase.skills['programming languages'],
      'python': aiKnowledgeBase.skills['programming languages'],
      'react': aiKnowledgeBase.skills['frameworks'],
      'node': aiKnowledgeBase.skills['frameworks'],

      // Projects
      'project': aiKnowledgeBase.projects['what projects has he done'],
      'github': aiKnowledgeBase.projects['github projects'],
      'work': aiKnowledgeBase.projects['tell me about his projects'],

      // Contact
      'contact': aiKnowledgeBase.contact['how to contact'],
      'email': aiKnowledgeBase.contact['email'],
      'phone': aiKnowledgeBase.contact['phone'],
      'linkedin': aiKnowledgeBase.contact['linkedin'],
      'reach': aiKnowledgeBase.contact['how to contact'],

      // Education
      'education': aiKnowledgeBase.education['education background'],
      'qualification': aiKnowledgeBase.education['qualifications'],
      'study': aiKnowledgeBase.education['education background'],

      // Help
      'help': aiKnowledgeBase.help['help'],
      'what can you': aiKnowledgeBase.help['what can you do'],
      'option': aiKnowledgeBase.help['options'],

      // Greetings
      'hello': aiKnowledgeBase.greetings['hello'],
      'hi': aiKnowledgeBase.greetings['hi'],
      'hey': aiKnowledgeBase.greetings['hey'],
      'morning': aiKnowledgeBase.greetings['good morning'],
      'afternoon': aiKnowledgeBase.greetings['good afternoon'],
      'evening': aiKnowledgeBase.greetings['good evening'],

      // Polite
      'thank': aiKnowledgeBase.polite['thank you'],
      'thanks': aiKnowledgeBase.polite['thanks'],
    };

    for (const keyword in keywords) {
      if (input.includes(keyword)) {
        return keywords[keyword];
      }
    }

    // Default response for unknown queries
    return "I'm not sure about that. I'm designed to answer questions about Mohammad Rehan's skills, projects, and professional background. Try asking about his technical skills, projects, or contact information!";
  };

  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language;

    const voices = window.speechSynthesis.getVoices();
    const filtered = voices.filter((v) =>
      voiceGender === 'male' ? v.name.includes('Male') : v.name.includes('Female')
    );
    if (filtered.length > 0) utterance.voice = filtered[0];

    window.speechSynthesis.speak(utterance);
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = {
      from: 'user',
      text: input,
      time: new Date().toLocaleTimeString(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    try {
      // First try the AI knowledge base
      let botResponse = findBestResponse(input);
      
      // If using external API (optional - uncomment if you have backend)
      /*
      const res = await axios.post('http://localhost:5000/api/chat', { message: input });
      botResponse = res.data.reply;
      */
      
      const botMsg = {
        from: 'bot',
        text: botResponse,
        time: new Date().toLocaleTimeString(),
      };
      
      setTimeout(() => {
        setMessages((prev) => [...prev, botMsg]);
        setIsLoading(false);
        speak(botResponse);
      }, 1000);

    } catch {
      const errorMsg = {
        from: 'bot',
        text: 'Sorry, there was an error processing your request.',
        time: new Date().toLocaleTimeString(),
      };
      setMessages((prev) => [...prev, errorMsg]);
      setIsLoading(false);
    }

    setInput('');
    setShowEmojiPicker(false);
  };

  const handleEmojiClick = (e, emojiObject) => {
    setInput((prev) => prev + emojiObject.emoji);
  };

  const downloadChat = () => {
    const content = messages
      .map((msg) => `${msg.time} - ${msg.from === 'user' ? 'You' : 'Bot'}: ${msg.text}`)
      .join('\n');
    const blob = new Blob([content], { type: 'text/plain' });
    const anchor = document.createElement('a');
    anchor.href = URL.createObjectURL(blob);
    anchor.download = 'chat-history.txt';
    anchor.click();
  };

  const clearChat = () => {
    setMessages([]);
    localStorage.removeItem('chatMessages');
  };

  const quickQuestions = [
    "What are his skills?",
    "Tell me about his projects",
    "How to contact?",
    "Education background",
    "Technical expertise"
  ];

  // CSS styles
  const styles = {
    container: {
      minHeight: '100vh',
      padding: '24px',
      fontFamily: "'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      transition: 'background-color 0.3s, color 0.3s',
      backgroundColor: darkMode ? '#0a192f' : '#f3f4f6',
      color: darkMode ? 'white' : 'black',
      boxSizing: 'border-box'
    },
    innerContainer: {
      maxWidth: '800px',
      margin: '0 auto'
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '20px'
    },
    title: {
      fontSize: '32px',
      fontWeight: '700',
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      background: 'linear-gradient(45deg, #4ade80, #3b82f6)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text'
    },
    themeToggle: {
      padding: '8px 16px',
      backgroundColor: darkMode ? '#374151' : '#fcd34d',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      fontWeight: '600',
      transition: 'background-color 0.3s',
      color: darkMode ? 'white' : 'black'
    },
    statsBar: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      fontSize: '14px',
      marginBottom: '16px',
      padding: '8px 0',
      borderBottom: darkMode ? '1px solid #374151' : '1px solid #e5e7eb'
    },
    buttonGroup: {
      display: 'flex',
      gap: '8px'
    },
    button: {
      padding: '6px 12px',
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer',
      fontWeight: '600',
      transition: 'background-color 0.3s'
    },
    clearButton: {
      backgroundColor: '#ef4444',
      color: 'white'
    },
    downloadButton: {
      backgroundColor: '#3b82f6',
      color: 'white'
    },
    chatContainer: {
      backgroundColor: darkMode ? '#1f2937' : 'white',
      padding: '20px',
      borderRadius: '12px',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
      height: '400px',
      overflowY: 'auto',
      marginBottom: '20px',
      display: 'flex',
      flexDirection: 'column',
      gap: '12px'
    },
    message: {
      padding: '12px 16px',
      borderRadius: '12px',
      maxWidth: '80%',
      wordBreak: 'break-word',
      whiteSpace: 'pre-line'
    },
    userMessage: {
      backgroundColor: darkMode ? '#075985' : '#bae6fd',
      alignSelf: 'flex-end'
    },
    botMessage: {
      backgroundColor: darkMode ? '#374151' : '#e5e7eb',
      alignSelf: 'flex-start'
    },
    timeStamp: {
      fontSize: '11px',
      opacity: '0.7',
      marginBottom: '4px'
    },
    loading: {
      padding: '12px 16px',
      backgroundColor: darkMode ? '#374151' : '#e5e7eb',
      borderRadius: '12px',
      alignSelf: 'flex-start',
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    },
    quickQuestions: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '8px',
      marginBottom: '16px'
    },
    quickQuestion: {
      padding: '8px 12px',
      backgroundColor: darkMode ? '#374151' : '#e5e7eb',
      border: 'none',
      borderRadius: '20px',
      cursor: 'pointer',
      fontSize: '12px',
      transition: 'background-color 0.3s',
      color: darkMode ? 'white' : 'black'
    },
    inputContainer: {
      display: 'flex',
      gap: '12px',
      marginBottom: '16px'
    },
    emojiButton: {
      fontSize: '20px',
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      padding: '8px',
      borderRadius: '50%',
      backgroundColor: darkMode ? '#374151' : '#e5e7eb',
      width: '40px',
      height: '40px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    voiceButton: {
      padding: '8px 16px',
      backgroundColor: listening ? '#ef4444' : '#10b981',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      fontWeight: '600',
      display: 'flex',
      alignItems: 'center',
      gap: '6px'
    },
    selectContainer: {
      display: 'flex',
      gap: '12px',
      marginBottom: '16px'
    },
    select: {
      padding: '8px 12px',
      borderRadius: '8px',
      border: '1px solid',
      borderColor: darkMode ? '#4b5563' : '#d1d5db',
      backgroundColor: darkMode ? '#1f2937' : 'white',
      color: darkMode ? 'white' : 'black',
      flex: '1'
    },
    inputGroup: {
      display: 'flex',
      gap: '12px'
    },
    input: {
      flex: '1',
      padding: '12px 16px',
      borderRadius: '8px',
      border: '1px solid',
      borderColor: darkMode ? '#4b5563' : '#d1d5db',
      backgroundColor: darkMode ? '#1f2937' : 'white',
      color: darkMode ? 'white' : 'black',
      fontSize: '16px'
    },
    sendButton: {
      padding: '12px 24px',
      backgroundColor: '#0ea5e9',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      fontWeight: '600',
      fontSize: '16px',
      transition: 'background-color 0.3s',
      opacity: isLoading ? 0.6 : 1
    },
    emojiPicker: {
      position: 'absolute',
      bottom: '70px',
      zIndex: '10'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.innerContainer}>
        <div style={styles.header}>
          <h1 style={styles.title}>
            <span>AI Assistant</span>
            <span>🤖</span>
          </h1>
          <button
            onClick={() => setDarkMode((prev) => !prev)}
            style={styles.themeToggle}
          >
            {darkMode ? '🌞 Light' : '🌙 Dark'}
          </button>
        </div>

        <div style={styles.statsBar}>
          <span>Total Messages: {messages.length}</span>
          <div style={styles.buttonGroup}>
            <button 
              onClick={clearChat} 
              style={{...styles.button, ...styles.clearButton}}
            >
              Clear
            </button>
            <button 
              onClick={downloadChat} 
              style={{...styles.button, ...styles.downloadButton}}
            >
              Download
            </button>
          </div>
        </div>

        {/* Quick Questions */}
        <div style={styles.quickQuestions}>
          {quickQuestions.map((question, index) => (
            <button
              key={index}
              onClick={() => setInput(question)}
              style={styles.quickQuestion}
              onMouseEnter={(e) => e.target.style.backgroundColor = darkMode ? '#4b5563' : '#d1d5db'}
              onMouseLeave={(e) => e.target.style.backgroundColor = darkMode ? '#374151' : '#e5e7eb'}
            >
              {question}
            </button>
          ))}
        </div>

        <div style={styles.chatContainer}>
          {messages.map((msg, i) => (
            <div
              key={i}
              style={{
                ...styles.message,
                ...(msg.from === 'user' ? styles.userMessage : styles.botMessage)
              }}
            >
              <div style={styles.timeStamp}>{msg.time}</div>
              <div>{msg.text}</div>
            </div>
          ))}
          {isLoading && (
            <div style={styles.loading}>
              <div>🤔</div>
              <div>Thinking...</div>
            </div>
          )}
        </div>

        <div style={styles.inputContainer}>
          <button
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            style={styles.emojiButton}
            title="Emoji"
          >
            😊
          </button>
          {showEmojiPicker && (
            <div style={styles.emojiPicker}>
              <Picker onEmojiClick={handleEmojiClick} />
            </div>
          )}
          <button
            onClick={() => {
              if (!listening) {
                resetTranscript();
              }
            }}
            disabled={!browserSupportsSpeechRecognition}
            style={styles.voiceButton}
          >
            🎙 {listening ? 'Listening...' : 'Voice Input'}
          </button>
        </div>

        <div style={styles.selectContainer}>
          <select
            value={voiceGender}
            onChange={(e) => setVoiceGender(e.target.value)}
            style={styles.select}
          >
            <option value="female">Female Voice</option>
            <option value="male">Male Voice</option>
          </select>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            style={styles.select}
          >
            <option value="en-IN">English (India)</option>
            <option value="en-US">English (US)</option>
            <option value="hi-IN">Hindi</option>
            <option value="ta-IN">Tamil</option>
          </select>
        </div>

        <div style={styles.inputGroup}>
          <input
            style={styles.input}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && !isLoading && handleSend()}
            placeholder="Ask me about Mohammad Rehan's skills, projects, or background..."
            disabled={isLoading}
          />
          <button
            onClick={handleSend}
            style={styles.sendButton}
            disabled={isLoading}
          >
            {isLoading ? '...' : 'Send'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;