/*
 * @lc app=leetcode id=846 lang=cpp
 *
 * [846] Hand of Straights
 */

#include <algorithm>
#include <list>
#include <unordered_map>
#include <vector>

using std::list;
using std::unordered_map;
using std::vector;

// @lc code=start
class Solution {
 public:
  bool isNStraightHand(vector<int>& hand, int groupSize) {
    if (hand.size() % groupSize != 0) {
      return false;
    }
    if (groupSize == 1) {
      return true;
    }

    std::sort(hand.begin(), hand.end());
    unordered_map<int, list<std::size_t>> endNumberToGroupSizes;

    for (const int num : hand) {
      if (!endNumberToGroupSizes.count(num - 1)) {
        endNumberToGroupSizes[num].push_back(1);
      } else {
        auto& groupsEndWithPrevNum = endNumberToGroupSizes[num - 1];
        auto firstGroupSize = groupsEndWithPrevNum.front();
        firstGroupSize++;

        groupsEndWithPrevNum.pop_front();
        if (firstGroupSize < groupSize) {
          endNumberToGroupSizes[num].push_back(firstGroupSize);
        }
        if (groupsEndWithPrevNum.size() == 0) {
          endNumberToGroupSizes.erase(num - 1);
        }
      }
    }

    return endNumberToGroupSizes.size() == 0;
  }
};
// @lc code=end

int main() {
  Solution sol;
  vector<int> hand = {1, 2, 3};
  sol.isNStraightHand(hand, 3);
}