import './App.css';

import { useState, useEffect } from 'react';

// components
import StartPage from './Components/StartPage';
import QuizPage from './Components/QuizPage';

function App() {
  const [startQuiz, setStartQuiz] = useState(false);
  const [quizData, setQuizData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    // request to server to get questions
    async function getQuestions() {
      try {
        setLoading(true);
        const response = await fetch(
          `https://opentdb.com/api.php?amount=5&type=multiple`
        );
        if (!response.ok) {
          setError(true);
          throw new Error('Something went wrong!');
        }

        const data = await response.json();
        console.log(data);
        setQuizData(data);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    }
    getQuestions();
  }, [startQuiz]);

  return (
    <div className="app">
      {!startQuiz && (
        <StartPage setStartQuiz={setStartQuiz} startQuiz={startQuiz} />
      )}
      {loading && <h1>Loading...</h1>}
      {error && <h1>Error</h1>}
      {startQuiz && <QuizPage quizData={quizData} />}
    </div>
  );
}

export default App;
