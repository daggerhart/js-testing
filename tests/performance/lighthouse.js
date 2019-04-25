/**
 * References:
 *
 * @link https://github.com/justinribeiro/lighthouse-jest-example
 * @link https://github.com/GoogleChrome/lighthouse
 * @link https://github.com/GoogleChrome/lighthouse/blob/master/docs/readme.md#using-programmatically
 *
 */
import lighthouse from 'lighthouse';
const chromeLauncher = require('chrome-launcher');
let siteUrl = process.env.SITE_TEST_BASE_URL;

function launchChromeAndRunLighthouse(url, opts, config = null) {
    return chromeLauncher.launch({chromeFlags: opts.chromeFlags}).then(chrome => {
        opts.port = chrome.port;
        return lighthouse(url, opts, config).then(results => {
            // use results.lhr for the JS-consumeable output
            // https://github.com/GoogleChrome/lighthouse/blob/master/types/lhr.d.ts
            // use results.report for the HTML/JSON/CSV output as a string
            // use results.artifacts for the trace/screenshots/other specific case you need (rarer)
            return chrome.kill().then(() => results.lhr)
        });
    });
}

const opts = {
    //chromeFlags: ['--show-paint-rects'],
    onlyCategories: ['performance'],
};

// Usage:
launchChromeAndRunLighthouse(siteUrl, opts).then(results => {
    // Use results!
    //console.log(results);
});
