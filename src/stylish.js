import _ from 'lodash';

const stylish = (result, stack) => {
    const math = '.'.repeat(stack * 2)
    const arr = Object.entries(result)
    for(let key in result){
        result[math + key] = result[key]
        
    }

    console.log(2,result)
    return result
};

export default stylish;