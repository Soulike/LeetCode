/*
 * @lc app=leetcode id=950 lang=cpp
 *
 * [950] Reveal Cards In Increasing Order
 */
#include <algorithm>
#include <queue>
#include <vector>

using std::queue;
using std::vector;

// @lc code=start
class Solution {
 public:
  vector<int> deckRevealedIncreasing(vector<int>& deck) {
    const size_t deckLength = deck.size();
    queue<int> indexes;
    for (int i = 0; i < deckLength; i++) {
      indexes.push(i);
    }

    // The map of sorted deck index => reveal order index
    vector<int> revealIncreasingOrderIndexes;

    // Simulate the revealing process
    for (int i = 0; i < deckLength; i++) {
      revealIncreasingOrderIndexes.push_back(indexes.front());
      indexes.pop();
      indexes.push(indexes.front());
      indexes.pop();
    }

    std::sort(deck.begin(), deck.end());
    vector<int> result(deck.size());
    for (int i = 0; i < deckLength; i++) {
      result[revealIncreasingOrderIndexes[i]] = deck[i];
    }

    return result;
  }
};
// @lc code=end
