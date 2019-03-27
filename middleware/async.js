//to xrhsimipoiw gia na automatopoihsw th diadikasia kathe fora na tsekarw se kathe ena get ktl an uparxei error 500 otan exei pesei h mongo
module.exports = function (handler) {
  return async (req, res, next) => {
    try{
      await handler(req, res);
    }
    catch (ex){
      next(ex);
    }
  };
} 