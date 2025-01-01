/*
 * @lc app=leetcode id=886 lang=javascript
 *
 * [886] Possible Bipartition
 */

// @lc code=start
/**
 * @param {number} n
 * @param {number[][]} dislikes
 * @return {boolean}
 */
var possibleBipartition = function (n, dislikes) {
  const NO_GROUP = -1;
  const GROUP1 = 0;
  const GROUP2 = 1;

  /** @type {(-1|0|1)[]} */
  const peopleToGroup = new Array(n + 1);
  peopleToGroup.fill(NO_GROUP);

  /** @type {number[][]} */
  const peopleToDislikes = new Array(n + 1);
  for (let i = 0; i < peopleToDislikes.length; i++) {
    peopleToDislikes[i] = [];
  }

  for (const [a, b] of dislikes) {
    peopleToDislikes[a].push(b);
    peopleToDislikes[b].push(a);
  }

  /**
   * @param {number} people
   * @param {(-1|0|1)} group
   * @returns {boolean}
   */
  const draw = (people, group) => {
    const prevGroup = peopleToGroup[people];

    if (prevGroup === NO_GROUP) {
      peopleToGroup[people] = group;
      const dislikes = peopleToDislikes[people];
      const anotherGroup = group === GROUP1 ? GROUP2 : GROUP1;
      for (const dislike of dislikes) {
        const canDraw = draw(dislike, anotherGroup);
        if (!canDraw) return false;
      }
      return true;
    } else {
      return prevGroup === group;
    }
  };

  for (let i = 1; i <= n; i++) {
    const currentGroup = peopleToGroup[i];
    if (currentGroup === NO_GROUP) {
      const canDraw = draw(i, GROUP1);
      if (!canDraw) return false;
    }
  }

  return true;
};
// @lc code=end
