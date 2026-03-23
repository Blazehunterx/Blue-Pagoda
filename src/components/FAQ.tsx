"use client";

import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import styles from './FAQ.module.css';

const FAQS = [
  {
    question: "What is the guest policy?",
    answer: "Residents are welcome to have guests. However, for security and the peace of all residents, we ask that gatherings are kept respectful. Overnight guests should be coordinated with management for stays longer than 2 nights."
  },
  {
    question: "Is electricity included in the price?",
    answer: "For short-term and standard rooms (Rooms 3-24), electricity is fully included. For our premium larger suites (Rooms 1 & 2), electricity is charged separately based on meter reading to ensure fair usage of the extensive AC and kitchen facilities."
  },
  {
    question: "How secure is the residence?",
    answer: "Blue Pagoda features 24/7 on-site security and CCTV coverage in all communal areas. Each room is equipped with a high-quality safe and secure door locks for your peace of mind."
  },
  {
    question: "Is there high-speed internet for work?",
    answer: "Yes! We provide dedicated high-speed fiber-optic Wi-Fi throughout the entire property, including the clubhouse and pool area, making it an ideal environment for digital nomads."
  },
  {
    question: "Is there a swimming pool?",
    answer: "Yes, we have a beautiful shared swimming pool accessible to all residents. It's the perfect place to cool off and relax after a day in Kuta."
  },
  {
    question: "Is room cleaning included?",
    answer: "Regular room cleaning is included in your stay to ensure a fresh and comfortable living environment at all times."
  },
  {
    question: "Do you have laundry services?",
    answer: "We do not offer a dedicated laundry service on-site. However, there are many excellent and affordable local laundry shops just a few steps away from our entrance."
  },
  {
    question: "Are animals allowed?",
    answer: "Yes! We are animal-friendly, and we already have friendly animals living at the homestay. Your well-behaved pets are more than welcome here."
  }
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className={styles.faq}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Frequently Asked Questions</h2>
          <p className={styles.subtitle}>Everything you need to know about life at Blue Pagoda.</p>
        </div>
        
        <div className={styles.list}>
          {FAQS.map((faq, i) => (
            <div key={i} className={`${styles.item} ${openIndex === i ? styles.active : ''}`}>
              <button 
                className={styles.question} 
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
              >
                <span>{faq.question}</span>
                {openIndex === i ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              <div className={styles.answer}>
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
