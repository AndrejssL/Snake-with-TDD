import {Game, Cell} from "./Game"

describe("Game", () =>{
    it("should have apple placed", () => {
        const game = new Game()
        const apple = game.getApple()

        expect(apple).toEqual(new Cell(5, 5))
    })
})