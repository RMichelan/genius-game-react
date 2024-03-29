import React from 'react';
// ** Import dos estilos da página
import './App.css';
// ** Imports dos botões/cores
import ButtonColor, {
  turnOnButton,
} from './components/buttonColor/ButtonColor';
// ** Imports das regras do jogo
import Game from './Game';

function App() {
  const {
    disableClick,
    gameStarted,
    textComments,
    gameOver,
    startGame,
    restartGame,
    addPlayerSequence,
  } = Game();

  // ** Constants
  const COLORS = {
    red: '#FF0060',
    blue: '#0079FF',
    yellow: '#F6FA70',
    green: '#00DFA2',
  };

  return (
    <div className="container">
      {gameStarted ? (
        <>
          <div className="comments-area">
            <p>{textComments}</p>
          </div>

          <div className="colors-area">
            <div className="colors-row">
              <ButtonColor
                id={1}
                disabled={disableClick}
                color={COLORS.red}
                className="button-color red"
                value={1}
                onMouseDown={(e) => turnOnButton(e)}
                onMouseUp={(e) => addPlayerSequence(e)}
              />
              <ButtonColor
                id={2}
                disabled={disableClick}
                color={COLORS.blue}
                className="button-color blue"
                value={2}
                onMouseDown={(e) => turnOnButton(e)}
                onMouseUp={(e) => addPlayerSequence(e)}
              />
            </div>
            <div className="center">
              <span
                className="center-button"
                onClick={restartGame}
                style={{
                  pointerEvents: !gameOver && "none",
                  cursor: gameOver && "pointer"
                }}
              >
                <p>{gameOver && "Reiniciar"}</p>
              </span>
            </div>
            <div className="button-area">
              <ButtonColor
                id={3}
                disabled={disableClick}
                color={COLORS.yellow}
                className="button-color yellow"
                value={3}
                onMouseDown={(e) => turnOnButton(e)}
                onMouseUp={(e) => addPlayerSequence(e)}
              />
              <ButtonColor
                id={4}
                disabled={disableClick}
                color={COLORS.green}
                className="button-color green"
                value={4}
                onMouseDown={(e) => turnOnButton(e)}
                onMouseUp={(e) => addPlayerSequence(e)}
              />
            </div>
          </div>
        </>
      ) : (
        <button className="start-button" onClick={startGame}>
          Iniciar
        </button>
      )}
    </div>
  );
}

export default App;
