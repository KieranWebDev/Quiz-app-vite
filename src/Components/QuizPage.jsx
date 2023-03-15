import React, { useState } from 'react';

export default function QuizPage({ quizData }) {
  const [formData, setFormData] = useState(defaultform);

  function defaultform() {
    const defaultForm = {};

    for (let i = 0; i < quizData.length; i++) {
      defaultForm[`question${i + 1}`] = '';
    }
    return defaultForm;
  }
  console.log(quizData);
  console.log(formData);

  function handleSubmit() {}

  const questions = quizData.map((item, index) => {
    console.log(item.allOptionsShuffled);
    const option = item.allOptionsShuffled;
    return (
      <div>
        <h1>{decodeURIComponent(item.question.replace(/&quot;/g, '"'))}</h1>
        <input type="radio" id={option[0]} name={index + 1} value={option[0]} />
        <label htmlFor={option[0]}>{option[0]}</label>

        <input type="radio" id={option[1]} name={index + 1} value={option[1]} />
        <label htmlFor={option[1]}>{option[1]}</label>

        <input type="radio" id={option[2]} name={index + 1} value={option[2]} />
        <label htmlFor={option[2]}>{option[2]}</label>

        <input type="radio" id={option[3]} name={index + 1} value={option[3]} />
        <label htmlFor={option[3]}>{option[3]}</label>
      </div>
    );
  });

  return (
    <form onSubmit={handleSubmit}>
      {questions}
      <button>Check Answers</button>
    </form>
  );
}
