import React, { useState, useEffect } from 'react';

const FAQForm = ({ onFAQAdded, faqToEdit, clearEdit }) => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  useEffect(() => {
    if (faqToEdit) {
      setQuestion(faqToEdit.question);
      setAnswer(faqToEdit.answer);
    } else {
      setQuestion('');
      setAnswer('');
    }
  }, [faqToEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = faqToEdit ? 'PUT' : 'POST';
    const url = faqToEdit ? `http://localhost:3000/faq/${faqToEdit._id}` : 'http://localhost:3000/add-faq';

    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ question, answer })
      });

      if (response.ok) {
        onFAQAdded();
        clearEdit();
        setQuestion('');
        setAnswer('');
      } else {
        console.error('Error submitting FAQ');
      }
    } catch (error) {
      console.error('Error submitting FAQ:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="form-group">
        <label>Question</label>
        <input
          type="text"
          className="form-control"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>Answer</label>
        <textarea
          className="form-control"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary mt-2">
        {faqToEdit ? 'Update FAQ' : 'Add FAQ'}
      </button>
      {faqToEdit && (
        <button type="button" className="btn btn-secondary mt-2 ms-2" onClick={clearEdit}>
          Cancel
        </button>
      )}
    </form>
  );
};

export default FAQForm;
