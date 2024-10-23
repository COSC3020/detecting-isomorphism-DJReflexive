# Graph Isomorphism

Devise an algorithm to determine whether two given graphs are isomorphic or not.
It takes two graphs as an argument and returns `true` or `false`, depending on
whether the graphs are isomorphic or not. Your algorithm needs to handle both
the case where the two graphs are isomorphic and where they are not isomorphic.

Hint: Your algorithm does not need to be the best possible algorithm, but should
avoid unnecessarily repeating work.

I have not provided any test code, but you can base yours on test code from
other exercises. Your tests must check the correctness of the result of running
the function and run automatically when you commit through a GitHub action.

# Runtime Analysis

What is the worst-case big $\Theta$ time complexity of your algorithm?

## My Runtime Analysis

When the are_isomorphic() method is called, there is a base case that checks whether two graphs are the same size. If they are not, the algorithm returns false in a constant time operation.

Otherwise, the algorithm will go on to generate all the possible permutations of one of the graphs using the generatePermutations() method. Since all possible variations of the graph are generated, it will exectute $|V|!$ times. However there is an additional operation to consider before the permutations are actually generated. The convertGraphToArray() goes through the entire graph and converts it to a 1D array. Since it must go through the graph, the runtime of this method is $|V|^2$. Overall, the runtime of the generatePermutations() method is $\Theta(|V|^2 + |V|!)$

The next portion is the for loop. This loop iterates through all the permutations of the graph, meaning it has the same complexity as the generatePermutations() method. Inside the loop, there is another convertGraphToArray() method, and then a checkEqual() call. The checkEqual() method runs |V|^2 times as it uses the result of convertGraphToArray() as the input. The complexity of the for loop is $\Theta((|V^2|)!)$

Putting it all together, we get the complexity of $\Theta(|V|^2 + |V|! + (|V^2|)!)$, which simplifies to $\Theta((|V|^2)!)$.

# Sources

- ChatGPT: For helping me come up with property testing ideas. All the implementation is all done by me, just needed to figure out what to test for.
- ChatGPT: For the help writing my generatePermutations() and heap permute technique.

# Plagiarism Acknowledgement

I certify that I have listed all sources used to complete this exercise, including the use of any Large Language Models. All of the work is my own, except where stated otherwise. I am aware that plagiarism carries severe penalties and that if plagiarism is suspected, charges may be filed against me without prior notice.