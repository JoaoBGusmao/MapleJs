import Sequelize from 'sequelize';

class Accounts extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        account_id: Sequelize.INTEGER,
        character_id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
        },
        username: Sequelize.STRING,
        created_at: Sequelize.DATE,
        last_login: Sequelize.DATE,
      },
      {
        tableName: 'characters',
        sequelize,
      },
    );
  }
}

export default Accounts;
