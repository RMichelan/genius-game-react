import { useState, useEffect } from 'react';

export default function Game() {
  // ** States
  const [playerSequence, setPlayerSequence] = useState([]);
  const [colorSequence, setColorSequence] = useState([]);
  const [disableClick, setDisableClick] = useState(true);
  const [gameStarted, setGameStarted] = useState(false);
  const [textComments, setTextComments] = useState('...');

  // ** Functions
  // Inicia o jogo
  const startGame = () => {
    setGameStarted(true);
    addColorSequence();
  };

  // Reseta o jogo
  const restartGame = () => {
    setDisableClick(true);
    setTextComments('...');
    setPlayerSequence([]);
    setColorSequence([]);

    addColorSequence();
  };

  // Finaliza o jogo
  const endGame = () => {
    let score = playerSequence.length;

    setTextComments(`Você errou a sequência! Sua Pontuação foi de ${score}.`);
    setDisableClick(true);
    setPlayerSequence([]);
    setColorSequence([]);
  };

  // Adiciona a cor na sequência que o player deve seguir
  const addColorSequence = () => {
    let number = Math.floor(Math.random() * 4) + 1;

    setDisableClick(true);
    setTextComments('...');
    setColorSequence([...colorSequence, number]);
  };

  // Adiciona a cor selecionada na sequência do player
  const addPlayerSequence = (event) => {
    if (disableClick) {
      return;
    }

    let target = event.target;

    target.style.opacity = 0.4;

    setPlayerSequence([...playerSequence, target.value]);
  };

  // Verifica se a sequência digitada está correta
  const checkSequences = () => {
    let arrIndex = playerSequence.length - 1;

    if (!(colorSequence.at(arrIndex) == playerSequence.at(arrIndex))) {
      endGame();
      return;
    }

    if (colorSequence.length == playerSequence.length) {
      setPlayerSequence([]);
      setDisableClick(true);

      setTimeout(() => {
        addColorSequence();
      }, 1000);
    }
  };

  // "Acende" a sequência de cores
  const turnOnSequence = () => {
    setDisableClick(true);

    let colorIndex = 0;

    let turnColorInterval = setInterval(() => {
      let colorId = colorSequence[colorIndex];
      let currentButton = document.getElementById(colorId);

      currentButton.style.opacity = 1;

      setTimeout(() => {
        currentButton.style.opacity = 0.4;
      }, 400);

      colorIndex++;

      if (colorIndex === colorSequence.length && colorSequence.length > 0) {
        setDisableClick(false);

        clearInterval(turnColorInterval);

        setTimeout(() => {
          setTextComments('Sua Vez');
        }, 800);
      }
    }, 800);
  };

  // ** useEffects
  useEffect(() => {
    colorSequence.length > 0 && turnOnSequence();
  }, [colorSequence]);

  useEffect(() => {
    if (disableClick == false && colorSequence.length > 0) {
      checkSequences();
    }
  }, [playerSequence]);

  return {
    // ** States
    disableClick,
    gameStarted,
    textComments,

    // ** Functions
    startGame,
    restartGame,
    addPlayerSequence,
  };
}
