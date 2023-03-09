import dataSource from 'orm';
import User from 'entity/User';

const model = {
  dataSource: dataSource,
  manager: dataSource.manager,
  user: User,
  userRepository: dataSource.getRepository(User),
};

export default model;
