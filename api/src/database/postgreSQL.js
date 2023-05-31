const Sequelize = require('sequelize')

const sequelize = new Sequelize("birth_certificate", "postgres", "Gv@0987@Np", {
    host: "18.60.246.185",
    port: 5432,
    dialect: 'postgres'
});
sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });


module.exports = sequelize;
