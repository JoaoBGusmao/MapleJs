import Sequelize from 'sequelize';
import accounts from './accounts';
import characters from './characters';

// Models

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    define: {
      underscored: true,
    },
    timezone: 'America/Sao_Paulo',
  },
);

const models = {
  accounts: accounts.init(sequelize),
  characters: characters.init(sequelize),
};

Object.values(models)
  .filter(model => typeof model.associate === 'function')
  .forEach(model => model.associate(models));

const db = {
  ...models,
  sequelize,
};

export default db;
