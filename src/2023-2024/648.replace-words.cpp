/*
 * @lc app=leetcode id=648 lang=cpp
 *
 * [648] Replace Words
 */
#include <memory>
#include <numeric>
#include <string>
#include <unordered_map>
#include <vector>

using std::string;
using std::unique_ptr;
using std::unordered_map;
using std::vector;

// @lc code=start
class prefix_search_tree {
 private:
  class node_type {
   private:
    const char _character;
    bool _is_end;
    unordered_map<char, node_type*> character_to_childs;

   public:
    node_type(char character, bool is_end)
        : _character(character), _is_end(is_end) {}
    ~node_type() {
      for (auto& character_to_child : character_to_childs) {
        delete character_to_child.second;
      }
    }

    void append_child(char character, bool isEnd) {
      node_type* new_child = new node_type(character, isEnd);
      character_to_childs.insert({character, new_child});
    }

    bool match(char character) const { return _character == character; }
    bool is_end() const { return _is_end; }
    void set_is_end() { _is_end = true; }
    node_type* find_child(char character) const {
      if (character_to_childs.count(character)) {
        return character_to_childs.at(character);
      } else {
        return nullptr;
      }
    }
  };

  node_type* const root;

 public:
  prefix_search_tree() : root(new node_type('\0', false)) {}
  ~prefix_search_tree() { delete root; }

  void insert_word(const string& word) {
    auto current_node = root;
    for (int i = 0; i < word.size(); i++) {
      auto child_node = current_node->find_child(word[i]);
      if (!child_node) {
        current_node->append_child(word[i], i == word.size() - 1);
        child_node = current_node->find_child(word[i]);
      }
      current_node = child_node;
    }

    current_node->set_is_end();
  }

  bool search_word(const string& word) const {
    auto current_node = root;
    for (int i = 0; i < word.size(); i++) {
      auto child_node = current_node->find_child(word[i]);
      if (!child_node) {
        return false;
      }
      current_node = child_node;
    }

    return current_node->is_end();
  }

  string get_shortest_match_prefix(const string& word) const {
    auto current_node = root;
    for (int i = 0; i < word.size(); i++) {
      if (current_node->is_end()) {
        return word.substr(0, i);
      }
      auto child_node = current_node->find_child(word[i]);
      if (!child_node) {
        return "";
      }
      current_node = child_node;
    }

    return current_node->is_end() ? word : "";
  }
};

class Solution {
 public:
  string replaceWords(vector<string>& dictionary, string& sentence) {
    prefix_search_tree search_tree;
    for (const auto& root : dictionary) {
      search_tree.insert_word(root);
    }

    vector<string> words;
    int left = 0;
    int right = 0;

    while (left < sentence.size()) {
      while (right < sentence.size() && sentence[right] != ' ') {
        right++;
      }
      string word =
          sentence.substr(left, right - left);  // (right - 1) - left + 1
      string prefix = search_tree.get_shortest_match_prefix(word);
      if (!prefix.empty()) {
        words.push_back(prefix);
      } else {
        words.push_back(word);
      }

      left = right + 1;
      right = left;
    }

    string result;
    for (int i = 0; i < words.size(); i++) {
      result += words[i];
      if (i != words.size() - 1) {
        result += " ";
      }
    }
    return result;
  }
};
// @lc code=end

int main() {
  Solution sol;
  vector<string> dictionary = {"catt", "cat", "bat", "rat"};
  sol.replaceWords(dictionary, "the cattle was rattled by the battery");
}