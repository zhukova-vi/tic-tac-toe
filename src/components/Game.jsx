import React, { useEffect, useState } from 'react';
import '../styles/Game.css'
import Board from './Board';
import { calculateWinner } from '../Helper'
import MySelect from './MySelect';

const defaultBoard = () => (new Array(9)).fill(null)
const Game = () => {
  const [board, setBoard] = useState(defaultBoard)
  const [xIsNext, setXIsNext] = useState(true)
  const [gameMode, setGameMode] = useState('playerGame');
  const winner = calculateWinner(board)

  useEffect(() => {
    if (gameMode === 'computerGame') {
      const isComputerTurn = board.filter(square => square !== null).length % 2 === 1
      const putComputerAt = index => {
        const currentBoard = [...board]
        currentBoard[index] = 'O'
        setBoard([...currentBoard])
      }
      if (isComputerTurn) {
        const emptyIndexes = board
          .map((square, index) => square === null ? index : null)
          .filter(val => val !== null)

        const randomIndex = emptyIndexes[Math.ceil(Math.random() * emptyIndexes.length)]
        putComputerAt(randomIndex)
      }
      
    } 
  }, [board, gameMode])

  const handleClick = (index) => {
    if (gameMode === 'computerGame') {
      const isPlayerTurn = board.filter(square => square !== null).length % 2 === 0
      if (isPlayerTurn) {
        const currentBoard = [...board]
        if (winner || currentBoard[index]) {
          return
        }
        currentBoard[index] = 'X'
        setBoard([...currentBoard])
      }
    }
    else {
      const currentBoard = [...board]
      if (winner || currentBoard[index]) {
        return
      }
      currentBoard[index] = xIsNext ? 'X' : 'O'
      setBoard(currentBoard)
      setXIsNext(prevState => !prevState)
    }
  }

  const startNewGame = () => {
    setBoard(defaultBoard)
    setXIsNext(true)
  }

  const changeGameMode = (value) => {
    setGameMode(value);
    startNewGame();
  }

  return (
    <div className='wrapper'>
      <MySelect
        value={gameMode}
        onChange={changeGameMode}
        options={[
          { value: 'playerGame', name: 'Парная игра' },
          { value: 'computerGame', name: 'Игра против компьютера' }
        ]}
      />
      <p className='game__info'>
        {winner ? 'Победитель: ' + winner : 'Сейчас ходит: ' + (xIsNext ? 'X' : 'O')}
      </p>

      <Board squares={board} click={handleClick}></Board>
      <button className='start__btn' onClick={startNewGame}>Новая игра</button>
    </div>
  )
}

export default Game;