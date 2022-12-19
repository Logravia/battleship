export class BoardHelper {
  static HEIGHT = 10
  static WIDTH = 10

  static withinBoard(coords) {
    return (coords.x >= 0 && coords.x < this.WIDTH) && (coords.y >= 0 && coords.y < this.HEIGHT)
  }

  static squaresAround(coords) {
    let directions = [{x:0, y:-1},{x:1,y:-1},{x:1,y:0},{x:1,y:1},{x:0,y:1},{x:-1,y:1},{x:-1,y:0},{x:-1,y:-1}];
    let squares = [];

    directions.forEach(dir=>{
      let adjacent_sqr = {x: coords.x + dir.x, y: coords.y + dir.y};
      if (this.withinBoard(adjacent_sqr)){
        squares.push(adjacent_sqr);
      }
    })

    return squares;
  }
}
