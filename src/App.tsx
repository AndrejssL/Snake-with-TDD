import React, { useState } from "react";
import "./App.css";
import { Snake, Direction } from "./engine/Snake";
import { Cell, Game } from "./engine/Game";

const game = new Game();
const isAppleInside = (x: number, y: number) => {
  const apple = game.getApple();
  return apple.x === x && apple.y === y;
};
const snake = new Snake(isAppleInside);

const cssClass = (x: number, y: number) => {
  if (snake.isOnCell(x, y)) {
    return "snake";
  }
  const apple = game.getApple();
  if (apple.x === x && apple.y === y) {
    return "apple";
  }
  return "";
};

const App: React.FC = () => {
  const [cells, setCells] = useState<Cell[]>(snake.getCells());

  setTimeout(() => {
    snake.move();
    setCells(snake.getCells());
  }, 250);

  function parseDirection(e: KeyboardEvent): Direction | null {
    switch (e.key) {
      case "ArrowUp":
        return Direction.North;
      case "ArrowRight":
        return Direction.East;
      case "ArrowDown":
        return Direction.South;
      case "ArrowLeft":
        return Direction.West;
      case "w":
        return Direction.North;
      case "d":
        return Direction.East;
      case "s":
        return Direction.South;
      case "e":
        return Direction.West;
    }
    return null;
  }

  document.addEventListener("keyup", e => {
    e.preventDefault();
    const direction = parseDirection(e);
    if (direction) {
      snake.changeDirection(direction);
    }
  });

  return (
    <div>
      <table>
        <tbody>
          {Array(25)
            .fill(null)
            .map((_, y: number) => (
              <tr>
                {Array(25)
                  .fill(null)
                  .map((_, x: number) => (
                    <td className={cssClass(x, y)} />
                  ))}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
