const config = require('config');

module.exports = function() {
  if(!config.get('jwtPrivateKey')){
    throw new Error('FATAL ERROR: jwtPrivateKey is not defined');
    //gia na to piasei to global logger kai na to balei sto logfile
    //mporw epishs na kanw throw ena string alla den me sumferei epeidh de tha kanw log to stacktrace
  }
}  