import dataSource from 'orm';
import User from 'entity/User';

const models = {
  dataSource: dataSource,
  manager: dataSource.manager,
  user: User,
};

export default models;
