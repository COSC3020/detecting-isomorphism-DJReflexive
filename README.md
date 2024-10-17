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

Otherwise, the alogrithm will step into a double-nested for loop. Both loops go through its respective graph (which are the same size), meaning both for loops run $|E|$ times since it iterates through a list of edges in a adjacency matrix representation. Since they are nested, the complexity increases to $\Theta(|E|^2)$. There are some constant time operations that occur, like checking for equality between the two graphs, incrementing the counter, and setting nodes to "foundEqual." Outside of the double-nested for loop is a check if all the nodes have been set to equal, which is a constant time operation.

Considering the whole algorithm, there is essentially a bunch of constant time operations with a double-nested for loop with a complexity of $\Theta(|E|^2)$. Since these constant operations are negligable, the final time complexity for the alogirithm is $\Theta(|E|^2)$. This is the complexity for both the average case and the worst case scenerios since it will always iterate through all |E|^2 edges no matter what.

# Sources

- ChatGPT: For helping me come up with property testing ideas. All the implementation is all done by me, just needed to figure out what to test for.

# Plagiarism Acknowledgement

I certify that I have listed all sources used to complete this exercise, including the use of any Large Language Models. All of the work is my own, except where stated otherwise. I am aware that plagiarism carries severe penalties and that if plagiarism is suspected, charges may be filed against me without prior notice.