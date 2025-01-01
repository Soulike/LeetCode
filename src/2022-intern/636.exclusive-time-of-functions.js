/*
 * @lc app=leetcode id=636 lang=javascript
 *
 * [636] Exclusive Time of Functions
 */

// @lc code=start
/**
 * @param {number} n
 * @param {`${number}:${'start'}|${'end'}:${number}`[]} logs
 * @return {number[]}
 */
var exclusiveTime = function (n, logs) {
  /** @type {{id: number, timestamp: number}[]} */
  const callStack = [];
  const exclusiveTimes = new Array(n);
  exclusiveTimes.fill(0);

  for (const log of logs) {
    const [idStr, operation, timestampStr] = log.split(':');
    const id = Number.parseInt(idStr);
    const timestamp = Number.parseInt(timestampStr);
    if (operation === 'start') {
      callStack.push({id, timestamp});
    } // 'end'
    else {
      const startStackTrace = callStack.pop();
      const currentExclusiveTime = timestamp - startStackTrace.timestamp + 1;
      exclusiveTimes[id] += currentExclusiveTime;

      if (callStack.length > 0) {
        const parentStartStackTrace = callStack[callStack.length - 1];
        exclusiveTimes[parentStartStackTrace.id] -= currentExclusiveTime;
      }
    }
  }

  return exclusiveTimes;
};
// @lc code=end
