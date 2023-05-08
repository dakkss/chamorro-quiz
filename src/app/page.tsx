"use client"

import { useEffect, useState } from 'react';
import { questions } from "../components/questions";


function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [buttonOne, setButtonOne] = useState('');
  const [buttonTwo, setButtonTwo] = useState('');
  const [buttonThree, setButtonThree] = useState('');
  const [buttonFour, setButtonFour] = useState('');
  const [start, setStart] = useState(false);
  const [streak, setStreak] = useState(0);
  const [highestStreak, setHighestStreak] = useState(0);
  const [questionsList, setQuestionsList] = useState([['']])

  useEffect(() => {
    setQuestionsList(questions)
  })


  const randomQuestionIndex = () => {
    return Math.floor(Math.random() * questionsList.length);
  };

  const randomButtonNumber = () => {
    let ind = Math.floor(Math.random() * 4 + 1);
    return ind;
  };

  const randomQuestion = () => {
    let res = [];
    let l1 = Object.entries(questionsList);
    let l2 = l1[randomQuestionIndex()][1];
    let l3 = l2[0];
    let l4 = l2[1];
    res.push(l3);
    res.push(l4);
    return res;
  };

  const startQuiz = () => {
    setStart(true);
    changeQuestion();
  };

  const changeQuestion = () => {
    const ok = randomQuestion();
    setCurrentQuestion(ok[0]);
    setCorrectAnswer(ok[1]);
    let ranNum = randomButtonNumber();
    if (ranNum === 1) {
      setButtonOne(ok[1]);
      setButtonTwo(questionsList[randomQuestionIndex()][1]);
      setButtonThree(questionsList[randomQuestionIndex()][1]);
      setButtonFour(questionsList[randomQuestionIndex()][1]);
    } else if (ranNum === 2) {
      setButtonTwo(ok[1]);
      setButtonOne(questionsList[randomQuestionIndex()][1]);
      setButtonThree(questionsList[randomQuestionIndex()][1]);
      setButtonFour(questionsList[randomQuestionIndex()][1]);
    } else if (ranNum === 3) {
      setButtonThree(ok[1]);
      setButtonOne(questionsList[randomQuestionIndex()][1]);
      setButtonTwo(questionsList[randomQuestionIndex()][1]);
      setButtonFour(questionsList[randomQuestionIndex()][1]);
    } else if (ranNum === 4) {
      setButtonFour(ok[1]);
      setButtonOne(questionsList[randomQuestionIndex()][1]);
      setButtonTwo(questionsList[randomQuestionIndex()][1]);
      setButtonThree(questionsList[randomQuestionIndex()][1]);
    }
  };

  const checkCorrect = (e: any) => {
    if (e.target.value === correctAnswer) {
      changeQuestion();
      setStreak(streak + 1);
    } else {
      if (streak > highestStreak) {
        setHighestStreak(streak);
      }
      setStreak(0);

    }
  }


  if (start) return (

    <main className="h-screen w-screen">
      <div className='w-screen'>
        <div className="flex flex-row w-full p-5">
          <button className='w-24' onClick={() => setStart(false)} >Main menu</button>
          <div className="flex w-full md:text-lg text-sm self-center justify-end gap-3 ">
            <h2 >Current Streak: {streak}</h2>
            <h2 >Highest Streak: {highestStreak}</h2>
            <h2></h2>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center mt-20">
        <div className=" flex justify-center text-5xl">
          <h1>{currentQuestion}</h1>
        </div>
        <div className="flex flex-col items-center mt-8 w-96">
          <button onClick={checkCorrect} value={buttonOne} className="m-3 rounded bg-green-200 border border-solid border-slate-900 w-28 hover:bg-green-300">{buttonOne}</button>
          <button onClick={checkCorrect} value={buttonTwo} className="m-3 rounded bg-green-200 border border-solid border-slate-900 w-28 hover:bg-green-300">{buttonTwo}</button>
          <button onClick={checkCorrect} value={buttonThree} className="m-3 rounded bg-green-200 border border-solid border-slate-900 w-28 hover:bg-green-300">{buttonThree}</button>
          <button onClick={checkCorrect} value={buttonFour} className="m-3 rounded bg-green-200 border border-solid border-slate-900 w-28 hover:bg-green-300">{buttonFour}</button>
        </div>
        <div className="flex justify-center pt-5">
          <button onClick={changeQuestion} className="bg-green-200 hover:bg-green-300 border border-solid border-black rounded w-24">
            Change Question
          </button>
        </div>
      </div>
    </main>
  )

  if (!start) return (
    <div className='flex flex-col h-screen justify-center items-center gap-3'>
      <button className="border rounded-2xl text-2xl md:text-5xl bg-green-200 p-5 " onClick={startQuiz}>Start Quiz (All topics)</button>
      <button className="border rounded-2xl text-xl md:text-4xl bg-green-200 p-5 " onClick={startQuiz}>Choose a Topic</button>
    </div>
  )
}


export default Quiz
