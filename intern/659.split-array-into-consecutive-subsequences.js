/*
 * @lc app=leetcode id=659 lang=javascript
 *
 * [659] Split Array into Consecutive Subsequences
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {boolean}
 */
var isPossible = function (nums) {
  /**
   * numToFreq 剩余可用数字的频率，例如 numToFreq[3] = 2 还有两个 3 可用
   * nextNeededNum 已有序列中下一个需要的数字的个数，例如 nextNeededNum[4] = 3 有 3 个序列后面可以接 4
   *
   * while numToFreq 还剩下数字
   *  for num of nums
   *      if nextNeededNum[num] > 0 // 可以接到已有序列
   *          numToFreq[num]--;
   *          nextNeededNum[num]--;
   *          nextNeededNum[num+1]++;
   *      // 可以形成新的列
   *      else if numToFreq[num+1] > 0 && numToFreq[num+2] > 0
   *          numToFreq[num]--;
   *          numToFreq[num+1]--;
   *          numToFreq[num+2]--;
   *          nextNeededNum[num+3]++;
   *      else
   *          return false;
   */

  const numToFreq = new Map();
  const nextNeededNum = new Map();

  for (const num of nums) {
    numToFreq.set(num, (numToFreq.get(num) ?? 0) + 1);
  }

  while (numToFreq.size > 0) {
    const leftNums = [...numToFreq.keys()];
    for (const num of leftNums) {
      if ((nextNeededNum.get(num) ?? 0) > 0) {
        decreaseOrDeleteFromMap(numToFreq, num);
        decreaseOrDeleteFromMap(nextNeededNum, num);

        nextNeededNum.set(num + 1, (nextNeededNum.get(num + 1) ?? 0) + 1);
        break;
      } else if (
        (numToFreq.get(num + 1) ?? 0) > 0 &&
        (numToFreq.get(num + 2) ?? 0) > 0
      ) {
        decreaseOrDeleteFromMap(numToFreq, num);
        decreaseOrDeleteFromMap(numToFreq, num + 1);
        decreaseOrDeleteFromMap(numToFreq, num + 2);

        nextNeededNum.set(num + 3, (nextNeededNum.get(num + 3) ?? 0) + 1);
        break;
      } else {
        return false;
      }
    }
  }
  return true;
};

function decreaseOrDeleteFromMap(map, key) {
  map.set(key, map.get(key) - 1);
  if (map.get(key) === 0) {
    map.delete(key);
  }
}
// @lc code=end
