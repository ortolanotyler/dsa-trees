const { BinaryTree, BinaryTreeNode } = require("./binary-tree");

let tinyTree, extensiveTree, voidTree;

beforeEach(() => {
  voidTree = new BinaryTree();

  // Construct a small binary tree
  const leftNodeSmall = new BinaryTreeNode(5);
  const rightNodeSmall = new BinaryTreeNode(5);
  const rootNodeSmall = new BinaryTreeNode(6, leftNodeSmall, rightNodeSmall);
  tinyTree = new BinaryTree(rootNodeSmall);

  // Construct a larger binary tree
  const nodeA = new BinaryTreeNode(1);
  const nodeB = new BinaryTreeNode(1);
  const nodeC = new BinaryTreeNode(2);
  const nodeD = new BinaryTreeNode(3, nodeC, nodeA);
  const nodeE = new BinaryTreeNode(5, nodeD, nodeB);
  const nodeF = new BinaryTreeNode(5);
  const mainRoot = new BinaryTreeNode(6, nodeF, nodeE);
  extensiveTree = new BinaryTree(mainRoot);
});

describe("Binary Tree Minimum Depth", () => {
  test("on smaller trees", () => {
    expect(tinyTree.minDepth()).toBe(2);
  });

  test("on more complex trees", () => {
    expect(extensiveTree.minDepth()).toBe(2);
  });

  test("on empty trees", () => {
    expect(voidTree.minDepth()).toBe(0);
  });
});

describe("Binary Tree Maximum Depth", () => {
  test("on smaller trees", () => {
    expect(tinyTree.maxDepth()).toBe(2);
  });

  test("on larger trees", () => {
    expect(extensiveTree.maxDepth()).toBe(4);
  });

  test("on empty trees", () => {
    expect(voidTree.maxDepth()).toBe(0);
  });
});

describe("Binary Tree Maximum Sum", () => {
  test("on simple trees", () => {
    expect(tinyTree.maxSum()).toBe(16);
  });

  test("on empty trees", () => {
    expect(voidTree.maxSum()).toBe(0);
  });

  test("on more extensive trees", () => {
    expect(extensiveTree.maxSum()).toBe(21);
  });

  test("including negative values", () => {
    const nodes = [
      new BinaryTreeNode(100),
      new BinaryTreeNode(8),
      new BinaryTreeNode(-4),
      new BinaryTreeNode(2, nodes[2]),
      new BinaryTreeNode(-3, nodes[1], nodes[0]),
      new BinaryTreeNode(10, nodes[3], nodes[4])
    ];
    const newTree = new BinaryTree(nodes[5]);

    expect(newTree.maxSum()).toBe(109);
  });
});

describe("Binary Tree Next Larger Value", () => {
  test("in simple trees", () => {
    expect(tinyTree.nextLarger(4)).toBe(5);
    expect(tinyTree.nextLarger(5)).toBe(6);
    expect(tinyTree.nextLarger(6)).toBe(null);
  });

  test("in empty trees", () => {
    expect(voidTree.nextLarger(0)).toBe(null);
  });

  test("in more complex trees", () => {
    expect(extensiveTree.nextLarger(1)).toBe(2);
    expect(extensiveTree.nextLarger(2)).toBe(3);
    expect(extensiveTree.nextLarger(3)).toBe(5);
    expect(extensiveTree.nextLarger(4)).toBe(5);
    expect(extensiveTree.nextLarger(5)).toBe(6);
    expect(extensiveTree.nextLarger(6)).toBe(null);
  });
});

describe("Binary Tree Cousin Nodes", () => {
  test("determines if nodes are cousins", () => {
    const nodes = [
      new BinaryTreeNode(7),
      new BinaryTreeNode(6),
      new BinaryTreeNode(5),
      new BinaryTreeNode(4),
      new BinaryTreeNode(3, nodes[1], nodes[0]),
      new BinaryTreeNode(2, nodes[3], nodes[2]),
      new BinaryTreeNode(1, nodes[5], nodes[4])
    ];
    const cousinTree = new BinaryTree(nodes[6]);

    expect(cousinTree.areCousins(nodes[3], nodes[1])).toBe(true);
    expect(cousinTree.areCousins(nodes[3], nodes[0])).toBe(true);
    expect(cousinTree.areCousins(nodes[2], nodes[1])).toBe(true);
    expect(cousinTree.areCousins(nodes[2], nodes[0])).toBe(true);
    expect(cousinTree.areCousins(nodes[5], nodes[4])).toBe(false);
    expect(cousinTree.areCousins(nodes[3], nodes[2])).toBe(false);
    expect(cousinTree.areCousins(nodes[1], nodes[0])).toBe(false);
    expect(cousinTree.areCousins(nodes[3], nodes[4])).toBe(false);
    expect(cousinTree.areCousins(nodes[6], nodes[4])).toBe(false);
  });
});

describe("Binary Tree Serialization and Deserialization", () => {
  let aTree;

  beforeEach(() => {
    const rootNode = new BinaryTreeNode(1);
    rootNode.left = new BinaryTreeNode(2);
    rootNode.right = new BinaryTreeNode(3);
    rootNode.right.left = new BinaryTreeNode(4);
    rootNode.right.right = new BinaryTreeNode(5);

    aTree = new BinaryTree(rootNode);
  });

  test("serialization into strings", () => {
    expect(typeof BinaryTree.serialize(aTree)).toBe("string");
  });

  test("deserialization into BinaryTree objects", () => {
    const serializedTree = BinaryTree.serialize(aTree);
    const deserializedTree = BinaryTree.deserialize(serializedTree);
    expect(deserializedTree instanceof BinaryTree).toBe(true);
  });

  test("serialization and deserialization are reversible", () => {
    const serializedTree = BinaryTree.serialize(aTree);
    const deserializedTree = BinaryTree.deserialize(serializedTree);
    expect(deserializedTree).toEqual(aTree);
  });

  test("serialization is a pure function", () => {
    const treeCopy = new BinaryTree(new BinaryTreeNode(1, new BinaryTreeNode(2), new BinaryTreeNode(3, new BinaryTreeNode(4), new BinaryTreeNode(5))));
    const serializedTree = BinaryTree.serialize(aTree);
    BinaryTree.deserialize(serializedTree);

    expect(aTree).toEqual(treeCopy);
  });
});

describe("Binary Tree Lowest Common Ancestor", () => {
  test("finding the lowest common ancestor", () => {
    const rootNode = new BinaryTreeNode(3);
    const tree = new BinaryTree(rootNode);

    const leftSubtreeRoot = new BinaryTreeNode(5);
    rootNode.left = leftSubtreeRoot;

    const rightSubtreeRoot = new BinaryTreeNode(1);
    rootNode.right = rightSubtreeRoot;

    leftSubtreeRoot.left = new BinaryTreeNode(6);
    const leftRight = new BinaryTreeNode(2, new BinaryTreeNode(7), new BinaryTreeNode(4));
    leftSubtreeRoot.right = leftRight;

    rightSubtreeRoot.left = new BinaryTreeNode(0);
    rightSubtreeRoot.right = new BinaryTreeNode(8);

    expect(tree.lowestCommonAncestor(leftSubtreeRoot, rightSubtreeRoot)).toBe(rootNode);
    expect(tree.lowestCommonAncestor(leftRight, leftRight.left)).toBe(leftRight);
    expect(tree.lowestCommonAncestor(leftRight.left, leftSubtreeRoot.left)).toBe(leftSubtreeRoot);
    expect(tree.lowestCommonAncestor(rightSubtreeRoot.left, rightSubtreeRoot.right)).toBe(rightSubtreeRoot);
  });
});
