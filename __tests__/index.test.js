import genDiff from '../src';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixture__', filename);

test('compare two files' , () => {
    let path1 = getFixturePath('file1.json');
    let path2 = getFixturePath('file2.json');
    const expected = `{\n  - follow: false\n    host: hexlet.io\n  - proxy: 123.234.53.22\n  - timeout: 50\n  + timeout: 20\n  + verbose: true\n}`;
    expect(genDiff(path1, path2)).toEqual(expected);      
})

test('compare two files when file not found' , () => {
    let path1 = getFixturePath('file1.json');
    let path2 = getFixturePath('notExistingFile.json');
    const expected = `File ${path2} not found`;
    expect(genDiff(path1, path2)).toEqual(expected);      
})

test('compare two files when one file is empty' , () => {
    let path1 = getFixturePath('file1.json');
    let path2 = getFixturePath('empty.json');
    const expected = `{\n  - follow: false\n  - host: hexlet.io\n  - proxy: 123.234.53.22\n  - timeout: 50\n}`;
    expect(genDiff(path1, path2)).toEqual(expected);  
})
