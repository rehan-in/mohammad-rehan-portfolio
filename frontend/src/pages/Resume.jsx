import React, { useEffect, useState } from 'react';
import { FaDownload } from 'react-icons/fa';

const Resume = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    recordResumeView();
  }, []);

  const recordResumeView = () => {
    const stats = JSON.parse(localStorage.getItem('resumeStatistics') || '{}');
    
    if (!stats.views) stats.views = 0;
    if (!stats.viewHistory) stats.viewHistory = [];
    
    const lastView = sessionStorage.getItem('lastResumeView');
    const now = new Date().toISOString();
    
    if (!lastView || (new Date(now) - new Date(lastView)) > 30 * 60 * 1000) {
      stats.views += 1;
      stats.viewHistory.push({ timestamp: now });
      stats.lastViewed = now;
      
      localStorage.setItem('resumeStatistics', JSON.stringify(stats));
      sessionStorage.setItem('lastResumeView', now);
    }
  };

  const handleDownload = () => {
    const stats = JSON.parse(localStorage.getItem('resumeStatistics') || '{}');
    
    if (!stats.downloads) stats.downloads = 0;
    if (!stats.downloadHistory) stats.downloadHistory = [];
    
    stats.downloads += 1;
    stats.downloadHistory.push({ timestamp: new Date().toISOString() });
    
    localStorage.setItem('resumeStatistics', JSON.stringify(stats));
    
    const link = document.createElement('a');
    link.href = '/Student.pdf';
    link.download = 'Mohammad_Rehan_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="w-screen h-screen bg-white dark:bg-gray-900 overflow-hidden">
      {/* Loading Overlay */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white dark:bg-gray-900 z-50">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400">Loading resume...</p>
          </div>
        </div>
      )}

      {/* Download Button */}
      <div className="fixed top-4 right-4 z-40">
        <button
          onClick={handleDownload}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-lg transition-all duration-200 font-medium"
        >
          <FaDownload />
          Download PDF
        </button>
      </div>

      {/* Full Screen PDF - Absolute positioning to cover entire screen */}
      <div className="absolute top-0 left-0 w-full h-full">
        <iframe
          src="/Student.pdf#toolbar=0&navpanes=0&scrollbar=0"
          title="Mohammad Rehan Resume"
          width="100%"
          height="100%"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            border: 'none',
            margin: 0,
            padding: 0
          }}
          onLoad={() => {
            setIsLoading(false);
            setTimeout(recordResumeView, 1000);
          }}
          onError={() => setIsLoading(false)}
        />
      </div>
    </div>
  );
};

export default Resume;