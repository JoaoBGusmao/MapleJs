import Sequelize from 'sequelize';

class Accounts extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        account_id: Sequelize.INTEGER,
        character_id: {
          autoIncrement: true,
          type: Sequelize.INTEGER,
          primaryKey: true,
        },
        name: Sequelize.STRING,
        gender: Sequelize.TINYINT,
        job: Sequelize.SMALLINT,
        level: Sequelize.TINYINT,
        exp: Sequelize.INTEGER,
        fame: Sequelize.SMALLINT,
        skin: Sequelize.TINYINT,
        hair: Sequelize.INTEGER,
        face: Sequelize.INTEGER,
        SP: Sequelize.TINYINT,
        AP: Sequelize.TINYINT,
        STR: Sequelize.SMALLINT,
        DEX: Sequelize.SMALLINT,
        INT: Sequelize.SMALLINT,
        LUK: Sequelize.SMALLINT,
        HP: Sequelize.SMALLINT,
        MP: Sequelize.SMALLINT,
        max_HP: Sequelize.SMALLINT,
        max_MP: Sequelize.SMALLINT,
        map: Sequelize.INTEGER,
        spawn_point: Sequelize.TINYINT,
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
