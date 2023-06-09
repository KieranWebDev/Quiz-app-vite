import React, { useState } from 'react';
import { decode } from 'he';
import Confetti from 'react-confetti';

import './QuizPage.css';

export default function QuizPage({ quizData, setStartQuiz }) {
  const [usersAnswers, setUsersAnswers] = useState({});
  const [score, setScore] = useState('');
  const [submissionStyles, setSubmissionStyles] = useState(false);

  console.log(quizData);
  function handleChange(event) {
    console.log(event.target);
    const { name, value, checked } = event.target;
    setUsersAnswers((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
    console.log(usersAnswers);
  }

  function handleSubmit(event) {
    event.preventDefault();

    // calculating finalScore
    const correctAnswers = quizData.map((item) => item.correct_answer);

    const finalScore = correctAnswers
      .map((item, index) =>
        item === usersAnswers[`question${index + 1}`] ? 1 : 0
      )
      .reduce((accum, current) => accum + current);
    setScore(finalScore);
    setSubmissionStyles(true);
  }

  function convertToReadableString(string) {
    // return decodeURIComponent(
    //   string.replace(/&quot;/g, '"').replace(/&#039;/g, "'")
    // );
    return decode(string);
  }

  function playAgain() {
    setScore('');
    setSubmissionStyles(false);
    setUsersAnswers({});
    setStartQuiz(false);
  }

  const questions = quizData.map((item, index) => {
    // console.log(item);
    const option = item.allOptionsShuffled;
    const isCorrect =
      item.correct_answer === usersAnswers[`question${index + 1}`];

    function styles(option) {
      if (submissionStyles && item.correct_answer === option) {
        return 'correct';
      }
    }

    return (
      <div key={item.question}>
        <h1>{convertToReadableString(item.question)}</h1>
        <input
          required
          type="radio"
          id={option[0]}
          name={`question${index + 1}`}
          value={option[0]}
          onChange={handleChange}
        />
        <label htmlFor={option[0]} className={styles(option[0])}>
          {convertToReadableString(option[0])}
        </label>

        <input
          type="radio"
          id={option[1]}
          name={`question${index + 1}`}
          value={option[1]}
          onChange={handleChange}
        />
        <label htmlFor={option[1]} className={styles(option[1])}>
          {convertToReadableString(option[1])}
        </label>

        <input
          type="radio"
          id={option[2]}
          name={`question${index + 1}`}
          value={option[2]}
          onChange={handleChange}
        />
        <label htmlFor={option[2]} className={styles(option[2])}>
          {convertToReadableString(option[2])}
        </label>

        <input
          type="radio"
          id={option[3]}
          name={`question${index + 1}`}
          value={option[3]}
          onChange={handleChange}
        />
        <label htmlFor={option[3]} className={styles(option[3])}>
          {convertToReadableString(option[3])}
        </label>
        {submissionStyles && isCorrect && <span>✅</span>}
        {submissionStyles && !isCorrect && <span>❌</span>}
      </div>
    );
  });

  return (
    <>
      <h1>{quizData[0].category}</h1>
      <h2>{quizData.length} Questions</h2>
      <form onSubmit={handleSubmit}>
        {questions}
        <button>Check Answers</button>
      </form>
      {score && (
        <div>
          <h2>
            {score} out of {quizData.length} ({(score / quizData.length) * 100}
            %)
          </h2>
          <button onClick={playAgain}>Play again!</button>
          {/* <div className="confetti-container">
            <Confetti
              width={window.innerWidth}
              height={window.innerHeight}
              number={800}
              initialVelocityY={15}
            />
          </div> */}
        </div>
      )}
    </>
  );
}
