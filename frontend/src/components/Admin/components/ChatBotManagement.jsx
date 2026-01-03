import React, { useState, useEffect } from 'react';
import { FaRobot, FaComments, FaUsers, FaChartLine, FaCog, FaTrash, FaDownload, FaHistory } from 'react-icons/fa';

const ChatBotManagement = ({ styles, theme }) => {
  const [chatData, setChatData] = useState({
    totalMessages: 0,
    conversations: [],
    settings: {
      enabled: true,
      welcomeMessage: "Hello! I'm your portfolio assistant. How can I help you today?",
      responseTime: 'immediate'
    }
  });

  useEffect(() => {
    loadChatData();
  }, []);

  const loadChatData = () => {
    const chatMessages = localStorage.getItem('chatMessages');
    const messages = chatMessages ? JSON.parse(chatMessages) : [];
    
    const conversations = groupMessagesIntoConversations(messages);
    
    setChatData({
      totalMessages: messages.length,
      conversations: conversations,
      settings: JSON.parse(localStorage.getItem('chatbotSettings') || '{}')
    });
  };

  const groupMessagesIntoConversations = (messages) => {
    const conversations = [];
    let currentConversation = [];
    
    messages.forEach((message, index) => {
      currentConversation.push(message);
      
      // Start new conversation after bot message or if next message is from user after long gap
      if (message.from === 'bot' || 
          (index < messages.length - 1 && 
           new Date(messages[index + 1].time) - new Date(message.time) > 300000)) { // 5 minutes
        if (currentConversation.length > 0) {
          conversations.push({
            id: conversations.length + 1,
            messages: [...currentConversation],
            startTime: currentConversation[0].time,
            endTime: currentConversation[currentConversation.length - 1].time,
            messageCount: currentConversation.length
          });
        }
        currentConversation = [];
      }
    });
    
    return conversations.reverse().slice(0, 10); // Last 10 conversations
  };

  const clearChatHistory = () => {
    if (window.confirm('Are you sure you want to clear all chat history? This cannot be undone.')) {
      localStorage.removeItem('chatMessages');
      loadChatData();
    }
  };

  const exportChatData = () => {
    const chatMessages = localStorage.getItem('chatMessages');
    const data = chatMessages ? JSON.parse(chatMessages) : [];
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `chatbot-history-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const updateSettings = (key, value) => {
    const newSettings = { ...chatData.settings, [key]: value };
    localStorage.setItem('chatbotSettings', JSON.stringify(newSettings));
    setChatData(prev => ({ ...prev, settings: newSettings }));
  };

  const getConversationStats = () => {
    const totalConversations = chatData.conversations.length;
    const avgMessagesPerConversation = totalConversations > 0 
      ? (chatData.totalMessages / totalConversations).toFixed(1)
      : 0;
    
    return { totalConversations, avgMessagesPerConversation };
  };

  const stats = getConversationStats();

  return (
    <div>
      <h1 style={styles.sectionTitle}>
        <FaRobot /> ChatBot Analytics
      </h1>

      {/* Statistics */}
      <div style={styles.grid}>
        <div style={{...styles.card, ...styles.statCard}}>
          <div style={{...styles.statIcon, backgroundColor: '#3b82f620', color: '#3b82f6'}}>
            <FaComments />
          </div>
          <div style={styles.statContent}>
            <div style={styles.statNumber}>{chatData.totalMessages}</div>
            <div style={styles.statLabel}>Total Messages</div>
          </div>
        </div>

        <div style={{...styles.card, ...styles.statCard}}>
          <div style={{...styles.statIcon, backgroundColor: '#10b98120', color: '#10b981'}}>
            <FaUsers />
          </div>
          <div style={styles.statContent}>
            <div style={styles.statNumber}>{stats.totalConversations}</div>
            <div style={styles.statLabel}>Conversations</div>
          </div>
        </div>

        <div style={{...styles.card, ...styles.statCard}}>
          <div style={{...styles.statIcon, backgroundColor: '#f59e0b20', color: '#f59e0b'}}>
            <FaChartLine />
          </div>
          <div style={styles.statContent}>
            <div style={styles.statNumber}>{stats.avgMessagesPerConversation}</div>
            <div style={styles.statLabel}>Avg Messages/Conv</div>
          </div>
        </div>

        <div style={{...styles.card, ...styles.statCard}}>
          <div style={{...styles.statIcon, backgroundColor: '#8b5cf620', color: '#8b5cf6'}}>
            <FaCog />
          </div>
          <div style={styles.statContent}>
            <div style={styles.statNumber}>
              {chatData.settings.enabled ? 'Active' : 'Paused'}
            </div>
            <div style={styles.statLabel}>Bot Status</div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div style={{ ...styles.card, marginBottom: '1.5rem' }}>
        <h3 style={{ marginBottom: '1rem', color: theme.text }}>Quick Actions</h3>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <button 
            style={{...styles.button, ...styles.buttonPrimary}}
            onClick={() => updateSettings('enabled', !chatData.settings.enabled)}
          >
            {chatData.settings.enabled ? 'Pause ChatBot' : 'Activate ChatBot'}
          </button>
          <button 
            style={{...styles.button, ...styles.buttonSuccess}}
            onClick={exportChatData}
          >
            <FaDownload /> Export Chat History
          </button>
          <button 
            style={{...styles.button, ...styles.buttonError}}
            onClick={clearChatHistory}
          >
            <FaTrash /> Clear All History
          </button>
        </div>
      </div>

      <div style={styles.grid}>
        {/* ChatBot Settings */}
        <div style={styles.card}>
          <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <FaCog /> ChatBot Settings
          </h3>
          
          <div style={styles.formGroup}>
            <label style={{...styles.label, display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer'}}>
              <input
                type="checkbox"
                checked={chatData.settings.enabled}
                onChange={(e) => updateSettings('enabled', e.target.checked)}
              />
              <span>Enable ChatBot</span>
            </label>
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Welcome Message</label>
            <textarea
              style={styles.textarea}
              value={chatData.settings.welcomeMessage || ''}
              onChange={(e) => updateSettings('welcomeMessage', e.target.value)}
              placeholder="Enter the welcome message for the chatbot..."
              rows="3"
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Response Time</label>
            <select
              style={styles.select}
              value={chatData.settings.responseTime || 'immediate'}
              onChange={(e) => updateSettings('responseTime', e.target.value)}
            >
              <option value="immediate">Immediate</option>
              <option value="fast">Fast (1-2 seconds)</option>
              <option value="moderate">Moderate (3-5 seconds)</option>
            </select>
          </div>

          <button 
            style={{...styles.button, ...styles.buttonSuccess}}
            onClick={() => alert('Settings saved!')}
          >
            Save Settings
          </button>
        </div>

        {/* Recent Conversations */}
        <div style={styles.card}>
          <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <FaHistory /> Recent Conversations
          </h3>
          
          <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
            {chatData.conversations.length === 0 ? (
              <div style={{ 
                textAlign: 'center', 
                padding: '2rem', 
                color: theme.textSecondary,
                fontStyle: 'italic'
              }}>
                No conversations yet. Chat history will appear here.
              </div>
            ) : (
              chatData.conversations.map(conversation => (
                <div 
                  key={conversation.id}
                  style={{
                    padding: '1rem',
                    marginBottom: '1rem',
                    backgroundColor: theme.surfaceLight,
                    borderRadius: '8px',
                    border: `1px solid ${theme.border}`
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <div style={{ fontWeight: '600', color: theme.text }}>
                      Conversation #{conversation.id}
                    </div>
                    <div style={{ fontSize: '0.8rem', color: theme.textSecondary }}>
                      {conversation.messageCount} messages
                    </div>
                  </div>
                  
                  <div style={{ fontSize: '0.9rem', color: theme.textSecondary, marginBottom: '0.5rem' }}>
                    {new Date(conversation.startTime).toLocaleString()}
                  </div>
                  
                  <div style={{ 
                    fontSize: '0.85rem', 
                    color: theme.text,
                    lineHeight: '1.4',
                    maxHeight: '60px',
                    overflow: 'hidden'
                  }}>
                    {conversation.messages.slice(0, 2).map((msg, idx) => (
                      <div key={idx} style={{ marginBottom: '0.25rem' }}>
                        <strong>{msg.from === 'user' ? 'User' : 'Bot'}:</strong> {msg.text.substring(0, 50)}...
                      </div>
                    ))}
                    {conversation.messageCount > 2 && (
                      <div style={{ color: theme.textSecondary, fontStyle: 'italic' }}>
                        ... and {conversation.messageCount - 2} more messages
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Usage Analytics */}
      <div style={styles.card}>
        <h3 style={{ marginBottom: '1rem', color: theme.text }}>Usage Analytics</h3>
        <div style={styles.grid}>
          <div style={{
            padding: '1rem',
            backgroundColor: theme.surfaceLight,
            borderRadius: '8px',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: theme.accent }}>
              {chatData.totalMessages}
            </div>
            <div style={{ color: theme.textSecondary, fontSize: '0.9rem' }}>
              Total Messages
            </div>
          </div>
          
          <div style={{
            padding: '1rem',
            backgroundColor: theme.surfaceLight,
            borderRadius: '8px',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: theme.success }}>
              {stats.totalConversations}
            </div>
            <div style={{ color: theme.textSecondary, fontSize: '0.9rem' }}>
              Total Conversations
            </div>
          </div>
          
          <div style={{
            padding: '1rem',
            backgroundColor: theme.surfaceLight,
            borderRadius: '8px',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: theme.warning }}>
              {stats.avgMessagesPerConversation}
            </div>
            <div style={{ color: theme.textSecondary, fontSize: '0.9rem' }}>
              Avg. Messages/Conv
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBotManagement;