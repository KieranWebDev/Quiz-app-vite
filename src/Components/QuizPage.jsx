import React, { useState } from 'react';

export default function QuizPage({ quizData }) {
  const [usersAnswers, setusersAnswers] = useState({});

  const correctAnswers = quizData.map((item) => item.correct_answer);
  console.log(correctAnswers);

  function defaultform() {
    const defaultForm = {};

    for (let i = 0; i < quizData.length; i++) {
      defaultForm[`question${i + 1}`] = '';
    }
    return defaultForm;
  }

  // console.log(quizData);
  // console.log(formData);
  function handleChange(event) {
    const { name, value, checked } = event.target;
    setusersAnswers((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
    console.log(usersAnswers);
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log(usersAnswers);
    // setScore();
  }

  function convertToQuotations(string) {
    return decodeURIComponent(
      string.replace(/&quot;/g, '"').replace(/&#039;/g, "'")
    );
  }

  const questions = quizData.map((item, index) => {
    // console.log(item.allOptionsShuffled);
    const option = item.allOptionsShuffled;

    return (
      <div key={item.question}>
        <h1>{convertToQuotations(item.question)}</h1>
        <input
          type="radio"
          id={option[0]}
          name={`question${index + 1}`}
          value={option[0]}
          onChange={handleChange}
        />
        <label htmlFor={option[0]}>{convertToQuotations(option[0])}</label>

        <input
          type="radio"
          id={option[1]}
          name={`question${index + 1}`}
          value={option[1]}
          onChange={handleChange}
        />
        <label htmlFor={option[1]}>{convertToQuotations(option[1])}</label>

        <input
          type="radio"
          id={option[2]}
          name={`question${index + 1}`}
          value={option[2]}
          onChange={handleChange}
        />
        <label htmlFor={option[2]}>{convertToQuotations(option[2])}</label>

        <input
          type="radio"
          id={option[3]}
          name={`question${index + 1}`}
          value={option[3]}
          onChange={handleChange}
        />
        <label htmlFor={option[3]}>{convertToQuotations(option[3])}</label>
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
