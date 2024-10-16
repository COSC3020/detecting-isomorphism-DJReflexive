
function are_isomorphic(graph1, graph2) {
    let len1 = graph1.length;
    let len2 = graph2.length;

    // Graphs couldn't be isomorphic if different sizes
    if (len1 != len2) { return false; }

    // Counts all of the equal nodes between the two graphs
    let equalCounter = 0;

    // Compares all elements of graph1 against all elements of graph2
    for (let i = 0; i < len1; i++) {
        for (let j = 0; j < len2; j++) {
            edges1 = graph1[i].getEdges();
            edges2 = graph2[j].getEdges();

            // Check if edges are the same (assuming the neither node 
            // was already found to be equal to another node)
            if ( JSON.stringify(edges1) == JSON.stringify(edges2) &&
                ( !graph1[i].foundEqual() && !graph2[j].foundEqual()) ) {

                equalCounter++;

                graph1[i].setFoundEqual();
                graph2[j].setFoundEqual();
            }
        }
    }

    // If all nodes in one graph were equal to some other 
    // node in the other, the two graphs are isomorphic.
    if (equalCounter == len1) {
        return true;
    }
    else {
        return false
    }
}
