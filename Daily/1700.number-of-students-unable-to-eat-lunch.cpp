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
    queue<int> studentQueue;
    for (auto& student : students) {
      sandwichStudentAmount[0] += 1 - student;
      sandwichStudentAmount[1] += student;
      studentQueue.push(student);
    }

    for (int i = 0; i < sandwiches.size(); i++) {
      const int& sandwichType = sandwiches[i];
      if (sandwichStudentAmount[sandwichType] == 0) {
        return sandwichStudentAmount[1 - sandwichType];
      }

      int sandwichStudent = studentQueue.front();
      studentQueue.pop();
      if (sandwichStudent != sandwichType) {
        studentQueue.push(sandwichStudent);
        i--;
      } else {
        sandwichStudentAmount[sandwichStudent]--;
      }
    }
    return 0;
  }
};
// @lc code=end

int main() {
  Solution sol;
  vector<int> students = {1, 1, 1, 0, 0, 1};
  vector<int> sandwiches = {1, 0, 0, 0, 1, 1};
  sol.countStudents(students, sandwiches);
}