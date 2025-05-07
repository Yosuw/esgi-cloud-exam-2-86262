const { Sequelize } = require('sequelize')

// database
const sequelize = new Sequelize(
  process.env.DATABASE_URL || 'postgres://fakeurl', // Utilisation de la variable d'environnement
  {
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
);

// authentication and synchronization
sequelize.authenticate()
  .then(() => {
    console.log("Connection to the database has been established successfully.");
    sequelize.sync().catch((error) => console.log("Cannot sync the database:", error));
  })
  .catch((error) => console.log("Cannot connect to database, please check environment credentials:", error));

module.exports = sequelize;