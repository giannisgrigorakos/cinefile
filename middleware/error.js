const winston = require('winston');
/* to winston exei ta parakatw epipeda logging:
error 
warn
info -> pou apothikeuontai loggs opws connected to mongo ktl dld oxi exceptions h errors
verbose
debug
silly
*/
module.exports = function(err, req, res, next){
  winston.error(err.message, err);  //to err to bazw optionaly an thelw na balw sto log file metadata oson afora ta properties pou exoume sto error
  res.status(500).send('Something failed.');   //500 -> Internal error
}