import { useState, useEffect, useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import style from '../styles/components/Countdown.module.css';

let coundownTimeOut: NodeJS.Timeout

export function Countdown(){
  const { startNewChallenge } = useContext(ChallengesContext);

  const [time, setTime] = useState(0.1 * 60); //Tempo cronograma (25 * 60)
  const [isActive, setIsActive] = useState(false);
  const [hasFinished, setHasFinished] = useState(false)

  const minutes = Math.floor (time / 60);
  const seconds = time % 60;

  const [minuteL, minuteR] = String(minutes).padStart(2, '0').split('');
  const [secondL, secondR] = String(seconds).padStart(2, '0').split('');

  function startCountdown(){
    setIsActive(true);
  }

  function resetCountdown(){
    clearTimeout(coundownTimeOut);
    setIsActive(false)
    setTime(25 * 60)
  }

  useEffect(() => {
    if(isActive && time > 0){
      coundownTimeOut = setTimeout(() => {
        setTime(time - 1);
      }, 1000)
    } else if (isActive && time === 0){
      setHasFinished(true)
      setIsActive(false)
      startNewChallenge();
    }
  }, [isActive, time])

  return(
    <div>
        <div className={style.countdownContainer}>
          <div>
            <span>{minuteL}</span>
            <span>{minuteR}</span>
          </div>
          <span>:</span>
          <div>
            <span>{secondL}</span>
            <span>{secondR}</span>
          </div>
      </div>

      {hasFinished ? (
        <button
        disabled
        className={style.countdownButton}>
        Ciclo encerrado
        </button>
      ) : (
        <>
                { isActive ? (
          <button type="button"
          className={`${style.countdownButton} ${style.countdownButtonActive}`}
          onClick={resetCountdown}>
          Abandonar ciclo
          </button>
      ) : (
        <button type="button"
        className={style.countdownButton}
        onClick={startCountdown}>
        Iniciar um ciclo
        </button>
      )}
        </>
      )}


      
    </div>
  )
}