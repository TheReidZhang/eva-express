/**
 * Aggregate all language files app directory to create global language locale files
 *
 * !IMPORTANT: The LOCALES constant variable must have the same number of languages as each feature language folder and the global language folder
 */

'use strict';

// require built-in node modules
import fs from 'fs';
import path from 'path';

// helpers
import { LOCALE_LIST } from '../src/helper/constant';

module.exports = {
  compile,
};

/**
 * Aggregate all language files app directory to create global language locale files
 */
function compile() {
  // variables
  const APP_DIR = '../src/app'; // app directory
  const LOCALES_DIR = '../src/locale'; // locales directory
  const LANGUAGE_DIR = '../src/language'; // global language directory

  // STORE ALL LANGUAGES HERE
  const LANGUAGES = {};

  // all language files in this directory
  const globalLanguageFiles = fs.readdirSync(path.join(__dirname, LANGUAGE_DIR));

  // go through locale files
  globalLanguageFiles.forEach(file => {
    // only locale files
    if (!file.endsWith('.ts')) return;

    // store the language file
    const langFile = path.join(__dirname, LANGUAGE_DIR, file);
    LANGUAGES[file] = require(langFile).default;

    // delete require module cache because gulp needs to reload this module if the file changes
    delete require.cache[require.resolve(langFile)];
  });

  // check if is directory and get directories
  const isDirectory = source => fs.lstatSync(source).isDirectory();
  const getDirectories = source =>
    fs
      .readdirSync(source)
      .map(name => path.join(source, name))
      .filter(isDirectory);

  // gets all feature folders
  const directories = getDirectories(path.join(__dirname, APP_DIR));

  // for each feature directory
  directories.forEach(dir => {
    const LANG_DIR = path.join(dir, '/language'); // the language folder name
    const languageFiles = fs.readdirSync(LANG_DIR);

    // append each feature language to the global language object
    languageFiles.forEach(file => {
      // only locale files
      if (!file.endsWith('.ts')) return;

      const langFile = path.join(LANG_DIR, file);

      // store the langauge file
      LANGUAGES[file] = {
        ...LANGUAGES[file],
        ...require(langFile).default,
      };

      // delete require module cache because gulp needs to reload this module if the file changes
      delete require.cache[require.resolve(langFile)];
    });
  });

  // convert to json and write to locales folder
  LOCALE_LIST.forEach(locale => {
    fs.mkdirSync(path.join(__dirname, LOCALES_DIR), { recursive: true });
    const fd = fs.openSync(path.join(__dirname, LOCALES_DIR, `${locale}.json`), 'w');
    const localeJSON = JSON.stringify(LANGUAGES[`${locale}.ts`]);
    // create json file
    fs.writeSync(fd, localeJSON, 0, 'utf-8');
    fs.closeSync(fd);
  });
}

// compiles when server is run
compile();
