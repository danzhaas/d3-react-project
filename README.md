# d3-react-project

D3 stands for Data Driven Documents and is one of the premiere visualization tools developed for Javascript.  

Why should anyone learn D3?
Three main reasons why D3 is so valuable: 
Flexibility; elegance; community.

1) Flexbility:
If many visualization tools are like Lego sets, D3 is like clay: it is highly customizable.  

2) Elegance: 
Updates are incredibly smooth.

3) Community:
Vast ecosystem of prebuilt code that can be utilized without licensing.


https://github.com/adamjanes/react-d3



Why do D3 and React famously not work well together?
In the example the author gives, react updates a container background color to red in its state, and D3 updates the container's background color to green with inline-style, and then trying to change the color back to red with State doesn't work because the value of the color in state hasn't changed, so it won't re-render when trying to change it to red again.   

The author praises this article's analysis.
https://www.smashingmagazine.com/2018/02/react-d3-ecosystem/
Three proposed solutions he doesn't like: 
1) Enter code for D3 in React Lifecycle methods
-disadvantages: prevents updating D3, fundamentally limiting what you can do; file size will get long.
2) React Faux Dom library: Involves creating a fake DOM on top of React virtual DOM.  Elegant solution, but makes the process slower, and adds a dependency.
3) React for DOM, D3 for math: use D3 methods to do calculations, but render and append components to DOM with React.  Loses a lot of cool D3 functionality.

His favored solution: 
Lifecycle methods wrapping.
How it works: Two different files: one contains D3 code, and the other is a wrapper code to contain it.  So basically creates instance of D3 class, then updates it using lifecycle methods.  
Also uses ref system: setRef method.  Can pass components and elements as a variable to track them on the page.  In D3 code, can call different methods that are exported around the page.  

To implement this favored solution, we will keep the code separate: A file will contain all D3 code for a thing.  A separate file written with React will be the wrapper into which the D3 code is imported.  Then D3 is within React and can be managed with lifecycle methods.    