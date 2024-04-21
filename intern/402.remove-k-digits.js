/*
 * @lc app=leetcode id=402 lang=javascript
 *
 * [402] Remove K Digits
 */

// @lc code=start
/**
 * @param {string} num
 * @param {number} k
 * @return {string}
 */
var removeKdigits = function (num, k) {
  if (k >= num.length) {
    return '0';
  }

  /**
   * 从栈底到栈顶，不严格递增。
   * 栈底是高位，栈底是低位，我们需要让栈顶最小
   * */
  const monostack = [];

  let poppedCount = 0;

  for (const digit of num) {
    if (monostack.length === 0 || poppedCount === k) {
      monostack.push(digit);
    } else {
      let top = monostack[monostack.length - 1];
      while (top > digit) {
        monostack.pop();
        poppedCount++;
        if (poppedCount === k) {
          break;
        }
        top = monostack[monostack.length - 1];
      }
      monostack.push(digit);
    }
  }

  while (poppedCount < k) {
    // 可能数字就是不严格递增的
    monostack.pop();
    poppedCount++;
  }

  let firstNonZeroIndex = -1;
  for (let i = 0; i < monostack.length; i++) {
    if (monostack[i] !== '0') {
      firstNonZeroIndex = i;
      break;
    }
  }

  if (firstNonZeroIndex === -1) {
    return '0';
  } else {
    return monostack.slice(firstNonZeroIndex).join('');
  }
};
// @lc code=end
