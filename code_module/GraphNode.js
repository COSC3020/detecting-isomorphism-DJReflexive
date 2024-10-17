// Helper class to track nodes
export class GraphNode {
    constructor(n, edges) {
        this.n = n;
        this.edges = edges;
        this.isVisited = false;
    }

    getNode() {
        return this.n;
    }

    getEdges() {
        return this.edges;
    }

    foundEqual() {
        return this.isVisited;
    }

    setFoundEqual() {
        this.isVisited = true;
    }

    clearEquality() {
        this.isVisited = false;
    }
}