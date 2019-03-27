require('express-async-errors');  //oti kalutero kai oti pio automato uparxei gia ta error handling tou 500
const winston = require('winston');
require('winston-mongodb');


module.exports = function() {
  //to winston pianei opoidhpote uncaughtException
  winston.handleExceptions(
    new winston.transports.Console({ colorize: true, prettyPrint: true }),    //gia na emfanizei sthn console tuxon lathi gia kapoion pou den kserei oti prepei na tsekarei sto log file
    new winston.transports.File({ filename: 'uncaughtExceptions.log'}));

  //epeidh omws to winston den mporei na kanei handle ta unhandedRejections se auth thn ekdosh kanw 
  //to parakatw kolpo:

  process.on('unhandledRejection', (ex) => {
  throw ex;   //gia na to piasei to winston san uncaughtException
  });

  winston.add(winston.transports.File, { filename: 'logfile.log'});
  winston.add(winston.transports.MongoDB, { 
    db: 'mongodb://localhost/vidly',
    level: 'error'    //an xrhsimopoihsw info px epeidh einai to trito tha exw kai apo error -> info oxi parakatw..epishs to level einai proairetiko pedio
  });  //kalo einai sto app na mh xrhsimopoihsw thn idia th bash gia logging errors ths bashs
}