import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import yaml from 'js-yaml'

const parseJson = (path1) => {
const data = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), path1) , 'utf-8'));
return data;
};

const parsYaml = (path) => {
    const data = yaml.load(fs.readFileSync(path, 'utf8'))
    return data;
}

export { parseJson, parsYaml };