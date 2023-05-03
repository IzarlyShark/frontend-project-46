import _ from 'lodash';

const stylish = (result, stack) => {
    const math = '.'.repeat(stack * 2)

    // for(let key in result){
    //     result[math + key] = result[key] 
       
    //     if(typeof(result[key]) === 'object' ){
    //         stylish(result[key], stack + 1)
    //     }else{
    //         result[math + key] = result[key]
    //     }
    //      delete result[key]
    // }


    const str = JSON.stringify(result, null, '\t', function(key, value) {
       console.log(value)
        if (typeof(value) === 'object' && value !== null) {
        return '[Object]';
        }

        return value;
    });

    return str
};

export default stylish;