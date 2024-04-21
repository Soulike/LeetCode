/*
 * @lc app=leetcode id=1452 lang=javascript
 *
 * [1452] People Whose List of Favorite Companies Is Not a Subset of Another List
 */

// @lc code=start
/**
 * @param {string[][]} favoriteCompanies
 * @return {number[]}
 */
var peopleIndexes = function (favoriteCompanies) {
  const favoriteCompaniesSets = favoriteCompanies.map(
    (companies) => new Set(companies),
  );

  const result = [];
  const excluded = new Set();

  for (let i = 0; i < favoriteCompaniesSets.length; i++) {
    if (!excluded.has(i)) {
      for (let j = 0; j < favoriteCompaniesSets.length; j++) {
        if (i !== j && !excluded.has(j)) {
          if (isSubset(favoriteCompaniesSets[i], favoriteCompaniesSets[j])) {
            excluded.add(j);
          } else if (
            isSubset(favoriteCompaniesSets[j], favoriteCompaniesSets[i])
          ) {
            excluded.add(i);
          }
        }
      }
      if (!excluded.has(i)) {
        result.push(i);
      }
    }
  }

  return result;
};

function isSubset(set, subset) {
  if (subset.size > set.size) {
    return false;
  }

  for (const ele of subset) {
    if (!set.has(ele)) {
      return false;
    }
  }

  return true;
}
// @lc code=end
