import { useState } from 'react';
// import { questionsList } from "../components/questions";
// import { definitionsList } from "../c"


function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState('hi');
  const [buttonOne, setButtonOne] = useState('');
  const [buttonTwo, setButtonTwo] = useState('');
  const [buttonThree, setButtonThree] = useState('');
  const [buttonFour, setButtonFour] = useState('');
  const [start, setStart] = useState(false);
  const [streak, setStreak] = useState(0);
  const [highestStreak, setHighestStreak] = useState(0);

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
      setButtonOne(correctAnswer);
      setButtonTwo(questionsList[randomQuestionIndex()][1]);
      setButtonThree(questionsList[randomQuestionIndex()][1]);
      setButtonFour(questionsList[randomQuestionIndex()][1]);
    } else if (ranNum === 2) {
      setButtonTwo(correctAnswer);
      setButtonOne(questionsList[randomQuestionIndex()][1]);
      setButtonThree(questionsList[randomQuestionIndex()][1]);
      setButtonFour(questionsList[randomQuestionIndex()][1]);
    } else if (ranNum === 3) {
      setButtonThree(correctAnswer);
      setButtonOne(questionsList[randomQuestionIndex()][1]);
      setButtonTwo(questionsList[randomQuestionIndex()][1]);
      setButtonFour(questionsList[randomQuestionIndex()][1]);
    } else if (ranNum === 4) {
      setButtonFour(correctAnswer);
      setButtonOne(questionsList[randomQuestionIndex()][1]);
      setButtonTwo(questionsList[randomQuestionIndex()][1]);
      setButtonThree(questionsList[randomQuestionIndex()][1]);
    }
  };

  const checkCorrect = (e) => {
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
