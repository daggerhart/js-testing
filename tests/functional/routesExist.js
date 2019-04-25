module.exports = {
    //'@tags': ['pages'],
    before(browser) {},
    after(browser) {},

    'robots.txt': browser => {
        browser.siteUrl('/robots.txt')
            .waitForElementVisible('body')
            .assert.containsText('body', 'User-agent: *')
            .assert.containsText('body', 'Sitemap:')
        ;
    },
    'sitemap.xml': browser => {
        browser.siteUrl('/sitemap.xml')
            .assert.elementPresent('sitemapindex');
    },
    'Home page': browser => {
        browser.siteUrl('/')
            .waitForElementVisible('.footer-bottom-content')
            .assert.containsText('.footer-bottom-content', 'All Rights Reserved');
    }
};
