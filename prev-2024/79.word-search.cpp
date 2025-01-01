/*
 * @lc app=leetcode id=79 lang=cpp
 *
 * [79] Word Search
 */
#include <string>
#include <vector>

using std::string;
using std::vector;

// @lc code=start
class Solution {
 public:
  bool exist(vector<vector<char>>& board, const string& word) {
    for (int i = 0; i < board.size(); i++) {
      for (int j = 0; j < board[0].size(); j++) {
        bool result = this->recursive(board, i, j, word, 0);
        if (result) {
          return true;
        }
      }
    }
    return false;
  }

 private:
  bool recursive(vector<vector<char>>& board,
                 int x,
                 int y,
                 const string& word,
                 int wordStart) {
    if (wordStart == word.length()) {
      return true;
    }

    if (x < 0 || x > board.size() - 1 || y < 0 || y > board[0].size() - 1 ||
        word[wordStart] != board[x][y]) {
      return false;
    } else {
      board[x][y] = '\0';
      bool result = recursive(board, x + 1, y, word, wordStart + 1) ||
                    recursive(board, x - 1, y, word, wordStart + 1) ||
                    recursive(board, x, y + 1, word, wordStart + 1) ||
                    recursive(board, x, y - 1, word, wordStart + 1);
      board[x][y] = word[wordStart];
      return result;
    }
  }
};
// @lc code=end

int main() {
  Solution sol;
  vector<vector<char>> vec = {
      {'A', 'B', 'C', 'E'},
      {'S', 'F', 'C', 'S'},
      {'A', 'D', 'E', 'E'},
  };
  sol.exist(vec, "ABCB");
}