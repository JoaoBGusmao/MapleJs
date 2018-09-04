import Sequelize from 'sequelize';

class Accounts extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        account_id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
        },
        username: Sequelize.STRING,
        password: Sequelize.STRING,
        PIC: Sequelize.STRING,
        first_name: Sequelize.STRING,
        last_name: Sequelize.STRING,
        email: Sequelize.STRING,
        birthday: Sequelize.DATE,
        gender: Sequelize.INTEGER,
        main_character_id: Sequelize.INTEGER,
        created_at: Sequelize.DATE,
        last_login: Sequelize.DATE,
      },
      {
        tableName: 'accounts',
        sequelize,
      },
    );
  }
}

export default Accounts;
