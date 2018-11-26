export default (xmlNode, name) => xmlNode.find(node => node.node.name === name) || { node: {} };
