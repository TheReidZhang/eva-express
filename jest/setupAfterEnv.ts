// import { reset, populate, closeAllOpenHandles } from '../src/helpers/tests';
// import _ from 'lodash';

// Can extend global varible with more util funcs so that in test.ts files, we can directly access these util func
// ! Don't forget to declare the util func in global.d.ts
// global.adminFixFn = () => _.cloneDeep(require('../src/test/fixtures/fix1/admin'));

// global.beforeEach(async () => {
// try {
//   await reset();
//   await populate('fix1');
// } catch (error) {
//   console.error(`Error resetting database!\n${error}`);
//   throw error;
// }
// });

// global.afterEach(async () => {
// try {
//   await closeAllOpenHandles();
// } catch (error) {
//   console.error(`Error closing open handles!\n${error}`);
//   throw error;
// }
// });
