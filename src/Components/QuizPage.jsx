import React from 'react';

export default function QuizPage({ quizData }) {
  console.log(quizData);

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

        {/* <label htmlFor="">
          <h1>{decodeURIComponent(item.question.replace(/&quot;/g, '"'))}</h1>
          <input
            type="radio"
            name={index + 1}
            value={item.allOptionsShuffled[0]}
          />
        </label> */}
      </div>
    );
  });

  return <form>{questions}</form>;
}
