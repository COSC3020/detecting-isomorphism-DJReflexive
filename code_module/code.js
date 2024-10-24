
// Main function
export function are_isomorphic(graph1, graph2) {
    // Graphs couldn't be isomorphic if different sizes
    if (graph1.length != graph2.length) { return false; }

    // Generates all permutations of graph2
    const permutations = generatePermutations(graph2);

    // Checks if the two graphs are isomorphic
    for (let perm = 0; perm < permutations.length; perm++) {
        // Both graphs are converted to arrays, and if 
        // one permutation matches, then it is isomorphic
        if (checkEqual(convertGraphToArray(graph1), permutations[perm])) {
            return true;
        }
    }
    
    return false;
}


// Checks whether the two given arrays are identical
function checkEqual(arr1, arr2) {

    // Compares all elements (both arrays have same length)
    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] != arr2[i]) { return false; }
    }
    
    // If a case where all elems are equal, two arrays are equal
    return true;
}


// Generates all possible permutations of the given graph
function generatePermutations(graph) {
    
    let arr = convertGraphToArray(graph);

    // Generates all of the Permutation:
    const result = [];
    const c = Array(arr.length).fill(0);  // Control array for Heap's algorithm

    result.push(arr.slice());

    let i = 0;
    while (i < arr.length) {
        if (c[i] < i) {

            if (i % 2 === 0) { swap(arr, 0, i); } 
            else { swap(arr, c[i], i); }

            result.push(arr.slice());

            c[i] += 1;
            i = 0;
        } else {
            c[i] = 0;
            i += 1;
        }
    }

    return result;
}


// Swaps two elems of an array
function swap(arr, i, j) {
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}


// Converts a graph into a flattened array
function convertGraphToArray(graph) {
    // Convert from Graph to Array
    let tmp = [];
    for (let i = 0; i < graph.length; i++) {
        tmp.push(graph[i].getEdges());
    }

    // Flatten out array
    let arr = [];
    for (let i = 0; i < tmp.length; i++) {
        for(let j = 0; j < tmp[i].length; j++) {
            arr.push(tmp[i][j]);
        }
    }

    return arr;
}
