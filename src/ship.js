export class Ship {
  #direction;
  #size;
  #damage;

  constructor(size=1,direction="vertical") {
    this.#size = size;
    this.#direction = direction;
    this.#damage = 0;
  }

  get direction () {
    return this.#direction;
  }

  get size (){
    return this.#size;
  }

  toggleDirection() {
    this.#direction = this.#direction == "vertical" ? "horizontal" : "vertical"
  }

  isDead(){
    return this.#size <= this.#damage;
  }

  addDamage(){
    this.#damage += 1
  }
}
