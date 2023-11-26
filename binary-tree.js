class Node {
  constructor(value, leftNode = null, rightNode = null) {
    this.value = value;
    this.left = leftNode;
    this.right = rightNode;
  }
}

class BinarySearchTree {
  constructor() {
    this.rootNode = null;
  }

  // Minimum depth calculation
  getMinDepth() {
    const calculateMinDepth = (node) => {
      if (!node) return 0;
      let leftDepth = calculateMinDepth(node.left);
      let rightDepth = calculateMinDepth(node.right);
      return 1 + (Math.min(leftDepth, rightDepth) || Math.max(leftDepth, rightDepth));
    };
    return calculateMinDepth(this.rootNode);
  }

  // Maximum depth calculation
  getMaxDepth() {
    const calculateMaxDepth = (node) => {
      if (!node) return 0;
      let leftDepth = calculateMaxDepth(node.left);
      let rightDepth = calculateMaxDepth(node.right);
      return 1 + Math.max(leftDepth, rightDepth);
    };
    return calculateMaxDepth(this.rootNode);
  }

  // Maximum sum calculation
  calculateMaxSum() {
    let maxSum = 0;
    const findMaxPathSum = (node) => {
      if (!node) return 0;
      let left = Math.max(findMaxPathSum(node.left), 0);
      let right = Math.max(findMaxPathSum(node.right), 0);
      maxSum = Math.max(maxSum, node.value + left + right);
      return node.value + Math.max(left, right);
    };
    findMaxPathSum(this.rootNode);
    return maxSum;
  }

  // Find the next larger value
  findNextLarger(value) {
    if (!this.rootNode) return null;
    let closestValue = null;
    const queue = [this.rootNode];
    while (queue.length > 0) {
      const current = queue.shift();
      if (current.value > value && (closestValue === null || current.value < closestValue)) {
        closestValue = current.value;
      }
      if (current.left) queue.push(current.left);
      if (current.right) queue.push(current.right);
    }
    return closestValue;
  }

  // Determine if two nodes are cousins
  checkCousins(node1, node2) {
    const findDepthAndParent = (node, target, level = 0) => {
      if (!node) return null;
      if (node.left === target || node.right === target) {
        return { level, parent: node };
      }
      let left = findDepthAndParent(node.left, target, level + 1);
      let right = findDepthAndParent(node.right, target, level + 1);
      return left || right;
    };

    let info1 = findDepthAndParent(this.rootNode, node1);
    let info2 = findDepthAndParent(this.rootNode, node2);
    return info1 && info2 && info1.level === info2.level && info1.parent !== info2.parent;
  }

  // Serialize the binary tree
  static treeToString(root) {
    let result = [];
    const traverse = (node) => {
      if (!node) {
        result.push("#");
        return;
      }
      result.push(node.value);
      traverse(node.left);
      traverse(node.right);
    };
    traverse(root);
    return result.join(" ");
  }

  // Deserialize the string to a binary tree
  static stringToTree(data) {
    const elements = data.split(" ");
    const build = () => {
      const val = elements.shift();
      if (val === "#") return null;
      let node = new Node(parseInt(val, 10));
      node.left = build();
      node.right = build();
      return node;
    };
    return new BinarySearchTree(build());
  }

  // Find the lowest common ancestor
  findLowestCommonAncestor(node1, node2) {
    const search = (current, n1, n2) => {
      if (!current) return null;
      if (current === n1 || current === n2) return current;

      let leftSearch = search(current.left, n1, n2);
      let rightSearch = search(current.right, n1, n2);

      if (leftSearch && rightSearch) return current;
      return leftSearch || rightSearch;
    };
    return search(this.rootNode, node1, node2);
  }
}

module.exports = { BinarySearchTree, Node };
