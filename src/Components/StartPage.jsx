import React from 'react';

export default function StartPage({
  setStartQuiz,
  startQuiz,
  organizeQuestions,
  quizCriteria,
  setQuizCriteria,
  setApiString,
  apiString,
}) {
  function handleChange(event) {
    const { name, value } = event.target;
    setQuizCriteria((prevValue) => {
      return {
        ...prevValue,
        [name]: value, // <--- this is the problem line
      };
    });
    console.log(quizCriteria);
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(quizCriteria);
    let { category, difficulty, numOfQuestions } = quizCriteria;

    numOfQuestions = numOfQuestions === '' ? '' : `amount=${numOfQuestions}`;
    category = category === '' ? '' : `&category=${category}`;
    difficulty = difficulty === '' ? '' : `&difficulty=${difficulty}`;

    const newApiString = `${numOfQuestions}${category}${difficulty}&type=multiple`;
    setApiString(newApiString);
    setStartQuiz(true);
    console.log(newApiString);
  }

  return (
    <div>
      <h1>Quizzical</h1>
      <p>Description</p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="numOfQuestions">Number of Questions</label>
        <input
          type="number"
          required
          min="5"
          max="20"
          id="numOfQuestions"
          value={quizCriteria.numOfQuestions}
          name="numOfQuestions"
          onChange={handleChange}
        />
        <label htmlFor="category">Category</label>
        <select
          name="category"
          id="category"
          value={quizCriteria.category}
          onChange={handleChange}
        >
          <option value="">Any Category</option>
          <option value="9">General Knowledge</option>
          <option value="18">Science:Computers</option>
          <option value="11">Films</option>
          <option value="10">Books</option>
          <option value="21">Sports</option>
          <option value="27">Animals</option>
          <option value="17">Science and Nature</option>
          <option value="23">History</option>
        </select>
        <label htmlFor="difficulty">Difficulty</label>
        <select
          name="difficulty"
          id="difficulty"
          value={quizCriteria.difficulty}
          onChange={handleChange}
        >
          <option value="">Any Difficulty</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>

        <div>
          <button>Start Quiz</button>
        </div>
      </form>
      {/* <button onClick={() => setStartQuiz(true)}>Start Quiz</button> */}
    </div>
  );
}
