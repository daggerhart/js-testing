/**
 * References:
 *
 * @link https://github.com/justinribeiro/lighthouse-jest-example
 * @link https://github.com/GoogleChrome/lighthouse
 * @link https://github.com/GoogleChrome/lighthouse/blob/master/docs/readme.md#using-programmatically
 *
 */
import lighthouse from 'lighthouse';
import yaml from 'js-yaml';
import fs from 'fs';
import {createObjectCsvWriter} from 'csv-writer';
import mkdirp from 'mkdirp';

const chromeLauncher = require('chrome-launcher');
const routes = yaml.safeLoad(fs.readFileSync('tests/lighthouse/test-routes.yml', 'utf8'));
const siteUrl = process.env.SITE_TEST_BASE_URL;
const lighthouseOpts = {
    chromeFlags: ['--show-paint-rects'],
    onlyCategories: ['performance'],
};
const runTime = new Date().toISOString();
const siteDomain = process.env.SITE_TEST_BASE_URL.replace(/http(s?):\/\//, '');
const outputFile = process.env.SITE_LIGHTHOUSE_OUTPUT + `/results-${siteDomain}.csv`;
const shouldAppend = fs.existsSync(outputFile);

let headers = [
    { id: 'path', title: 'Page Path' },
    { id: 'date', title: 'Date' },
];
let trackScoreAndDisplayValue = {};

let records = [];
let firstRun = true;

mkdirp.sync(process.env.SITE_LIGHTHOUSE_OUTPUT);

/**
 *
 * @param url
 * @param opts
 * @param config
 * @returns {Promise<Result | LH.Result | never>}
 */
function launchChromeAndRunLighthouse(url, opts, config = null) {
    return chromeLauncher.launch({chromeFlags: opts.chromeFlags}).then(chrome => {
        opts.port = chrome.port;
        return lighthouse(url, opts, config).then(results => {
            return chrome.kill().then(() => results.lhr)
        });
    });
}

/**
 *
 * @returns {Promise<void>}
 */
async function testAllRoutes() {
    for (let path of routes.paths) {
        await launchChromeAndRunLighthouse(siteUrl + path, lighthouseOpts).then(results => {
            let auditData = {};

            for (let key in results.audits) {
                if (results.audits.hasOwnProperty(key)) {
                    let audit = results.audits[key];

                    // Skip anything that doesn't have score or display value.
                    if (!audit.score && !audit.displayValue) {
                        continue;
                    }

                    // Track display values for anything that has both score & display
                    trackScoreAndDisplayValue[key] = audit.score && audit.displayValue;

                    if (trackScoreAndDisplayValue[key]) {
                        audit[key + '_display'] = audit.displayValue;
                    }

                    // For anything that has a display value but not a score, use display value.
                    if (!audit.score && audit.displayValue) {
                        audit.score = audit.displayValue;
                    }
                    auditData[key] = audit.score;

                    // On first record run, populate the headers data dynamically.
                    if (firstRun) {
                        headers.push({
                            id: key,
                            title: audit.title,
                        });

                        if (trackScoreAndDisplayValue[key]) {
                            headers.push({
                                id: key + '_display',
                                title: audit.title + ' [Display Value]',
                            });
                        }
                    }
                }
            }

            if (firstRun) {
                // console.log(results.audits);
                // console.log(headers);
            }
            firstRun = false;

            // Merge the audit key => score pairs into our custom data and append the row.
            let row = Object.assign({path: path, date: runTime}, auditData);
            records.push(row);
        });
    }
}

/**
 * Write to CSV file.
 */
testAllRoutes().then(() => {
    let csvWriter = createObjectCsvWriter({
        path: outputFile,
        header: headers,
        append: shouldAppend,
    });

    csvWriter.writeRecords(records).then(() => {
        console.log(`Wrote ${records.length} rows to ${outputFile}`);
    });
});
