import fs from 'fs';
// import path from 'path';
import _ from 'lodash';
// import { log } from 'console';
import { parseJson, parsYaml } from './parsers.js'


function compareObjects(obj1, obj2) {
    const result = {};
    const keys = new Set([...Object.keys(obj1), ...Object.keys(obj2)]);
  
    for (const key of keys) {
      if (typeof obj1[key] === 'object' && typeof obj2[key] === 'object') {
        const comparedObj = compareObjects(obj1[key], obj2[key]);
        if (Object.keys(comparedObj).length > 0) {
          result[key] = comparedObj;
        }
      } else if (obj1[key] !== obj2[key]) {
        if (obj1[key] === undefined) {
          result[`+ ${key}`] = obj2[key];
        } else if (obj2[key] === undefined) {
          result[`- ${key}`] = obj1[key];
        } else {
          result[`- ${key}`] = obj1[key];
          result[`+ ${key}`] = obj2[key];
        }
      } else {
        result[key] = obj1[key];
      }
    }
  
    return result;
  }
  
  

const genDiff = (path1, path2) => {
    if (!fs.existsSync(path1)) {
        return `File ${path1} not found`;
    }
    if (!fs.existsSync(path2)) {
        return `File ${path2} not found`;
    }
    const json1 = path1.includes('.json') ? parseJson(path1) : parsYaml(path1);
    const json2 = path2.includes('.json') ? parseJson(path2) : parsYaml(path2);
    const result = compareObjects(json1, json2);
  
    console.log(JSON.stringify(result, null, 2, function(key, value) {
        if (typeof value === 'object' && value !== null) {
        return '[Object]';
        }
        return value;
    }));
};
    

//     const obj = {}
//     const keys = flatArr(data1, data2, obj)
//     //console.log(flatArr(data1, data2, obj))
//    // const keys = _.union(Object.keys(data1), Object.keys(data2));
//     console.log(keys)
//     const sortedKeys = _.sortBy(keys);
//     const diff = sortedKeys.flatMap((key) => {
//         if (_.has(data1, key) && !_.has(data2, key)) {
//            return (`  - ${key}: ${data1[key]}`);
//           }
//         if (!_.has(data1, key) && _.has(data2, key)) {
//             return (`  + ${key}: ${data2[key]}`);
//         }
//         if (_.has(data1, key) && _.has(data2, key) && data1[key] !== data2[key]) {
//             return (`  - ${key}: ${data1[key]}\n  + ${key}: ${data2[key]}`);
//         }
//           if (data1[key] === data2[key]) {
//             return (`    ${key}: ${data1[key]}`);
//         }
//     })
    // return (`{\n${diff.join('\n')}\n}`);



 

// function diffJSON(json1, json2, result = {}) {
//   const keys1 = Object.keys(json1);
//   const keys2 = Object.keys(json2);
//   const allKeys = [...new Set([...keys1, ...keys2])];

//   for (const key of allKeys) {
//     if (json1.hasOwnProperty(key) && !json2.hasOwnProperty(key)) {
//       result[-${key}] = json1[key];
//     } else if (!json1.hasOwnProperty(key) && json2.hasOwnProperty(key)) {
//       result[+${key}] = json2[key];
//     } else if (typeof json1[key] === "object" && typeof json2[key] === "object") {
//       const nestedDiff = diffJSON(json1[key], json2[key]);
//       if (Object.keys(nestedDiff).length > 0) {
//         result[key] = nestedDiff;
//       }
//     } else if (json1[key] !== json2[key]) {
//       result[-${key}] = json1[key];
//       result[+${key}] = json2[key];
//     } else {
//       result[key] = json1[key];
//     }
//   }

//   return result;
// }

// function getDifference(o1, o2) {
//     var diff = {};
//     var tmp = null;
//     if (JSON.stringify(o1) === JSON.stringify(o2)) return;
  
//     for (var k in o1) {
//       if (Array.isArray(o1[k]) && Array.isArray(o2[k])) {
//         tmp = o1[k].reduce(function(p, c, i) {
//           var _t = getDifference(c, o2[k][i]);
//           if (_t)
//             p.push(_t);
//           return p;
//         }, []);
//         if (Object.keys(tmp).length > 0)
//           diff[k] = tmp;
//       } else if (typeof(o1[k]) === "object" && typeof(o2[k]) === "object") {
//         tmp = getDifference(o1[k], o2[k]);
//         if (tmp && Object.keys(tmp) > 0)
//           diff[k] = tmp;
//       } else if (o1[k] !== o2[k]) {
//         diff[k] = o2[k]
//       }
//     }
//     return diff;
//   }
export default genDiff;