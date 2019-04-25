# Testing

Setup:

* `npm install`
* `cp .env.example .env`
* Edit the new `.env` file. Set `SITE_TEST_BASE_URL` to your target url. 


## Nightwatch - Functional

Use nightwatch for writing functional tests.

```
npm run test:functional
```

### Writing Tests

Create new tests in the `tests/functional` folder. They will be picked up automatically.

### Writing Commands

Create new commands (methods that get attached to the `browser` object) in the `commands` folder. They will get picked up automatically.

### References

* [Nightwatch Docs](http://nightwatchjs.org/guide)
* [Nightwatch API](http://nightwatchjs.org/api)
* [Globals](http://nightwatchjs.org/guide/#external-globals)
* [Globals module example](https://github.com/nightwatchjs/nightwatch/blob/master/examples/globalsModule.js)

## Lighthouse - Performance

Use lighthouse for performance testing.

```
npm run test:lighthouse
```


### References

* [Lighthouse package](https://github.com/GoogleChrome/lighthouse)
* [Programmatic example](https://github.com/GoogleChrome/lighthouse/blob/master/docs/readme.md#using-programmatically)
* [Example usage](https://github.com/justinribeiro/lighthouse-jest-example)
