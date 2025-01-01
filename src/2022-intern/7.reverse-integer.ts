/*
 * @lc app=leetcode id=7 lang=typescript
 *
 * [7] Reverse Integer
 */

// @lc code=start
function reverse(x: number): number {
  const isPositiveNumber = x > 0;
  const signNumber = isPositiveNumber ? 1 : -1;
  const positiveNumber = Math.abs(x);
  const queue = numberToQueue(positiveNumber);
  return queueToReversedNumber(queue, isPositiveNumber) * signNumber;
}

function numberToQueue(x: number): number[] {
  const queue: number[] = [];
  let xCopy = x;
  let lastNumber = 0;
  while (xCopy !== 0) {
    lastNumber = xCopy % 10;
    xCopy = (xCopy - lastNumber) / 10;
    queue.push(lastNumber);
  }
  return queue;
}

function queueToReversedNumber(
  queue: number[],
  isPositiveNumber: boolean,
): number {
  const MAX_BEFORE_NEXT = (Math.pow(2, 31) - 1) / 10;
  const MIN_BEFORE_NEXT = Math.pow(2, 31) / 10;
  let reversedNumber = 0;
  while (queue.length !== 0) {
    if (
      (isPositiveNumber && reversedNumber > MAX_BEFORE_NEXT) ||
      (!isPositiveNumber && reversedNumber > MIN_BEFORE_NEXT)
    ) {
      return 0;
    }
    const nextNumber = queue.shift();
    if (nextNumber !== undefined) {
      reversedNumber = reversedNumber * 10 + nextNumber;
    }
  }
  return reversedNumber;
}
// @lc code=end
