const fs = require('fs');

//Reading the JSON file
const jsonData = fs.readFileSync('polygon.json', 'utf8');
//Parsing the JSON data
const data = JSON.parse(jsonData);
//Function to find URLs in the JSON data
function findUrls(obj) {
  const urls = [];

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value = obj[key];

      if (typeof value === 'string' && isUrl(value)) {
        urls.push(value);
      } else if (typeof value === 'object') {
        //Recursively searching for URLs in  objects or arrays (nested objects also)
        urls.push(...findUrls(value));
      }
    }
  }

  return urls;
}

// Function to check if a string is a URL
function isUrl(str) {
  const urlIs = /(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
  return urlIs.test(str);
}
// Find URLs in the JSON data
const foundUrls = findUrls(data);
// Print or use the found URLs
console.log(foundUrls);
