import React from 'react';

export default function StartPage({ setStartQuiz, startQuiz }) {
  return (
    <div>
      <h1>Quizzical</h1>
      <p>Description</p>
      <button onClick={() => setStartQuiz((prev) => !prev)}>Start Quiz</button>
    </div>
  );
}
