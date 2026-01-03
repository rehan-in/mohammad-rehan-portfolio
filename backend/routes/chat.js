const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
  const { message } = req.body;

  // Example dummy response logic
  let reply = "I'm not sure I understand.";

  if (message.toLowerCase().includes('hello')) {
    reply = 'Hello there! 👋';
  }
  else if (message.toLowerCase().includes('hi')) {
    reply = 'Hi! How can I help you today?';
  } else if (message.toLowerCase().includes('how are you')) {
    reply = "I'm just a bot, but thanks for asking! How can I assist you today?";
  } else if (message.toLowerCase().includes('what is your name')) {
    reply = "I'm your portfolio assistant 🤖";
  }
  else if (message.toLowerCase().includes('what do you do')) { 
    reply = "I can help you with information about my portfolio, projects, skills, and more. Just ask!";
  }
  else if (message.toLowerCase().includes('who is mohammad rehan')) {
    reply = "Mohammad Rehan is a Full Stack Developer with expertise in Node.js, React, and MongoDB. He has a passion for building scalable web applications and loves to learn new technologies.";
  } else if (message.toLowerCase().includes('help')) {
    reply = "Sure! How can I assist you today?";
  }
  else if (message.toLowerCase().includes('projects')) {
    reply = "You can check my projects on my GitHub profile";
  }
  else if (message.toLowerCase().includes('contact')) {
    reply = "You can contact me via email at";
  } else if (message.toLowerCase().includes('skills')) {
    reply = "I have skills in JavaScript, Node.js, React, MongoDB, Express.js, and more.";
  }
  else if (message.toLowerCase().includes('portfolio')) {
    reply = "You can view my portfolio at https://mohammad-rehan-portfolio.vercel.app/";
  } else if (message.toLowerCase().includes('resume')) {
    reply = "You can download my resume from https://drive.google.com/file/d/1b2c3d4e5f6g7h8i9j0k/view?usp=sharing";
  }
  else if (message.toLowerCase().includes('github')) {
    reply = "You can find my GitHub profile at";
  }
  else if (message.toLowerCase().includes('linkedin')) {
    reply = "You can find my LinkedIn profile at";
  } else if (message.toLowerCase().includes('twitter')) {
    reply = "You can find my Twitter profile at";
  } else if (message.toLowerCase().includes('instagram')) {
    reply = "You can find my Instagram profile at";
  } else if (message.toLowerCase().includes('facebook')) {
    reply = "You can find my Facebook profile at";
  } else if (message.toLowerCase().includes('youtube')) {
    reply = "You can find my YouTube channel at";
  }
  else if (message.toLowerCase().includes('blog')) {
    reply = "You can find my blog at";
  } else if (message.toLowerCase().includes('about')) {
    reply = "I am a Full Stack Developer with a passion for building web applications. I love to learn new technologies and improve my skills.";
  } else if (message.toLowerCase().includes('thank you') || message.toLowerCase().includes('thanks')) {
    reply = "You're welcome! If you have any more questions, feel free to ask.";
  }
  res.json({ reply });
});

module.exports = router;
