import fetch from 'node-fetch';

const response = await fetch('https://api.unnecessarylibraries.com/');
const data = await response

console.log(data);