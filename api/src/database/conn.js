//const Sequelize = require('sequelize')
//Set up default mongoose connection
//const sequelize = new Sequelize(process.env.PGDATABASE, process.env.PGUSER,process.env.PGPASSWORD, {
  //  host: process.env.PGHOST,
  //  port: process.env.PGPORT,
  //  dialect: 'postgres'
//});

//module.exports = sequelize;
//Bind connection to error event (to get notification of connection errors)
const sql = require('mssql');
const config = {
    user: 'sa',
    password: 'Cgg@2015',
    server: '10.2.28.163',
    database: 'Training',
    options: {
         encrypt: false,
         trustServerCertificate: true,
    }
};

const sequelize = sql.connect(config).then(() => {
    console.log('Connected to SQL Server');
}).catch((err) => {
    console.error(err);
});

module.exports = sequelize;
