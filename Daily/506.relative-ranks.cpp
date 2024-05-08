/*
 * @lc app=leetcode id=506 lang=cpp
 *
 * [506] Relative Ranks
 */

#include <queue>
#include <string>
#include <utility>
#include <vector>

using std::pair;
using std::priority_queue;
using std::string;
using std::vector;

// @lc code=start
class Solution {
 public:
  vector<string> findRelativeRanks(vector<int>& score) {
    const auto compare = [](const pair<int, int>& pair1,
                            const pair<int, int>& pair2) {
      return pair1.first < pair2.first;
    };
    priority_queue<pair<int, int>, vector<pair<int, int>>, decltype(compare)>
        pq(compare);

    for (int i = 0; i < score.size(); i++) {
      pq.push({score[i], i});
    }

    string medals[3] = {"Gold Medal", "Silver Medal", "Bronze Medal"};

    vector<string> result(score.size());
    for (int rank = 1; !pq.empty(); rank++) {
      int index = pq.top().second;
      if (rank <= 3) {
        result[index] = medals[rank - 1];
      } else {
        result[index] = std::to_string(rank);
      }
      pq.pop();
    }

    return result;
  }
};
// @lc code=end

int main() {
  Solution sol;
  vector<int> vec = {5, 4, 3, 2, 1};
  sol.findRelativeRanks(vec);
}