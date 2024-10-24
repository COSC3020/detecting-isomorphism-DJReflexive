import { GraphNode } from "./GraphNode.js";
import { are_isomorphic } from "./code.js";
import jsc from 'jsverify';


    /* Helper Functions */

// Generate a New Graph
function generateGraph(size) {
    let graph = []

    for (let i = 0; i < size; i++) {
        let edges = []
    
        for (let j = 0; j < size; j++) {
            edges.push(jsc.random(0, 1))
        }
    
        graph.push(new GraphNode(i, edges))
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

// Tests Valid Permutations
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

// Tests When Graphs are not Isomorphic
function testInvalidGraphs(size, numTests) {
    // Case where size is 0 passes test, even though it's already isomorphic
    if (size == 0) {
        return true;
    }

    for (let i = 0; i < numTests; i++) {
        let originalGraph = generateGraph(size);

        // Changes one edge so that the graphs are no longer isomorphic
        let newGraph = originalGraph;
        let newEdges = newGraph[0].getEdges();
        
        // Inverts the first edge, making graphs no longer isomorphic
        if (newEdges[0] == 0) { newEdges[0] = 1; } 
        else { newEdges[0] = 0; }

        newGraph[0] = new GraphNode(newGraph[0].getNode(), newEdges);

        console.log("DEBUG: origGraphEdges=" + originalGraph[0].getEdges())
        console.log("     : newGraphEdges=" + newGraph[0].getEdges())
        console.log("     : newEdges=" + newEdges)

        if (are_isomorphic(originalGraph, newGraph)) {
            return false;
        }
    }

    return true;
}




    /* Custom Testing */

const graphSize = 3; // 3: Not too large so that heap doesn't run out of memory
const numOfTests = 10; // 1000: Sufficiently large for n! runtime

// Reflexive: graph is isomporphic to itself...
const isReflexive = testReflexivity(graphSize, numOfTests);

// Symmetry: graph1 is isomorphic to graph2 and vice versa...
const isSymmetric = testSymmetric(graphSize, numOfTests);

// Permutations: Permutations of the same graph are Isomorphic...
const checkPermutation = testPermutation(graphSize, numOfTests);

// InvalidGraph: Tests when graphs are not isomorphic...
const checkInvalidGraphs = testInvalidGraphs(graphSize, numOfTests);

if (isReflexive && isSymmetric && checkPermutation && checkInvalidGraphs) {
    console.assert(isReflexive && isSymmetric && 
                    checkPermutation && checkInvalidGraphs, 
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
else if (!checkInvalidGraphs) {
    throw "A graph was supposed to be found invalid..."
}
else {
    throw "Some unknown error!!!"
}