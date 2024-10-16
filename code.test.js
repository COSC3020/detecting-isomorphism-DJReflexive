const fs = require('fs');
const jsc = require('jsverify');

eval(fs.readFileSync('code.js')+'');



// Helper class to track nodes
// This class is in this file because I couldn't get it to run
//      in a seperate file. Me and TA Ali were trying to work 
//      with it, but ultimately put the class into this file.
class Node {
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



    /* Helper Functions */

// Generate a New Graph
function generateGraph(size) {
    let graph = []

    for (let i = 0; i < size; i++) {
        let edges = []
    
        for (let j = 0; j < size; j++) {
            edges.push(jsc.random(0, 1))
        }
    
        graph.push(new Node(i, edges))
    }

    return graph
}

// Tests for Reflexivity
function testReflexivity(size, numTests) {
    for (let i = 0; i < numTests; i++) {
        let graph = generateGraph(jsc.random(0, size));

        if (!are_isomorphic(graph, graph)) {
            return false;
        }
    }

    return true;
}

// Tests for Symmetry
function testSymmetric(size, numTests) {
    for (let i = 0; i < numTests; i++) {
        let randomSize = jsc.random(0, size);
        let graph1 = generateGraph(randomSize);
        let graph2 = generateGraph(randomSize);

        let isomorphicCheck1 = are_isomorphic(graph1, graph2)

        // Clears all nodes of equality
        for (let i = 0; i < graph1.length; i++) {
            graph1[i].clearEquality();
            graph2[i].clearEquality();
        }

        let isomorphicCheck2 = are_isomorphic(graph2, graph1)


        if(isomorphicCheck1 != isomorphicCheck2) {
            return false;
        }
    }

    return true;
}

// Tests Permutations
function testPermutation(size, numTests) {

    // *Randomly* generates permutation to test
    function generatePermutation(origGraph) {
        let graph = origGraph;

        for (let i = 0; i < graph.length; i++) {
            // Yes, sometimes these two nodes will be the same
            let node1 = jsc.random(0, graph.length-1);
            let node2 = jsc.random(0, graph.length-1);

            // Swap the two nodes half the time
            if (jsc.random(0, 1) == 1) {
                let tmp = graph[node1];
                graph[node1] = graph[node2];
                graph[node2] = tmp;
            }
        }

        return graph;
    }

    for (let i = 0; i < numTests; i++) {
        let originalGraph = generateGraph(size);
        let permutationGraph = generatePermutation(originalGraph);

        if (!are_isomorphic(originalGraph, permutationGraph)) {
            return false;
        }
    }

    return true;
}


    /* Custom Testing */

const graphSize = 5; // 5: Not too large so that isomorphism is more likely
const numOfTests = 100000; // 100000: Sufficiently enough runs for each test

// Reflexive: graph is isomporphic to itself...
const isReflexive = testReflexivity(graphSize, numOfTests);

// Symmetry: graph1 is isomorphic to graph2 and vice versa...
const isSymmetric = testSymmetric(graphSize, numOfTests);

// Permutations: Permutations of the same graph are Isomorphic..
const checkPermutation = testPermutation(graphSize, numOfTests)

if (isReflexive && isSymmetric && checkPermutation) {
    console.assert(isReflexive && isSymmetric && checkPermutation, 
                        "Tests have failed...");
}
else if (!isReflexive) {
    throw "The algorithm is not Reflexive..."
}
else if (!isSymmetric) {
    throw "The algorithm is not Symmetric..."
}
else if (!checkPermutation) {
    throw "A Permutation was found non-isomorphic..."
}
else {
    throw "Some unknown error!!!"
}