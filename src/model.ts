import dataSource from 'orm';
import User from 'entity/User';

const model = {
  dataSource: dataSource,
  manager: dataSource.manager,
  user: User,
};

export default model;
