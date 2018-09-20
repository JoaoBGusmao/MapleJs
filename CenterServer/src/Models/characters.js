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
        name: Sequelize.STRING,
        created_at: Sequelize.DATE,
        last_login: Sequelize.DATE,
      },
      {
        tableName: 'characters',
        timestamps: false,
        sequelize,
      },
    );
  }
}

export default Accounts;
