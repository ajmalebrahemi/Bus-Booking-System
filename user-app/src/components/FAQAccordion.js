import React from 'react';

const FAQAccordion = ({ faqs, editFAQ, deleteFAQ }) => {
  return (
    <div className="accordion" id="faqAccordion">
      {faqs.map((faq, index) => (
        <div className="accordion-item" key={faq._id}>
          <h2 className="accordion-header" id={`heading${index}`}>
            <button
              className="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target={`#collapse${index}`}
              aria-expanded="true"
              aria-controls={`collapse${index}`}
            >
              {faq.question}
            </button>
          </h2>
          <div
            id={`collapse${index}`}
            className="accordion-collapse collapse"
            aria-labelledby={`heading${index}`}
            data-bs-parent="#faqAccordion"
          >
            <div className="accordion-body">
              <p>{faq.answer}</p>
              <button className="btn btn-primary me-2" onClick={() => editFAQ(faq)}>
                Edit
              </button>
              <button className="btn btn-danger" onClick={() => deleteFAQ(faq._id)}>
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FAQAccordion;
