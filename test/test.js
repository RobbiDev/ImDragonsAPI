import fetch from 'node-fetch';

const response = await fetch('https://testapi-kzll.onrender.com/api/imaginejs/data/band');
const data = await response.json();

console.log(data);