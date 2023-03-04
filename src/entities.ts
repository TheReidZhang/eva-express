import dataSource from 'orm';
import User from 'entity/User';

// STORE ALL ENTITIES HERE
const entities = {
  dataSource: dataSource,
  manager: dataSource.manager,
  user: User,
};

export default entities;
