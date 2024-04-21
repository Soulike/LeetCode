/*
 * @lc app=leetcode id=721 lang=javascript
 *
 * [721] Accounts Merge
 */

// @lc code=start
/**
 * @param {string[][]} accounts
 * @return {string[][]}
 */
const accountsMerge = function (accounts) {
  /** @type {Map<number, string>} */
  const rootIndexToName = new Map();
  /** @type {number[]} */
  const parentIndex = [];
  /** @type {Map<string, number>} */
  const emailToIndex = new Map();

  /** @type {Map<number, number>} */
  const rootCache = new Map();

  let lastIndex = 0;

  for (const [name, ...emails] of accounts) {
    for (const email of emails) {
      if (!emailToIndex.has(email)) {
        emailToIndex.set(email, lastIndex++);
        // 设置自己是根
        parentIndex[lastIndex - 1] = lastIndex - 1;
      }
    }
    const lastEmailIndex = emailToIndex.get(emails[emails.length - 1]);

    for (const email of emails) {
      union(emailToIndex.get(email), lastEmailIndex, parentIndex, rootCache);
    }

    rootIndexToName.set(find(lastEmailIndex, parentIndex, rootCache), name);
  }

  /** @type {Map<number, string[]>} */
  const rootIndexToEmails = new Map();

  for (const [email, index] of emailToIndex) {
    const rootIndex = find(index, parentIndex, rootCache);
    const emails = rootIndexToEmails.get(rootIndex) ?? [];
    emails.push(email);
    rootIndexToEmails.set(rootIndex, emails);
  }

  /** @type {string[][]} */
  const result = [];

  for (const [rootIndex, emails] of rootIndexToEmails) {
    const name = rootIndexToName.get(rootIndex);
    emails.sort();
    result.push([name, ...emails]);
  }

  return result;
};

/**
 * @param {number} index
 * @param {number[]} parentIndex
 * @param {Map<number, number>} rootCache
 * @returns {number}
 */
function find(index, parentIndex, rootCache) {
  let currentIndex = rootCache.get(index);
  if (currentIndex === undefined) {
    currentIndex = index;
  }
  while (true) {
    if (parentIndex[currentIndex] === currentIndex) {
      rootCache.set(index, currentIndex);
      return currentIndex;
    } else {
      currentIndex = parentIndex[currentIndex];
    }
  }
}

/**
 *
 * @param {number} fromIndex
 * @param {number} toIndex
 * @param {Map<number, number>} rootCache
 * @param {number[]} parentIndex
 */
function union(fromIndex, toIndex, parentIndex, rootCache) {
  const rootIndexOfFromIndex = find(fromIndex, parentIndex, rootCache);
  const rootIndexOfToIndex = find(toIndex, parentIndex, rootCache);
  parentIndex[rootIndexOfFromIndex] = parentIndex[rootIndexOfToIndex];
}
// @lc code=end
