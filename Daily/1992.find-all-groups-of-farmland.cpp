/*
 * @lc app=leetcode id=1992 lang=cpp
 *
 * [1992] Find All Groups of Farmland
 */
#include <array>
#include <memory>
#include <vector>

using std::array;
using std::vector;

// @lc code=start
class Solution {
 public:
  vector<vector<int>> findFarmland(vector<vector<int>>& land) {
    const int M = land.size();
    const int N = land[0].size();

    vector<vector<int>> coordinates;

    for (int i = 0; i < M; i++) {
      for (int j = 0; j < N; j++) {
        if (land[i][j] == 1) {
          vector<int> coordinate = getCoordinate(land, i, j);
          coordinates.push_back(coordinate);
          removeFarmland(land, coordinate);
        }
      }
    }

    return coordinates;
  }

  inline vector<int> getCoordinate(const vector<vector<int>>& land,
                                   int x,
                                   int y) {
    vector<int> coordinate = {x, y, x, y};
    while (coordinate[0] - 1 >= 0 &&
           land[coordinate[0] - 1][coordinate[1]] == 1) {
      coordinate[0]--;
    }
    while (coordinate[1] - 1 >= 0 &&
           land[coordinate[0]][coordinate[1] - 1] == 1) {
      coordinate[1]--;
    }
    while (coordinate[2] + 1 < land.size() &&
           land[coordinate[2] + 1][coordinate[3]] == 1) {
      coordinate[2]++;
    }
    while (coordinate[3] + 1 < land[0].size() &&
           land[coordinate[2]][coordinate[3] + 1] == 1) {
      coordinate[3]++;
    }

    return coordinate;
  }

  inline void removeFarmland(vector<vector<int>>& land,
                             const vector<int>& coordinate) {
    for (int i = coordinate[0]; i <= coordinate[2]; i++) {
      for (int j = coordinate[1]; j <= coordinate[3]; j++) {
        land[i][j] = 0;
      }
    }
  }
};
// @lc code=end
