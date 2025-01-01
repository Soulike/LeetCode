/*
 * @lc app=leetcode id=2101 lang=javascript
 *
 * [2101] Detonate the Maximum Bombs
 */

// @lc code=start
/**
 * @param {[x:number,y:number, r: number][]} bombs
 * @return {number}
 */
var maximumDetonation = function (bombs) {
  const N = bombs.length;

  /** @type {boolean[]} */
  let detonated = new Array(N);
  detonated.fill(false);

  /**
   * @param {number} bombIndex
   * @returns {number}
   */
  const getMaxDetonationCount = (bombIndex) => {
    const [x1, y1, r1] = bombs[bombIndex];
    let maxBombCount = 0;
    for (let i = 0; i < N; i++) {
      if (i === bombIndex || detonated[i]) continue;
      const [x2, y2] = bombs[i];
      const distance = getDistance([x1, y1], [x2, y2]);
      if (distance <= r1) {
        detonated[i] = true;
        maxBombCount += getMaxDetonationCount(i);
      }
    }
    return maxBombCount + 1;
  };

  let maxBombCount = 1;
  for (let i = 0; i < N; i++) {
    detonated.fill(false);
    detonated[i] = true;
    maxBombCount = Math.max(maxBombCount, getMaxDetonationCount(i));
  }

  return maxBombCount;
};

/**
 *
 * @param {[x:number, y:number]} coordinate1
 * @param {[x:number, y:number]} coordinate2
 */
function getDistance([x1, y1], [x2, y2]) {
  const diffX = x1 - x2;
  const diffY = y1 - y2;

  return Math.sqrt(diffX ** 2 + diffY ** 2);
}
// @lc code=end
