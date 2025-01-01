/*
 * @lc app=leetcode id=165 lang=cpp
 *
 * [165] Compare Version Numbers
 */

#include <cmath>
#include <string>
#include <vector>

using std::string;
using std::vector;

// @lc code=start
class Solution {
 public:
  int compareVersion(string version1, string version2) {
    vector<int> version1Revisions;

    int version1DotIndex = -1;
    for (int i = 0; i <= version1.size(); i++) {
      if (i == version1.size() || version1[i] == '.') {
        string revisionString =
            version1.substr(version1DotIndex + 1, i - version1DotIndex - 1);
        version1Revisions.push_back(std::stoi(revisionString));
        version1DotIndex = i;
      }
    }

    vector<int> version2Revisions;
    int version2DotIndex = -1;
    for (int i = 0; i <= version2.size(); i++) {
      if (i == version2.size() || version2[i] == '.') {
        string revisionString =
            version2.substr(version2DotIndex + 1, i - version2DotIndex - 1);
        version2Revisions.push_back(std::stoi(revisionString));
        version2DotIndex = i;
      }
    }

    const int revisionCount =
        std::max(version1Revisions.size(), version2Revisions.size());
    for (int i = 0; i < revisionCount; i++) {
      int version1Revision = 0;
      if (i < version1Revisions.size()) {
        version1Revision = version1Revisions[i];
      }

      int version2Revision = 0;
      if (i < version2Revisions.size()) {
        version2Revision = version2Revisions[i];
      }

      if (version1Revision < version2Revision) {
        return -1;
      } else if (version1Revision > version2Revision) {
        return 1;
      }
    }

    return 0;
  }
};
// @lc code=end

int main() {
  Solution sol;
  sol.compareVersion("1.0", "1.0.0");
}