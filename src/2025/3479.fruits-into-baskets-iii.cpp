/*
 * @lc app=leetcode id=3479 lang=cpp
 *
 * [3479] Fruits Into Baskets III
 */

#include <memory>
#include <optional>
#include <vector>

// @lc code=start
template <typename ElementT>
class SegmentTree {
 public:
  explicit SegmentTree(const std::vector<ElementT>& elements) {
    if (elements.empty()) {
      return;
    }
    root_ = std::make_unique<Node>(
        typename Node::IndexRange(0, elements.size() - 1), elements);
  }

  std::optional<size_t> FindFirstElementGreaterThan(const ElementT& element) {
    if (!root_) {
      return std::nullopt;
    }
    return root_->FindFirstElementGreaterEqualThan(element);
  }

  void UpdateElement(const size_t index, const ElementT& element) {
    if (!root_) {
      return;
    }
    root_->UpdateElement(index, element);
  }

 private:
  class Node {
   public:
    struct IndexRange {
      size_t begin;
      size_t end;  // Included
    };
    struct ValueRange {
      ElementT min;
      ElementT max;
    };

    Node(const IndexRange& index_range, const std::vector<ElementT>& elements)
        : index_range_(index_range) {
      Build(elements);
    }

    [[nodiscard]] std::optional<size_t> FindFirstElementGreaterEqualThan(
        const ElementT& element) const {
      if (value_range_.max < element) {
        return std::nullopt;
      }

      if (IsValueNode()) {
        return index_range_.begin;
      }

      const ValueRange& left_child_value_range = left_child_->GetValueRange();
      if (left_child_value_range.max >= element) {
        return left_child_->FindFirstElementGreaterEqualThan(element);
      }

      const ValueRange& right_child_value_range = right_child_->GetValueRange();
      if (right_child_value_range.max >= element) {
        return right_child_->FindFirstElementGreaterEqualThan(element);
      }

      return std::nullopt;
    }

    void UpdateElement(const size_t index, const ElementT& element) {
      if (IsValueNode()) {
        value_range_.min = value_range_.max = element;
        return;
      }

      if (left_child_->IsInIndexRange(index)) {
        left_child_->UpdateElement(index, element);
      } else if (right_child_->IsInIndexRange(index)) {
        right_child_->UpdateElement(index, element);
      }

      UpdateValueRange();
    }

   private:
    void Build(const std::vector<ElementT>& elements) {
      const auto& [begin_, end_] = index_range_;
      if (begin_ < end_) [[likely]] {
        const size_t mid = (end_ - begin_) / 2 + begin_;
        left_child_ = std::make_unique<Node>(IndexRange(begin_, mid), elements);
        right_child_ =
            std::make_unique<Node>(IndexRange(mid + 1, end_), elements);

        UpdateValueRange();
      } else if (begin_ == end_) {
        left_child_.reset();
        right_child_.reset();
        value_range_ = {elements[begin_], elements[begin_]};
      }
    }

    void UpdateValueRange() {
      const ValueRange& left_child_value_range = left_child_->GetValueRange();
      const ValueRange& right_child_value_range = right_child_->GetValueRange();
      value_range_ = {
          std::min(left_child_value_range.min, right_child_value_range.min),
          std::max(left_child_value_range.max, right_child_value_range.max)};
    }

    [[nodiscard]] const IndexRange& GetIndexRange() const {
      return index_range_;
    }

    [[nodiscard]] bool IsInIndexRange(const size_t index) const {
      return index_range_.begin <= index && index <= index_range_.end;
    }

    [[nodiscard]] const ValueRange& GetValueRange() const {
      return value_range_;
    }

    [[nodiscard]] bool IsInValueRange(const ElementT& element) const {
      return value_range_.min <= element && element <= value_range_.max;
    }

    [[nodiscard]] bool IsValueNode() const {
      return index_range_.begin == index_range_.end;
    }

   private:
    const IndexRange index_range_;
    ValueRange value_range_;

    std::unique_ptr<Node> left_child_ = nullptr;
    std::unique_ptr<Node> right_child_ = nullptr;
  };

 private:
  std::unique_ptr<Node> root_;
};

class Solution {
 public:
  int numOfUnplacedFruits(const std::vector<int>& fruits,
                          const std::vector<int>& baskets) {
    SegmentTree<int> segment_tree(baskets);

    int unplaced_count = 0;
    for (const int fruit : fruits) {
      const std::optional<size_t> basket_index =
          segment_tree.FindFirstElementGreaterThan(fruit);
      if (!basket_index) {
        unplaced_count++;
        continue;
      }

      segment_tree.UpdateElement(basket_index.value(), 0);
    }

    return unplaced_count;
  }
};
// @lc code=end
