import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './FAQ.css'; 
import Footer from './Footer'; 
import NavBar from './NavBar';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqData = [
    {
      question: "How do I create an account?",
      answer: "Click on the 'Sign Up' button in the top navigation and fill out the registration form with your details."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept M-Pesa, credit/debit cards (Visa, Mastercard), and PayPal for all transactions."
    },
    {
      question: "What is your return policy?",
      answer: "You can return products within 14 days of purchase. Items must be in original condition with all tags attached."
    },
    {
      question: "How long does delivery take?",
      answer: "Standard delivery takes 2-3 business days within Nairobi and 3-5 business days for other regions in Kenya."
    },
    {
      question: "How can I track my order?",
      answer: "Once your order ships, you'll receive a tracking number via email that you can use to monitor your package."
    }
  ];

  return (
    <div className="container my-5">
      <NavBar />
      <h2 className="text-center mb-4">Frequently Asked Questions</h2>
      <div className="accordion" id="faqAccordion">
        {faqData.map((faq, index) => (
          <div className="accordion-item" key={index}>
            <h3 className="accordion-header">
              <button
                className={`accordion-button ${activeIndex === index ? '' : 'collapsed'}`}
                type="button"
                onClick={() => toggleFAQ(index)}
                aria-expanded={activeIndex === index}
              >
                {faq.question}
              </button>
            </h3>
            <div
              className={`accordion-collapse collapse ${activeIndex === index ? 'show' : ''}`}
            >
              <div className="accordion-body">
                {faq.answer}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <Footer />
    </div>
  );
};

export default FAQ;