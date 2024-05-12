const { sequelize } = require('sequelize');

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
       
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,


      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users'); 
  }
};
