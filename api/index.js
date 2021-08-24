//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

//Conexion de DB  y Backend ?


const server = require('./src/app.js'); //traigo todo lo de express
const {conn} = require('./src/db.js');//traigo la conexion con sequelize y la tabla



//Syncing all the models at once.
conn.sync({ force: true }).then(() => {  //elimina (drop) la tabla y luego la vuelve a crear. Ej si tengo info adentro, la cierro y la vuelvo a cargar, lso datos q estan adentro no se guardan. Se cera la tabla d enuevo
  server.listen(3001, () => {
    console.log('%s listening at 3001'); // eslint-disable-line no-console
  });
});

// Syncing all the models at once.
//como conn devuelve una promesa, colo el .then() para que cuando termine se levante el servidor 

