export const distance1and2 = (node1, node2) => {
    return Math.sqrt(Math.pow(node1.x - node2.x, 2) + Math.pow(node1.y - node2.y, 2));
};