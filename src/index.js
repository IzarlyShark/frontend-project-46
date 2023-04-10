import fs from 'fs';
import path from 'path';
import _ from 'lodash';


const genDiff = (path1, path2) => {
    if (!fs.existsSync(path1)) {
        return `File ${path1} not found`;
    }
    if (!fs.existsSync(path2)) {
        return `File ${path2} not found`;
    }
    const data1 = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), path1) , 'utf-8'));
    const data2 = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), path2) , 'utf-8'));
    const keys = _.union(Object.keys(data1), Object.keys(data2));
    const sortedKeys = _.sortBy(keys);
    const diff = sortedKeys.flatMap((key) => {
        if (_.has(data1, key) && !_.has(data2, key)) {
           return (`  - ${key}: ${data1[key]}`);
          }
        if (!_.has(data1, key) && _.has(data2, key)) {
            return (`  + ${key}: ${data2[key]}`);
        }
        if (_.has(data1, key) && _.has(data2, key) && data1[key] !== data2[key]) {
            return (`  - ${key}: ${data1[key]}\n  + ${key}: ${data2[key]}`);
        }
          if (data1[key] === data2[key]) {
            return (`    ${key}: ${data1[key]}`);
        }
    })
    return (`{\n${diff.join('\n')}\n}`);
};



export default genDiff;