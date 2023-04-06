1. What is the difference between Component and PureComponent? give an
   example where it might break my app.
   a. The difference is that Component will re render everytime a state changes in its parent whereas a PureComponent will only rerender whenever its own props or state changes.

2. Context + ShouldComponentUpdate might be dangerous. Can think of why is
   that?
   a. No idea

3. Describe 3 ways to pass information from a component to its PARENT.
   a. Using a prop that is a callback.
   b. With renderProps: This means using children as a function passing whatever state or values there.
   c. With useContext we could update the value in a child component and read it in it's parent
   d. Similar to 'c' but using other state mgmt library like Redux

4. Give 2 ways to prevent components from re-rendering.
   a. Memoizing it with React.memo
   b. using useRef instead of useState

5. What is a fragment and why do we need it? Give an example where it might
   break my app.
   a. A Fragment is a special react tag / element that allows for a component to return more than one element. This way we wrap mutiple elemnents with an empty tag. It can break an app when used as a wrapper when mapping an array.

6. Give 3 examples of the HOC pattern.

7. what's the difference in handling exceptions in promises, callbacks and
   async...await.
   a. With promises we have to use .catch to handle the exception
   b. With callbacks and async await we have to wrap the code with a catch {} block

8. How many arguments does setState take and why is it async.
   a. Set state takes 2 argunments, either the value or a setter function of the form (oldValue) => newValue

9. List the steps needed to migrate a Class to Function Component.
   a. extract the class component's state block into one or multiple useState calls.
   b. migrate lifecycle methods like componentDidMount and componentWillUnmount into a useEffect by using its code logic to replace the componentDidMount logic, and a return function as the componentWillUnmount logic. The dependency array should be empty for this to work.
   c. migrate the render method of the class component into the return of the function compoent

10. List a few ways styles can be used with components.
    a. using the html 'style' attribute
    b. using className prop
    c. using some styling library libe styled components

11. How to render an HTML string coming from the server.
    a. With dangerouslySetInnerHTML's prop we can pass html that comes from a server.
