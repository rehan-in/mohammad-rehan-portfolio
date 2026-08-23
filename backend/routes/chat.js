const express = require('express');
const router = express.Router();

// Dynamic Intelligent Knowledge Base for Mohammad Rehan's Portfolio
const dynamicKnowledge = [
  {
    category: 'identity',
    keywords: ['who are you', 'what is your name', 'bot', 'assistant', 'who built you', 'name'],
    response: () => "I'm Mohammad Rehan's Portfolio AI Assistant 🤖! I'm here to answer questions about Rehan's full stack development skills, VLSI engineering background, projects, education, and contact details."
  },
  {
    category: 'bio',
    keywords: ['who is mohammad rehan', 'about', 'bio', 'background', 'profile', 'tell me about', 'summary', 'rehan'],
    response: () => "Mohammad Rehan is a Full Stack Web Developer (MERN Stack: React, Node.js, Express, MongoDB) and VLSI Engineer. He creates high-performance web applications, scalable backend APIs, and hardware logic designs in Verilog HDL."
  },
  {
    category: 'skills',
    keywords: ['skill', 'stack', 'technology', 'technologies', 'programming', 'language', 'react', 'node', 'express', 'mongo', 'cpp', 'c++', 'python', 'verilog', 'vlsi', 'html', 'css', 'javascript', 'git'],
    response: () => "Mohammad Rehan's technical stack includes:\n• Frontend: React.js, JavaScript (ES6+), HTML5, CSS3, Tailwind CSS\n• Backend: Node.js, Express.js, RESTful APIs\n• Database: MongoDB, Mongoose\n• Hardware/VLSI: Digital System Design, Verilog HDL, Vivado, FSM\n• Languages: JavaScript, Python, C++, Verilog\n• DevOps & Tools: Git, GitHub, Postman, VS Code"
  },
  {
    category: 'projects',
    keywords: ['project', 'work', 'build', 'built', 'github', 'portfolio', 'application', 'app', 'code', 'repo'],
    response: () => "Mohammad Rehan has built impressive software and hardware projects:\n1. Interactive Portfolio & Admin Portal (React, Node, Express, MongoDB)\n2. Binary to 7-Segment Decoder & FSM Architectures (Verilog HDL)\n3. Full-Stack Web Applications & REST Microservices\nCheck out all open-source projects on GitHub: https://github.com/Mohammad-Rehan0403"
  },
  {
    category: 'contact',
    keywords: ['contact', 'email', 'phone', 'call', 'reach', 'message', 'connect', 'linkedin', 'github', 'leetcode', 'hire'],
    response: () => "You can easily contact Mohammad Rehan:\n📧 Email: mohdrehanansari95@gmail.com\n📱 Phone: +91 70523 28932\n💼 LinkedIn: https://www.linkedin.com/in/mohammad-rehan-7b13262ba\n💻 GitHub: https://github.com/Mohammad-Rehan0403\n💡 LeetCode: https://leetcode.com"
  },
  {
    category: 'resume',
    keywords: ['resume', 'cv', 'download', 'experience', 'qualification', 'education', 'degree', 'college', 'btech'],
    response: () => "Mohammad Rehan is pursuing B.Tech in Electronics & Computer Science. You can view his interactive resume and download the official PDF directly from the Resume section of this site!"
  },
  {
    category: 'greetings',
    keywords: ['hello', 'hi', 'hey', 'greetings', 'morning', 'afternoon', 'evening', 'howdy', 'sup'],
    response: () => "Hello there! 👋 How can I help you today? Feel free to ask about Mohammad Rehan's skills, projects, background, or contact info!"
  },
  {
    category: 'polite',
    keywords: ['thank', 'thanks', 'awesome', 'cool', 'great', 'good', 'nice', 'perfect'],
    response: () => "You're very welcome! 😊 Let me know if you have any other questions about Rehan's work or experience."
  }
];

function generateDynamicReply(message) {
  const query = (message || '').toLowerCase().trim();
  if (!query) return "Please enter a question or topic, and I'll be glad to help!";

  let bestMatch = null;
  let maxScore = 0;

  for (const item of dynamicKnowledge) {
    let score = 0;
    for (const kw of item.keywords) {
      if (query === kw) {
        score += 10;
      } else if (query.includes(kw)) {
        score += 3 + kw.length;
      }
    }
    if (score > maxScore) {
      maxScore = score;
      bestMatch = item;
    }
  }

  if (bestMatch && maxScore > 0) {
    return bestMatch.response();
  }

  return `I understand you are asking about "${message}". I specialize in providing information regarding Mohammad Rehan's Full Stack Web Development skills, VLSI projects, resume, and contact information. Feel free to ask "What projects has Rehan built?" or "How can I contact Rehan?"!`;
}

// POST /api/chat
router.post('/', async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ reply: "Message content is required.", status: "error" });
    }

    // Optional external AI call if GEMINI_API_KEY is defined
    if (process.env.GEMINI_API_KEY) {
      try {
        const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
        const aiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`;
        
        const systemPrompt = "You are an AI assistant for Mohammad Rehan's portfolio website. Rehan is a Full Stack Developer (React, Node, Express, MongoDB) and VLSI Engineer. Answer succinctly, politely, and helpfully.";
        
        const response = await fetch(aiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{
              parts: [{ text: `${systemPrompt}\n\nUser Question: ${message}` }]
            }]
          })
        });

        if (response.ok) {
          const data = await response.json();
          const aiReply = data?.candidates?.[0]?.content?.parts?.[0]?.text;
          if (aiReply) {
            return res.json({ reply: aiReply, status: 'success', source: 'gemini-api' });
          }
        }
      } catch (geminiErr) {
        console.warn('Gemini API failed, falling back to dynamic scoring engine:', geminiErr.message);
      }
    }

    const reply = generateDynamicReply(message);
    res.json({ reply, status: 'success', source: 'dynamic-engine' });

  } catch (error) {
    console.error('Chat endpoint error:', error);
    res.status(500).json({ reply: "Sorry, I encountered an error processing your request.", status: "error" });
  }
});

module.exports = router;
