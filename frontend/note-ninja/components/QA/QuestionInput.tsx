import React, { useState } from 'react';

const QuestionInput: React.FC = () => {
  const [question, setQuestion] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuestion(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Handle question submission logic here
    console.log('Submitted question:', question);
    setQuestion('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={question}
        onChange={handleInputChange}
        placeholder="Type your question here..."
        required
      />
      <button type="submit">Ask</button>
    </form>
  );
};

export default QuestionInput;