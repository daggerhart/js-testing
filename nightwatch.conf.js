import glob from 'glob';

let collectedTests = [];

glob.sync("tests/nightwatch/**/*.js").forEach(file => {
    collectedTests.push(file);
});

module.exports = {
    src_folders: collectedTests,
    custom_commands_path: 'commands',
    output_folder: process.env.SITE_NIGHTWATCH_OUTPUT,
    globals_path: './globals.js',
    test_settings: {
        default: {
            selenium_port: process.env.SITE_TEST_WEBDRIVER_PORT,
            selenium_host: process.env.SITE_TEST_WEBDRIVER_HOSTNAME,
            default_path_prefix: process.env.SITE_TEST_WEBDRIVER_PATH_PREFIX || '',
            desiredCapabilities: {
                browserName: 'chrome',
                acceptSslCerts: true,
                chromeOptions: {
                    args: process.env.SITE_TEST_WEBDRIVER_CHROME_ARGS
                        ? process.env.SITE_TEST_WEBDRIVER_CHROME_ARGS.split(' ')
                        : [],
                },
            },
            screenshots: {
                enabled: true,
                on_failure: true,
                on_error: true,
                path: `${process.env.SITE_NIGHTWATCH_OUTPUT}/screenshots`,
            },
            end_session_on_fail: false,
        },
    },
};
