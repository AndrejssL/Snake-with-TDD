import { Snake, Direction } from "./Snake";
import { Cell } from "./Game";

describe("Snake", () => {
  it("should have initial position", () => {
    const snake = new Snake();

    const cells = snake.getCells();

    expect(cells).toEqual([new Cell(0, 0), new Cell(1, 0), new Cell(2, 0)]);
  });

  it("should be able to move east", () => {
    const snake = new Snake();

    snake.move();
    const cells = snake.getCells();

    expect(cells).toEqual([new Cell(1, 0), new Cell(2, 0), new Cell(3, 0)]);
  });

  it("should be able to move south", () => {
    const snake = new Snake();

    snake.changeDirection(Direction.South);
    snake.move();

    const cells = snake.getCells();

    expect(cells).toEqual([new Cell(1, 0), new Cell(2, 0), new Cell(2, 1)]);
  });

  it("should be able to move north", () => {
    const snake = new Snake();

    snake.changeDirection(Direction.South);
    snake.move();
    snake.move();
    snake.move();

    snake.changeDirection(Direction.East);
    snake.move();

    snake.changeDirection(Direction.North);
    snake.move();
    snake.move();
    snake.move();

    const cells = snake.getCells();

    expect(cells).toEqual([new Cell(3, 2), new Cell(3, 1), new Cell(3, 0)]);
  });

  it("should be able to move west", () => {
    const snake = new Snake();

    snake.changeDirection(Direction.South);
    snake.move();
    snake.changeDirection(Direction.West);
    snake.move();

    const cells = snake.getCells();

    expect(cells).toEqual([new Cell(2, 0), new Cell(2, 1), new Cell(1, 1)]);
  });

  it("should not be able to change direction to opposite", () => {
    const snake = new Snake();

    snake.changeDirection(Direction.West);
    expect(snake.getDirection()).toBe(Direction.East);

    snake.changeDirection(Direction.North);
    snake.changeDirection(Direction.South);
    expect(snake.getDirection()).toBe(Direction.North);

    snake.changeDirection(Direction.West);
    snake.changeDirection(Direction.East);
    expect(snake.getDirection()).toBe(Direction.West);

    snake.changeDirection(Direction.South);
    snake.changeDirection(Direction.North);
    expect(snake.getDirection()).toBe(Direction.South);
  });

  it("should be able to grow", () => {
    const isAppleInside = (x: number, y: number) => true;
    const snake = new Snake(isAppleInside);

    snake.move();

    expect(snake.getCells()).toEqual([
      new Cell(0, 0),
      new Cell(1, 0),
      new Cell(2, 0),
      new Cell(3, 0)
    ]);
  });

  it("should tell if snake is on cell", () => {
    const snake = new Snake();

    expect(snake.isOnCell(0, 0)).toBeTruthy();
    expect(snake.isOnCell(-1, -1)).toBeFalsy();
  });
});
