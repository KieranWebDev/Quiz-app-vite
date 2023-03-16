import './App.css';

import { useState, useEffect } from 'react';

// components
import StartPage from './Components/StartPage';
import QuizPage from './Components/QuizPage';

function App() {
  const [startQuiz, setStartQuiz] = useState(false);
  const [quizData, setQuizData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [quizCriteria, setQuizCriteria] = useState({
    numOfQuestions: 5,
    category: '',
    difficulty: '',
  });
  const [apiString, setApiString] = useState('amount=5&type=multiple');

  useEffect(() => {
    async function getQuestions() {
      try {
        setLoading(true);
        const response = await fetch(
          `https://opentdb.com/api.php?${apiString}`
        );
        if (!response.ok) {
          setError(true);
          throw new Error('Something went wrong!');
        }

        const data = await response.json();
        setQuizData(() => organizeQuestions(data.results));
        console.log(quizData);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    }
    getQuestions();
  }, [apiString]);
  console.log(apiString);
  function organizeQuestions(questions) {
    const newQuizData = questions.map((question) => {
      const allOptions = [
        ...question.incorrect_answers,
        question.correct_answer,
      ];
      const allOptionsShuffled = allOptions.sort(() => Math.random() - 0.5);
      return {
        ...question,
        allOptionsShuffled: allOptionsShuffled,
      };
    });
    return newQuizData;
  }

  return (
    <div className="app">
      {!startQuiz && (
        <StartPage
          setStartQuiz={setStartQuiz}
          startQuiz={startQuiz}
          organizeQuestions={organizeQuestions}
          quizCriteria={quizCriteria}
          setQuizCriteria={setQuizCriteria}
          setApiString={setApiString}
          apiString={apiString}
        />
      )}
      {loading && <h1>Loading...</h1>}
      {error && <h1>Error</h1>}
      {startQuiz && (
        <QuizPage quizData={quizData} setStartQuiz={setStartQuiz} />
      )}
    </div>
  );
}

export default App;
