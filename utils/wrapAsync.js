// function wrapAsync(fn) {
//     return function(req,res,next) {
//         fn(req,res,next).catch(next);
//     }
// }



//best way to write above function 
module.exports= (fn) => {
    return (req,res,next) => {
        fn(req,res,next).catch(next);
    }
}