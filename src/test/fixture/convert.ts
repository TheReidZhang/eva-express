/**
 * Converts a fixture folder into one sql statement to insert into database on test load
 *
 * node test/fixtures/convert.js [FIXTURE_FOLDER_NAME]
 *
 * yarn convert [FIXTURE_FOLDER_NAME]
 */

'use strict';

// const {} = process.env;
import decamelize from 'decamelize';

// built-in
import fs from 'fs';
import path from 'path';
import * as dotenv from 'dotenv';

// require third-party
import moment from 'moment-timezone';

// load test env
dotenv.config({ path: path.join(__dirname, '../../../env/.env.test') });

// require models
import models from 'models'; // grab dataSource connection

// the order in which to create tables and add fixture data
// import seq from 'database/sequence';

// get fixture
const selectedFixtureFolder = process.argv[2].trim() || 'fix1'; // example: fix1

// get helpers
// const { populate } = require('../../helpers/tests'); // for testing purposes

// run function
(async () => {
  try {
    // reset database
    await models.dataSource.initialize();
    await models.dataSource.synchronize();
    // process.exit(0);

    // generate fixture sql
    await generateFixtureSQL(selectedFixtureFolder);

    // reset database again
    await models.dataSource.synchronize();

    console.log(`✅ SUCCESS! SQL statement added to test/fixtures/${selectedFixtureFolder}.sql\n`);
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
})();

/**
 * Generates the fix[Num].sql file for a specific fixture
 *
 * @fixtureFolderName - (STRING - REQUIRED): The fixtures folder name so we know which fixture to populate, ex. fix1, fix2, etc...
 *
 * return true
 */
async function generateFixtureSQL(fixtureFolderName) {
  let fixtures: any[] = []; // store array of fixture arrays
  let files: any[] = []; // file names that coorespond to the fixtures
  let sqlStatement: string = ''; // the full sql statement

  try {
    // turn off foreign key restrictions
    await models.dataSource.query('SET CONSTRAINTS ALL DEFERRED;');
    sqlStatement += 'SET CONSTRAINTS ALL DEFERRED;\n';

    // load regular fixtures
    if (fixtureFolderName !== null) {
      // folder path to test fixtures
      const fixturesFolderPath = path.join(__dirname, fixtureFolderName);

      // get data to insert
      fs.readdirSync(fixturesFolderPath)
        .filter(file => file.indexOf('.ts') >= 0) // only js files
        .forEach(file => {
          const fn = require(path.join(fixturesFolderPath, file)).default;
          fixtures.push(fn());
          files.push(file.replace('.ts', '')); // remove '.js'
        });
    } // end load regular fixtures

    let idx = 0; // index
    const orderedFixtures = [];
    const orderedFiles = [];

    // order the files
    // for (let i = 0; i < seq.length; i++) {
    //   for (let j = 0; j < files.length; j++) {
    //     if (seq[i] === files[j]) {
    //       orderedFixtures.push(fixtures[j]);
    //       orderedFiles.push(files[j]);
    //       break;
    //     }
    //   }
    // }

    // reorder
    fixtures = orderedFixtures;
    files = orderedFiles;

    // populate database for each fixture
    // for (let i = 0; i < fixtures.length; i++) {
    //   const fixture = fixtures[i];
    //   const tableName = models[files[idx]].getTableName(); // grab tablename of model

    //   // go through each obj for each fixture file
    //   for (let j = 0; j < fixture.length; j++) {
    //     const curFixtureObj = fixture[j];

    //     // we need to actually insert into the database
    //     const newRecord = await models[files[idx]].create(curFixtureObj, {
    //       validate: true,
    //       hooks: true,
    //       returning: false,
    //       plain: false,
    //     });

    //     // store keys and values
    //     const sqlKeys = []; // array of keys
    //     const sqlValues = []; // array of values

    //     // // grab keys & values
    //     Object.keys(newRecord.dataValues).forEach(e => {
    //       sqlKeys.push(decamelize(e, { preserveConsecutiveUppercase: true }));

    //       // get value
    //       const value = newRecord.dataValues[e];

    //       // help print
    //       // if (tableName === 'Applications') {
    //       //   console.log(value);
    //       //   console.log(typeof value);
    //       //   // if (value !== null && value !== undefined && typeof value === 'object')
    //       //   console.log(Array.isArray(value));
    //       //   console.log(Object.prototype.toString.call(value));
    //       //   console.log(Object.prototype.toString.call(value) === '[object Date]');
    //       //   console.log('----------------');
    //       // }

    //       // check type and then convert to SQL format for the SQL statement
    //       switch (Object.prototype.toString.call(value)) {
    //         case '[object Null]':
    //           sqlValues.push(`NULL`);
    //           break;
    //         case '[object Date]':
    //           // convert to readable string and surround with single quote
    //           sqlValues.push(`'${moment(value).tz('UTC').format()}'`);
    //           break;
    //         case '[object Object]':
    //         case '[object Array]':
    //           sqlValues.push(`'${JSON.stringify(value)}'`);
    //           break;
    //         case '[object String]':
    //           // surround with single quote
    //           sqlValues.push(`'${value}'`);
    //           break;
    //         case '[object Boolean]':
    //         case '[object Number]':
    //           // don't surround with anything
    //           sqlValues.push(`${value}`);
    //           break;
    //       }
    //     });

    //     // create sql statement
    //     const sqlStatementLine = `INSERT INTO ${tableName} (${sqlKeys.join(',')}) VALUES (${sqlValues.join(',')});`;
    //     sqlStatement += sqlStatementLine + '\n';
    //     // console.log(sqlStatementLine);
    //   }

    //   // reset the primary key id
    //   if (tableName !== 'MemberClients') {
    //     const queryText = `SELECT setval('${tableName}_id_seq', (SELECT MAX(id) FROM ${tableName}));`;
    //     sqlStatement += queryText + '\n';
    //     await models.dataSource.query(queryText);
    //   }

    //   idx++;
    // }

    // put back constraints
    await models.dataSource.query('SET CONSTRAINTS ALL IMMEDIATE').catch(err => {
      throw err;
    });
    sqlStatement += 'SET CONSTRAINTS ALL IMMEDIATE;' + '\n';

    // write all to sql file
    fs.writeFileSync(path.join(__dirname, `${fixtureFolderName}.sql`), sqlStatement);

    return true;
  } catch (error) {
    // turn back on foreign key restrictions
    await models.dataSource.query('SET CONSTRAINTS ALL IMMEDIATE').catch(err => {
      throw err;
    });
    console.log(error);
    return Promise.reject(error);
  }
} // END generateFixtureSQL
