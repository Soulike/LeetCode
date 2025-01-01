/*
 * @lc app=leetcode id=1700 lang=cpp
 *
 * [1700] Number of Students Unable to Eat Lunch
 */
#include <queue>
#include <vector>

using std::queue;
using std::vector;

// @lc code=start
class Solution {
 public:
  int countStudents(vector<int>& students, vector<int>& sandwiches) {
    int sandwichStudentAmount[2] = {0, 0};
    for (auto& student : students) {
      sandwichStudentAmount[0] += 1 - student;
      sandwichStudentAmount[1] += student;
    }

    for (auto& sandwich : sandwiches) {
      if (sandwichStudentAmount[sandwich] == 0) {
        return sandwichStudentAmount[1 - sandwich];
      }
      sandwichStudentAmount[sandwich]--;
    }
    return 0;
  }
};
// @lc code=end

int main() {
  Solution sol;
  vector<int> students = {1, 1, 1, 1};
  vector<int> sandwiches = {0, 0, 1, 1};
  sol.countStudents(students, sandwiches);
}