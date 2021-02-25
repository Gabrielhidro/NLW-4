import { useState, useEffect, useContext } from 'react';
import { CountdownContext } from '../contexts/CountdownContext';
import style from '../styles/components/Countdown.module.css';

export function Countdown(){
  const {
    minutes,
    seconds,
    isActive,
    hasFinished,
    startCountdown,
    resetCountdown
  } = useContext(CountdownContext)

  const [minuteL, minuteR] = String(minutes).padStart(2, '0').split('');
  const [secondL, secondR] = String(seconds).padStart(2, '0').split('');

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
        <img src="icons/icon-check.svg" alt="" style={{marginLeft: "10px"}}/>
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