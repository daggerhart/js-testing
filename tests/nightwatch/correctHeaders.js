import request from 'request';
import assert from 'assert';

/**
 *
 * @param pathname
 * @param callback
 * @returns {Promise<void>}
 */
async function getHeaders(pathname, callback) {
    const options = {
        method: 'HEAD',
    };

    await request(`${process.env.SITE_TEST_BASE_URL}${pathname}`, options, (error, response, body) => {
        if (typeof callback === 'function') {
            callback(response.headers);
        }
    });
}

/**
 * Because HTTP headers do not exist in the DOM, we must check these with unit tests.
 *
 * @type {{}}
 */
module.exports = {
    '@unitTest' : true,

    '/sitemap.xml x-robots-tag: noindex': (done) => {
        getHeaders('/sitemap.xml', (headers) => {
            assert.equal(headers['x-robots-tag'], 'noindex');
            done();
        })
    },
};
