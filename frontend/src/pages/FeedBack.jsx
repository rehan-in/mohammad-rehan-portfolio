import React, { useState, useEffect } from "react";
import { FaStar, FaUser, FaEnvelope, FaThumbsUp, FaThumbsDown } from 'react-icons/fa';

const FeedbackForm = ({ styles: parentStyles, theme, onFeedbackSubmit }) => {
  const [recommend, setRecommend] = useState("");
  const [sharedFeedback, setSharedFeedback] = useState("");
  const [suggestion, setSuggestion] = useState("");
  const [satisfaction, setSatisfaction] = useState(0);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [hoveredStar, setHoveredStar] = useState(0);

  const styles = {
    container: {
      width: '100%',
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '2rem',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
      color: 'white',
      fontFamily: "'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
    },
    form: {
      background: 'linear-gradient(145deg, #1e293b 0%, #334155 100%)',
      width: '100%',
      maxWidth: '700px',
      padding: '2.5rem',
      borderRadius: '20px',
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
      position: 'relative',
      overflow: 'hidden',
      border: '1px solid #334155'
    },
    formHeader: {
      textAlign: 'center',
      marginBottom: '2.5rem'
    },
    formTitle: {
      fontSize: '2.2rem',
      marginBottom: '0.5rem',
      background: 'linear-gradient(90deg, #facc15, #f59e0b)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      fontWeight: '800'
    },
    formSubtitle: {
      color: '#cbd5e1',
      fontSize: '1.1rem'
    },
    formSection: {
      marginBottom: '2rem',
      background: 'rgba(30, 41, 59, 0.7)',
      padding: '1.5rem',
      borderRadius: '12px',
      border: '1px solid #334155'
    },
    label: {
      display: 'block',
      fontWeight: '600',
      marginBottom: '1rem',
      fontSize: '1.1rem',
      color: '#e2e8f0'
    },
    radioGroup: {
      display: 'flex',
      gap: '2rem',
      marginTop: '0.5rem'
    },
    radioLabel: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.6rem',
      fontWeight: '500',
      marginBottom: '0',
      cursor: 'pointer',
      padding: '0.6rem 1.2rem',
      borderRadius: '8px',
      background: '#334155',
      transition: 'all 0.3s ease'
    },
    radioInput: {
      appearance: 'none',
      WebkitAppearance: 'none',
      width: '20px',
      height: '20px',
      border: '2px solid #64748b',
      borderRadius: '50%',
      outline: 'none',
      cursor: 'pointer',
      position: 'relative',
      transition: 'all 0.3s ease'
    },
    textarea: {
      width: '100%',
      minHeight: '120px',
      padding: '1rem',
      borderRadius: '10px',
      border: '2px solid #475569',
      backgroundColor: '#334155',
      color: 'white',
      resize: 'vertical',
      fontFamily: 'inherit',
      fontSize: '1rem',
      transition: 'all 0.3s ease'
    },
    stars: {
      display: 'flex',
      gap: '0.5rem',
      marginTop: '0.8rem'
    },
    star: {
      cursor: 'pointer',
      color: '#64748b',
      fontSize: '2.2rem',
      transition: 'all 0.2s ease'
    },
    inputGroup: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '1rem',
      marginTop: '0.8rem'
    },
    input: {
      padding: '0.9rem',
      borderRadius: '10px',
      border: '2px solid #475569',
      backgroundColor: '#334155',
      color: 'white',
      fontSize: '1rem',
      transition: 'all 0.3s ease'
    },
    button: {
      padding: '1rem 2.5rem',
      background: 'linear-gradient(90deg, #facc15, #f59e0b)',
      color: '#1e293b',
      fontWeight: '700',
      fontSize: '1.1rem',
      border: 'none',
      borderRadius: '10px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      boxShadow: '0 4px 10px rgba(250, 204, 21, 0.3)'
    },
    confirmation: {
      textAlign: 'center',
      marginTop: '1.5rem',
      fontWeight: '600',
      padding: '1rem',
      borderRadius: '10px',
      animation: 'fadeIn 0.5s ease'
    }
  };

  const saveFeedbackToLocalStorage = (formData) => {
    // Get existing feedback from localStorage
    const existingFeedback = JSON.parse(localStorage.getItem('portfolioFeedback') || '[]');
    
    // Create new feedback object
    const newFeedback = {
      id: Date.now(), // Simple ID based on timestamp
      name: `${formData.fullName}`,
      email: formData.email,
      rating: formData.satisfaction,
      message: formData.suggestion || 'No specific suggestions provided',
      timestamp: new Date().toISOString(),
      status: 'new',
      recommend: formData.recommend,
      sharedFeedback: formData.sharedFeedback
    };
    
    // Add new feedback to the beginning of the array
    const updatedFeedback = [newFeedback, ...existingFeedback];
    
    // Save back to localStorage
    localStorage.setItem('portfolioFeedback', JSON.stringify(updatedFeedback));
    
    return newFeedback;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      recommend,
      suggestion,
      satisfaction,
      sharedFeedback,
      fullName: `${firstName} ${lastName}`.trim(),
      email,
    };

    try {
      // Option 1: Save to backend API (if available)
      if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        const response = await fetch("http://localhost:5000/api/feedback", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          const result = await response.json();
          console.log('Backend submission successful:', result);
        }
      }
      
      // Option 2: Always save to localStorage (fallback)
      const newFeedback = saveFeedbackToLocalStorage(formData);
      
      // Notify parent component if callback provided
      if (onFeedbackSubmit) {
        onFeedbackSubmit(newFeedback);
      }
      
      setConfirmation("success:✅ Thank you! Your feedback was submitted successfully.");
      
      // Reset form
      setRecommend("");
      setSharedFeedback("");
      setSuggestion("");
      setSatisfaction(0);
      setFirstName("");
      setLastName("");
      setEmail("");
      
    } catch (err) {
      console.error("Error submitting:", err);
      // Even if backend fails, save to localStorage
      const newFeedback = saveFeedbackToLocalStorage(formData);
      if (onFeedbackSubmit) {
        onFeedbackSubmit(newFeedback);
      }
      setConfirmation("success:✅ Thank you! Your feedback was saved locally.");
    }
  };

  const getConfirmationClass = () => {
    if (confirmation.startsWith("success:")) return { ...styles.confirmation, background: 'rgba(74, 222, 128, 0.2)', color: '#4ade80', border: '1px solid #4ade80' };
    if (confirmation.startsWith("error:")) return { ...styles.confirmation, background: 'rgba(248, 113, 113, 0.2)', color: '#f87171', border: '1px solid #f87171' };
    return styles.confirmation;
  };

  const getConfirmationMessage = () => {
    if (confirmation.startsWith("success:")) return confirmation.substring(8);
    if (confirmation.startsWith("error:")) return confirmation.substring(6);
    return confirmation;
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '5px', background: 'linear-gradient(90deg, #facc15, #f59e0b, #ec4899)'}}></div>
        
        <div style={styles.formHeader}>
          <h1 style={styles.formTitle}>Portfolio Feedback Form</h1>
          <p style={styles.formSubtitle}>Your insights are valuable and help me improve.</p>
        </div>

        <div style={styles.formSection}>
          <label style={styles.label}>Would you recommend it to your friends and colleagues?</label>
          <div style={styles.radioGroup}>
            <label style={{...styles.radioLabel, ...(recommend === "yes" ? {background: '#475569'} : {})}}>
              <input 
                type="radio" 
                style={{...styles.radioInput, ...(recommend === "yes" ? {borderColor: '#facc15', background: '#facc15', boxShadow: '0 0 0 3px rgba(250, 204, 21, 0.3)'} : {})}} 
                checked={recommend === "yes"} 
                onChange={() => setRecommend("yes")} 
              /> 
              Yes
            </label>
            <label style={{...styles.radioLabel, ...(recommend === "no" ? {background: '#475569'} : {})}}>
              <input 
                type="radio" 
                style={{...styles.radioInput, ...(recommend === "no" ? {borderColor: '#facc15', background: '#facc15', boxShadow: '0 0 0 3px rgba(250, 204, 21, 0.3)'} : {})}} 
                checked={recommend === "no"} 
                onChange={() => setRecommend("no")} 
              /> 
              No
            </label>
          </div>
        </div>

        <div style={styles.formSection}>
          <label style={styles.label}>Do you have any suggestions to improve my Portfolio?</label>
          <textarea
            style={styles.textarea}
            value={suggestion}
            onChange={(e) => setSuggestion(e.target.value)}
            placeholder="Write your suggestions here..."
          />
        </div>

        <div style={styles.formSection}>
          <label style={styles.label}>How satisfied are you with my Portfolio?</label>
          <div style={styles.stars}>
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                style={{
                  ...styles.star,
                  ...(star <= satisfaction ? {color: '#facc15', textShadow: '0 0 10px rgba(250, 204, 21, 0.5)'} : {}),
                  ...(star <= hoveredStar ? {color: '#fef08a'} : {})
                }}
                onClick={() => setSatisfaction(star)}
                onMouseEnter={() => setHoveredStar(star)}
                onMouseLeave={() => setHoveredStar(0)}
              >
                ★
              </span>
            ))}
          </div>
        </div>

        <div style={styles.formSection}>
          <label style={styles.label}>Do you think this feedback is something others in your situation would share?</label>
          <div style={styles.radioGroup}>
            <label style={{...styles.radioLabel, ...(sharedFeedback === "yes" ? {background: '#475569'} : {})}}>
              <input 
                type="radio" 
                style={{...styles.radioInput, ...(sharedFeedback === "yes" ? {borderColor: '#facc15', background: '#facc15', boxShadow: '0 0 0 3px rgba(250, 204, 21, 0.3)'} : {})}} 
                checked={sharedFeedback === "yes"} 
                onChange={() => setSharedFeedback("yes")} 
              /> 
              Yes
            </label>
            <label style={{...styles.radioLabel, ...(sharedFeedback === "no" ? {background: '#475569'} : {})}}>
              <input 
                type="radio" 
                style={{...styles.radioInput, ...(sharedFeedback === "no" ? {borderColor: '#facc15', background: '#facc15', boxShadow: '0 0 0 3px rgba(250, 204, 21, 0.3)'} : {})}} 
                checked={sharedFeedback === "no"} 
                onChange={() => setSharedFeedback("no")} 
              /> 
              No
            </label>
          </div>
        </div>

        <div style={styles.formSection}>
          <label style={styles.label}>Please leave your email address if you'd like to be contacted:</label>
          <div style={styles.inputGroup}>
            <input
              type="text"
              placeholder="First Name"
              style={styles.input}
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Last Name"
              style={styles.input}
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <input
              type="email"
              placeholder="E-mail Address"
              style={styles.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        <div style={{textAlign: 'center', marginTop: '2.5rem'}}>
          <button type="submit" style={styles.button}>Submit Feedback</button>
        </div>

        {confirmation && (
          <p style={getConfirmationClass()}>{getConfirmationMessage()}</p>
        )}
      </form>
    </div>
  );
};

export default FeedbackForm;