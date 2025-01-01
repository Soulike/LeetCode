/*
 * @lc app=leetcode id=752 lang=cpp
 *
 * [752] Open the Lock
 */
#include <queue>
#include <string>
#include <unordered_set>
#include <utility>
#include <vector>

using std::pair;
using std::queue;
using std::string;
using std::unordered_set;
using std::vector;

// @lc code=start
class Solution {
 public:
  int openLock(vector<string>& deadEnds, string target) {
    unordered_set<string> visited(deadEnds.cbegin(), deadEnds.cend());

    using lock_pair = pair<string, int>;

    queue<lock_pair> queue;
    queue.push(lock_pair("0000", 0));
    if (visited.count("0000") != 0) {
      return -1;
    }
    visited.insert("0000");

    while (!queue.empty()) {
      const lock_pair top = queue.front();
      queue.pop();

      const string& topSlots = top.first;
      const int& steps = top.second;

      if (topSlots == target) {
        return steps;
      }

      for (int i = 0; i < topSlots.size(); i++) {
        string nextSlot = topSlots;
        nextSlot[i] = nextSlot[i] == '0' ? '9' : nextSlot[i] - 1;
        if (!visited.count(nextSlot)) {
          visited.insert(nextSlot);
          queue.push(lock_pair(nextSlot, steps + 1));
        }

        nextSlot = topSlots;
        nextSlot[i] = nextSlot[i] == '9' ? '0' : nextSlot[i] + 1;
        if (!visited.count(nextSlot)) {
          visited.insert(nextSlot);
          queue.push(lock_pair(nextSlot, steps + 1));
        }
      }
    }

    return -1;
  }
};
// @lc code=end

int main() {
  vector<string> vec = {"0201", "0101", "0102", "1212", "2002"};
  Solution sol;
  sol.openLock(vec, "0202");
}