// import React, { useState, useEffect, useRef } from 'react';
// import { ForceGraph2D } from 'react-force-graph';
// import * as d3 from 'd3';
// import dat from 'dat.gui';
// import {l} from "../firebase/firebase";
// // import {useReadCypher} from "use-neo4j";
// // import * as neo4j from "neo4j-driver";
// // import './App.css'; // Assuming you’ll have some CSS
//
//
//
// function App() {
//     // var driver = neo4j.driver(
//     //     'bolt://7dd0.databases.neo4j.io',
//     //     neo4j.auth.basic('neo4j', 'B0Qq-ReiEIQgo'),
//     //     {encrypted: "ENCRYPTION_OFF"}
//     //
//     // )
//     let session;
//
//     const fetchData = async () => {
//         try {
//             const response = await fetch('http://localhost:3062/api/v0/return_all_nodes111');
//             const jsonData = await response.json();
//             l("jsonData", jsonData)
//             // setData(jsonData);
//         } catch (error) {
//             console.error('Error fetching data:', error);
//         }
//     };
//
//     fetchData();
//     async function qqqq(session) {
//
//
//         try {
//             session = driver.session()
//             const result = await session.run(
//                 'MATCH  (n) RETURN n'
//             );
//             result.records.forEach(record => {
//                 console.log(record);
//             });
//         } catch (error) {
//             console.log(error);
//         } finally {
//             await session.close();
//         }
//     };
//
//     useEffect( ()=>{
//         fetchData();
//
//
//     }, [])
//
//
//     return (
//         <svg id="workflow">
//
//         </svg>
//     );
// }
//
// export default App;
