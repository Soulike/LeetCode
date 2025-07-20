/*
 * @lc app=leetcode id=1948 lang=cpp
 *
 * [1948] Delete Duplicate Folders in System
 */

#include <algorithm>
#include <memory>
#include <string>
#include <unordered_map>
#include <unordered_set>
#include <utility>
#include <vector>

// @lc code=start
template <typename T>
class Node {
 public:
  explicit Node(T value) : value_(std::move(value)) {}

  [[nodiscard]] const T& GetValue() const { return value_; }

  void AddChild(std::unique_ptr<Node> child) {
    if (value_to_child_.contains(child->value_)) {
      return;
    }
    children_raw_ptrs_.push_back(child.get());
    value_to_child_[child->value_] = child.get();
    children_.push_back(std::move(child));
  }

  [[nodiscard]] Node* GetChildRawPtrWithValue(const T& value) const {
    if (value_to_child_.contains(value)) {
      return value_to_child_.at(value);
    }
    return nullptr;
  }

  [[nodiscard]] const auto& GetChildrenRawPtrs() const {
    return children_raw_ptrs_;
  }

 private:
  T value_;
  std::vector<std::unique_ptr<Node>> children_;
  std::vector<Node*> children_raw_ptrs_;
  std::unordered_map<T, Node*> value_to_child_;
};

class Solution {
 public:
  std::vector<std::vector<std::string>> deleteDuplicateFolder(
      const std::vector<std::vector<std::string>>& paths) {
    auto root = std::make_unique<Node<std::string>>("");

    for (const auto& path : paths) {
      Node<std::string>* current_node_raw_ptr = root.get();
      for (const auto& path_component : path) {
        Node<std::string>* child_node_with_path_component_raw_ptr =
            current_node_raw_ptr->GetChildRawPtrWithValue(path_component);
        if (child_node_with_path_component_raw_ptr) {
          current_node_raw_ptr = child_node_with_path_component_raw_ptr;
        } else {
          auto new_child_node =
              std::make_unique<Node<std::string>>(path_component);
          auto new_child_node_raw_ptr = new_child_node.get();
          current_node_raw_ptr->AddChild(std::move(new_child_node));
          current_node_raw_ptr = new_child_node_raw_ptr;
        }
      }
    }

    const std::unordered_map<Serialization, size_t>
        sub_tree_serialization_to_counts =
            GetSubTreeSerializationCounts(root.get());
    std::unordered_set<const Node<std::string>*> deleted_nodes;
    for (const auto root_child : root->GetChildrenRawPtrs()) {
      CheckNodeDeletionRecursive(root_child, sub_tree_serialization_to_counts,
                                 deleted_nodes);
    }

    std::vector<std::vector<std::string>> result_paths;
    std::vector<std::string> current_path;
    PreorderTraversalWithDeletedNodes(root.get(), result_paths, current_path,
                                      deleted_nodes);

    return result_paths;
  }

 private:
  using Serialization = std::string;

  static std::unordered_map<Serialization, size_t>
  GetSubTreeSerializationCounts(const Node<std::string>* root) {
    std::unordered_map<std::string, size_t> serialization_to_counts;
    GetSubTreeSerializationCountsRecursive(root, serialization_to_counts);
    return serialization_to_counts;
  }

  static Serialization GetSubTreeSerializationCountsRecursive(
      const Node<std::string>* root,
      std::unordered_map<std::string, size_t>& serialization_to_counts) {
    Serialization children_serialization;
    const auto& children = root->GetChildrenRawPtrs();
    if (!children.empty()) {
      std::vector<std::string> child_serializations;
      for (const Node<std::string>* child : children) {
        const std::string child_serialization =
            GetSubTreeSerializationCountsRecursive(child,
                                                   serialization_to_counts);
        child_serializations.push_back(child_serialization);
      }
      std::ranges::sort(child_serializations);
      for (const auto& child_serialization : child_serializations) {
        children_serialization += child_serialization;
      }
      serialization_to_counts[children_serialization]++;
    }
    return root->GetValue() + "(" + children_serialization + ")";
  }

  /**
   * check if the serialization of root's children exists. If exists, mark root
   * as deleted.
   * @return The preorder traversal result of root.
   */
  static Serialization CheckNodeDeletionRecursive(
      const Node<std::string>* root,
      const std::unordered_map<std::string, size_t>& serialization_to_counts,
      std::unordered_set<const Node<std::string>*>& deleted_nodes) {
    Serialization children_serialization;

    const auto& children = root->GetChildrenRawPtrs();
    if (!children.empty()) {
      std::vector<std::string> child_serializations;
      for (const Node<std::string>* child : children) {
        const std::string child_serialization = CheckNodeDeletionRecursive(
            child, serialization_to_counts, deleted_nodes);
        child_serializations.push_back(child_serialization);
      }
      std::ranges::sort(child_serializations);
      for (const auto& child_serialization : child_serializations) {
        children_serialization += child_serialization;
      }
      if (serialization_to_counts.at(children_serialization) > 1) {
        deleted_nodes.insert(root);
      }
    }

    return root->GetValue() + "(" + children_serialization + ")";
  }

  static void PreorderTraversalWithDeletedNodes(
      const Node<std::string>* root,
      std::vector<std::vector<std::string>>& result_paths,
      std::vector<std::string>& current_path,
      const std::unordered_set<const Node<std::string>*>& deleted_nodes) {
    if (deleted_nodes.contains(root)) {
      return;
    }

    if (!root->GetValue().empty()) {
      current_path.push_back(root->GetValue());
      result_paths.push_back(current_path);
    }

    for (const auto child : root->GetChildrenRawPtrs()) {
      PreorderTraversalWithDeletedNodes(child, result_paths, current_path,
                                        deleted_nodes);
    }

    if (!root->GetValue().empty()) {
      current_path.pop_back();
    }
  }
};
// @lc code=end

int main() {
  Solution sol;
  sol.deleteDuplicateFolder({{"a"},
                             {"a", "c"},
                             {"a", "c", "b"},
                             {"a", "w"},
                             {"a", "w", "y"},
                             {"z", "c"},
                             {"z", "c", "b"},
                             {"z", "c", "w"},
                             {"z", "c", "w", "y"},
                             {"z"}});
}
