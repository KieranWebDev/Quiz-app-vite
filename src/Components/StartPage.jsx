import React from 'react';

export default function StartPage({
  setStartQuiz,
  startQuiz,
  organizeQuestions,
}) {
  return (
    <div>
      <h1>Quizzical</h1>
      <p>Description</p>
      <button onClick={() => setStartQuiz(true)}>Start Quiz</button>
    </div>
  );
}
