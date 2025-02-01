import React from 'react';

const SummaryActions: React.FC = () => {
  const handleDownload = () => {
    // Logic for downloading the summary
  };

  const handleClear = () => {
    // Logic for clearing the summary
  };

  return (
    <div className="summary-actions">
      <button onClick={handleDownload}>Download Summary</button>
      <button onClick={handleClear}>Clear Summary</button>
    </div>
  );
};

export default SummaryActions;