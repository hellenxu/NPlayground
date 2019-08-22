const url = require('url');
const link = 'http://localhost:4000/index.js?year=2019&month=Janurary';
const parser = url.parse(link, true);
console.log(`host: ${parser.host}`);
console.log(`pathname: ${parser.hostname}`);
console.log(`query params: ${parser.search}`);
const queryData = parser.query;
console.log(`queryData: ${queryData.month}`);