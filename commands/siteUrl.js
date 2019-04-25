/**
 * Concatenate a SITE_TEST_BASE_URL variable and a pathname.
 *
 * This provides a custom command, .siteUrl()
 *
 * @param {string} pathname
 *   The relative path to append to SITE_TEST_BASE_URL
 * @param {function} callback
 *   A callback which will be called.
 * @return {object}
 *   The 'browser' object.
 */
exports.command = function siteUrl(pathname, callback) {
    const self = this;
    this.url(`${process.env.SITE_TEST_BASE_URL}${pathname}`);

    if (typeof callback === 'function') {
        callback.call(self);
    }
    return this;
};
