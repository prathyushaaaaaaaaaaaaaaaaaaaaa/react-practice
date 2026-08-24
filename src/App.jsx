// function App() {
//   const name = "Prathyusha";
//   return (
//   <div>
//   <h1>Holaaaaaaaaaa</h1>
//   <p>This is the spanish word for HELLOOOOOOOOO</p>
//   <button onClick={() => alert("You just chose Spanishhhhhhhh")}>SPANISHHHHHHH</button> 
//   <button onClick= {() => alert("You just clicked a button!!!!!!!!")}>
//     Click MEEEEE
//   </button>
//   return <h1>Hola {name} </h1>
//   </div>
//   )
// }
// export default App

// function App() {
//   const name = "John"
//   const age = 21
//   const role = "Developer"

//   return (
//   <div className="flex flex-col gap-2">
//     <p> Name : {name}</p>
//     <p> Age : {age}</p>
//     <p> Role : {role}</p>
//   </div>
//   )
// }
// export default App 

// function Profile({name,age,role}) {
//   return (
//     <div>
//       <p>Name: {name}</p>
//       <p>Age: {age}</p>
//       <p>Role: {role}</p>
//     </div>
//   );
// }

// function App() {
//   return (
//     <div>
//       <Profile name = "John" age = {21} role ="Developer" />
//       <Profile name = "Sarah" age = {25} role ="Designer" />
//       <Profile name = "Alex" age = {30} role ="Manager" />
//     </div>
//     );
//   }
// export default App


// import { useState } from "react";

// function App(){
//   const [count,setCount] = useState("Hello");
//   return (
//     <div>
//       <p>{count}</p>
//       <button onClick = {() => setCount("Goodbye")} > 
//         Add
//       </button>
//     </div>

//   );
// }
// export default App;

// import { useState } from "react";

// function App() {
//   const[isHappy,setisHappy] = useState(false);
//   return(
//     <div>
//       {isHappy ? <p>Happy</p> : <p>Sad</p>}
//       <button onClick = {() => setisHappy(!isHappy)}>
//           happy/sad
//       </button>
//     </div>
//   )
// }
// export default App

// import { useState } from "react";

// function App() {
//   const products = [
//     {id:1, name: "Laptop", price : 100000},
//     {id:2, name: "Headphones", price : 2000},
//     {id:1, name: "Phone", price : 40000}
//   ];
//   return (
//     <div>
//       {products.map((product) => (
//         <div key = {product.id}>
//         <p>{product.name}</p>
//         <p>{product.price}</p>
//       </div>
//       ))}
//   </div>
//   );
// }

// export default App;


// import {useState} from "react";
// function App() {
//   const[name,setName] = useState("")

//   return (
//     <div> 
//       <input
//       onChange={(e) => setName(e.target.value)}
//       />
//       <p>Hello {name}</p>
//     </div>
//   );
// }

// export default App


// import { useEffect } from "react";

// function App() {

//   useEffect(() => {
//     console.log("The page has loaded!");
//   }, []);

//   return (
//     <div>
//       <h1>Hello!</h1>
//       <p>Open the browser console 👀</p>
//     </div>
//   );
// }

// export default App;