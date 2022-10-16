const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
 * Implement simple binary search tree according to task description
 * using Node from extensions
 */
class BinarySearchTree {
  constructor() {
    this.rootNode = null;
  }

  root() {
    return this.rootNode;
  }

  add(data) {
    const newNode = new Node(data);
    this.rootNode = addNode(this.rootNode, newNode);

    function addNode(node, newNode) {
      if (!node) return newNode;

      if (newNode.data < node.data) {
        node.left = addNode(node.left, newNode);
      }

      if (newNode.data > node.data) {
        node.right = addNode(node.right, newNode);
      }

      return node;
    }
  }

  has(data) {
    return !!this.find(data);
  }

  find(data) {
    return findNode(this.rootNode, data);

    function findNode(node, data) {
      if (!node) return null;

      if (data < node.data) return findNode(node.left, data);
      if (data > node.data) return findNode(node.right, data);

      return node;
    }
  }

  remove(data) {
    this.rootNode = removeNode(this.rootNode, data);

    function removeNode(node, data) {
      if (!node) return null;

      if (data < node.data) {
        node.left = removeNode(node.left, data);
      } else if (data > node.data) {
        node.right = removeNode(node.right, data);
      } else {
        if (!node.left && !node.right) return null;

        if (!node.left) {
          node = node.right;
          return node;
        }

        if (!node.right) {
          node = node.left;
          return node;
        }

        // if deleted node has left and right children swap nodes, then remove waste node
        let nextNode = node.right;
        while (nextNode.left) {
          nextNode = nextNode.left;
        }
        node.data = nextNode.data;
        node.right = removeNode(node.right, nextNode.data);
      }

      return node;
    }
  }

  min() {
    if (!this.rootNode) return null;

    let currentNode = this.rootNode;
    while (currentNode.left) {
      currentNode = currentNode.left;
    }

    return currentNode.data;
  }

  max() {
    if (!this.rootNode) return null;

    let currentNode = this.rootNode;
    while (currentNode.right) {
      currentNode = currentNode.right;
    }

    return currentNode.data;
  }
}

module.exports = {
  BinarySearchTree
};
