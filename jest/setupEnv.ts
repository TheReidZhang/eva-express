/**************************************
 * THIS IS RUN BEFORE EVERY TEST FILE *
 **************************************/
import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: path.join(__dirname, '../config/.env.test') });
// jest.mock('services/email');
// jest.mock('services/dwolla');
// jest.mock('services/plaid');
// jest.mock('services/marqeta');
// jest.mock('services/sms');
