import _ from 'lodash';
import express from 'express';
import fs from 'fs';
import marked from 'marked';
import path from 'path';
import {fileURLToPath} from 'url';
import {parse} from 'date-fns';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const logsDir = 'C:\\Users\\paulm\\Documents\\journal\\captains-log';

const getFiles = () => {
  return fs.readdirSync(logsDir)
    .map((filename) => {
      const file = `${logsDir}\\${filename}`;
      const created = parse(
        filename.substr(0, filename.lastIndexOf('.')),
        'yyyy-MM-dd_HH.mm.ss', new Date());
      return {created, file};
    })
    .sort((a, b) => a.created - b.created)
    .reduce((acc, {created, file}) => {
      const log = fs.readFileSync(file, 'utf8');
      return [...acc, {created, md: marked.lexer(log)}]; // https://marked.js.org/using_pro#lexer
    }, []);
}


const getHist = () => {
  const locationHistoryDir = `personalData\\takeout-20201228T194040Z-001\\Takeout\\Location History\\Semantic Location History`;
  const years = fs.readdirSync(locationHistoryDir);
  return _.fromPairs(years.map(year => {
    const months = _.intersectionBy(
      ['JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE', 'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'DECEMBER'].map(mo => `${year}_${mo}.json`),
      fs.readdirSync(`${locationHistoryDir}\\${year}`),
      (fn) => fn.substr(0, 8),
    );

    return [
      year,
      _.fromPairs(months.map(monthFilename => {
        return [monthFilename, JSON.parse(fs.readFileSync(`${locationHistoryDir}\\${year}\\${monthFilename}`, 'utf8'))]
      }))
    ]
  }))
};

//
//
// // TODO: segment into contents based on heading depth. consider contents to be anything between heading and the next heading of same depth or EOF
//
const app = express();

app.use(express.static(path.join(__dirname, 'build')));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.post('/files', (req, res) => {
  res.send({files: getFiles()}) // https://expressjs.com/en/4x/api.html#res.send
});

app.post('/locations', (req, res) => {
  res.send({history: getHist()}) // https://expressjs.com/en/4x/api.html#res.send
});

app.listen(8080);
