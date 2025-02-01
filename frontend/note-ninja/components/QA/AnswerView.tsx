import React from 'react';

const AnswerView: React.FC<{ answer: string }> = ({ answer }) => {
  return (
    <div className="answer-view">
      <h2>Answer</h2>
      <p>{answer}</p>
    </div>
  );
};

export default AnswerView;