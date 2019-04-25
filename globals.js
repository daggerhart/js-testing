import chromedriver from 'chromedriver';

/**
 * References
 *
 * @link http://nightwatchjs.org/guide/#external-globals
 * @link https://github.com/nightwatchjs/nightwatch/blob/master/examples/globalsModule.js
 */
module.exports = {
    // this controls whether to abort the test execution when an assertion failed and skip the rest
    // it's being used in waitFor commands and expect assertions
    abortOnAssertionFailure: true,

    // this will overwrite the default polling interval (currently 500ms) for waitFor commands
    // and expect assertions that use retry
    waitForConditionPollInterval: 500,

    // default timeout value in milliseconds for waitFor commands and implicit waitFor value for
    // expect assertions
    waitForConditionTimeout: 20000,

    // this will cause waitFor commands on elements to throw an error if multiple
    // elements are found using the given locate strategy and selector
    throwOnMultipleElementsReturned: false,

    // controls the timeout value for async hooks. Expects the done() callback to be invoked within this time
    // or an error is thrown
    asyncHookTimeout: 20000,

    // controls the timeout value for when running async unit tests. Expects the done() callback to be invoked within this time
    // or an error is thrown
    unitTestsTimeout: 2000,

    // controls the timeout value for when executing the global async reporter. Expects the done() callback to be invoked within this time
    // or an error is thrown
    customReporterCallbackTimeout: 20000,

    // Automatically retrying failed assertions - You can tell Nightwatch to automatically retry failed assertions until a given timeout is reached, before the test runner gives up and fails the test.
    retryAssertionTimeout: 1000,

    before(cb) {
        if (JSON.parse(process.env.SITE_TEST_CHROMEDRIVER_AUTOSTART)) {
            chromedriver.start();
        }
        cb();
    },

    after(done) {
        if (JSON.parse(process.env.SITE_TEST_CHROMEDRIVER_AUTOSTART)) {
            chromedriver.stop();
        }
        done();
    },

    /**
     * Custom reporter.
     *
     * @param results
     * @param done
     */
    reporter(results, done) {
        // results.modules.{modulename}.assertionsCount
        // results.modules.{modulename}.time
        //console.log(results);
        done();
    }
};
