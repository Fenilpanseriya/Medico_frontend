 export const useThrottle=(callFn,d)=>{
    let timer;
    return function(...args){
        if(timer){
            clearTimeout(timer)
        }
        timer = setTimeout(()=>{
            callFn()
        },d);
    }
}