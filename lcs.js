// Define a class for the tree node
class Node {
  constructor(value) {
    this.value = value;
    this.leftChild = null;
    this.rightChild = null;
  }
}

/**
 * Function to find the lowest common ancestor in a binary tree.
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
function findLowestCommonAncestor(node, firstNode, secondNode) {
  // Return null if the current node is null
  if (!node) return null;

  // Return the current node if it matches either of the two nodes
  if (node === firstNode || node === secondNode) return node;

  // Recurse on left and right subtrees
  const leftSearch = findLowestCommonAncestor(node.leftChild, firstNode, secondNode);
  const rightSearch = findLowestCommonAncestor(node.rightChild, firstNode, secondNode);

  // If both searches yield results, the current node is the lowest common ancestor
  if (leftSearch && rightSearch) return node;

  // Otherwise, return the non-null result of the searches, or null if both are null
  return leftSearch || rightSearch;
}

/**
 * Simplified version of the lowest common ancestor function.
 */
function findLCACompact(node, firstNode, secondNode) {
  if (!node || node === firstNode || node === secondNode) return node;
  let left = findLCACompact(node.leftChild, firstNode, secondNode);
  let right = findLCACompact(node.rightChild, firstNode, secondNode);
  return left && right ? node : left || right;
}

module.exports = { Node, findLowestCommonAncestor: findLCACompact };
