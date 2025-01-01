/*
 * @lc app=leetcode id=1603 lang=javascript
 *
 * [1603] Design Parking System
 */

// @lc code=start
class ParkingSystem {
  #bigRoom;
  #mediumRoom;
  #smallRoom;

  static #BIG = 1;
  static #MEDIUM = 2;
  static #SMALL = 3;

  /**
   * @param {number} big
   * @param {number} medium
   * @param {number} small
   */
  constructor(big, medium, small) {
    this.#bigRoom = big;
    this.#mediumRoom = medium;
    this.#smallRoom = small;
  }

  /**
   * @param {1|2|3} carType
   * @return {boolean}
   */
  addCar(carType) {
    switch (carType) {
      case ParkingSystem.#SMALL: {
        if (this.#smallRoom > 0) {
          this.#smallRoom--;
          return true;
        } else {
          return false;
        }
      }
      case ParkingSystem.#MEDIUM: {
        if (this.#mediumRoom > 0) {
          this.#mediumRoom--;
          return true;
        } else {
          return false;
        }
      }
      case ParkingSystem.#BIG: {
        if (this.#bigRoom > 0) {
          this.#bigRoom--;
          return true;
        } else {
          return false;
        }
      }
    }
  }
}

/**
 * Your ParkingSystem object will be instantiated and called as such:
 * var obj = new ParkingSystem(big, medium, small)
 * var param_1 = obj.addCar(carType)
 */
// @lc code=end
