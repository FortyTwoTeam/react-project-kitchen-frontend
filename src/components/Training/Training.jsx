import { useState } from 'react';
import Timer from './Timer'
import {data} from './mock-data'
import Button from '../Button/Button';

import s from './style.module.scss';

const Training = () => {
  const initialScore = {
    'correct': 0,
    'incorrect': 0,
    'total': 0
  }
  let [stage, setStage] = useState(1);
  let [shownAnswer, setShownAnswer] = useState(false);
  let [currentQuestion, setCurrentQuestion] = useState(0);
  let [score, setScore] = useState(initialScore);

 const onTimeExpired = () => {
  // const audio = new Audio('../../assets/sounds/timesup.mp3');
  // audio.play();
  setShownAnswer(true)
 }
 const nextQuestion = () => {
   const questionIndex = Math.round(Math.random()*(data.length-1))
  setCurrentQuestion(questionIndex)
  setShownAnswer(false)
 }

 if (stage === 3) {
   return (
    <div className={s.wrapper}>
      <h2 className={s.title}>Тренажёр</h2>
      <div>Результат</div>
      <div>Всего: {score.total ? score.total : 'На 1ый вопрос можно было бы и ответить :('}</div>
      <div>Правильно: {score.correct} ({score.total ? Math.round((score.correct/score.total*100), 2) : 0})%</div>
      <div>Неправильно: {score.incorrect} ({score.total ? Math.round((score.incorrect/score.total*100), 2) : 0})%</div>
      <Button className={s.main} onClick={() => {setStage(1);setScore(initialScore);setShownAnswer(0)}}>Главная</Button>
    </div>
   );
 }


 if (stage === 2) {
   return (
     <div className={s.wrapper}>
       <h2 className={s.title}>Тренажёр</h2>
       <div className={s.section}>
        <h4>Вопрос</h4>
        <div>{data[currentQuestion].question}</div>
       </div>
       {
         !shownAnswer ? (
           <>
            <Timer onTimeExpired={onTimeExpired}/>
            <Button className={s.show_answer} onClick={() => {onTimeExpired()}}>Показать ответ</Button>
          </>
         ) : (
          <div>
            <p className={s.timer}>Проверка!</p>
            <Button className={s.finish} onClick={() => setStage(3)}>Окончить</Button>
            <div className={s.section}>
              <h4>Ответ</h4>
              <div>{data[currentQuestion].answer}</div>
            </div>
            <Button className={s.correct} onClick={() => {nextQuestion();setScore({...score, 'correct':score.correct+1,'total':score.total+1})}}>Правильно</Button>
            <Button className={s.incorrect} onClick={() => {nextQuestion();setScore({...score, 'incorrect':score.incorrect+1,'total':score.total+1})}}>Неправильно</Button>


          </div>
         )
       }
 
     </div>
   );
 }
  return (
    <div className={s.wrapper}>
      <h2 className={s.title}>Тренажёр</h2>
      <Button className={s.start} onClick={() => setStage(2)}>Начать</Button>
    </div>
  );
};

export default Training;
