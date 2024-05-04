/*
 * @lc app=leetcode id=881 lang=cpp
 *
 * [881] Boats to Save People
 */

#include <algorithm>
#include <vector>

using std::vector;

// @lc code=start
class Solution {
 public:
  int numRescueBoats(vector<int>& people, int limit) {
    int left = 0;
    int right = people.size() - 1;
    std::sort(people.begin(), people.end(),
              [](int p1, int p2) { return p1 > p2; });
    int boatNumber = 0;
    while (left <= right) {
      if (left != right && people[left] + people[right] <= limit) {
        left++;
        right--;
      } else {
        left++;
      }
      boatNumber++;
    }

    return boatNumber;
  }
};
// @lc code=end

int main() {
  Solution sol;
  vector<int> vec = {3, 2, 2, 1};
  sol.numRescueBoats(vec, 3);
}
