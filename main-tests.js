const { throws, deepEqual } = require('assert');

const mod = require('./main.js');

describe('OLSKEnvSampleFilename', function test_OLSKEnvSampleFilename() {

	it('returns string', function() {
		deepEqual(mod.OLSKEnvSampleFilename(), '.env-sample');
	});

});

describe('OLSKEnvKeys', function test_OLSKEnvKeys() {

	it('throws if not string', function () {
		throws(function () {
			mod.OLSKEnvKeys(null);
		}, /OLSKErrorInputNotValid/);
	});

	it('throws if not real', function () {
		throws(function () {
			mod.OLSKEnvKeys(Math.random().toString());
		}, /OLSKErrorInputNotRealFile/);
	});

	it('returns array', function() {
		deepEqual(mod.OLSKEnvKeys(require('path').join(__dirname, mod.OLSKEnvSampleFilename())), ['ALFA']);
	});

});

describe('OLSKEnvGuard', function test_OLSKEnvGuard() {

	it('throws if param1 not object', function() {
		throws(function() {
			mod.OLSKEnvGuard(null, [Math.random().toString()]);
		}, /OLSKErrorInputNotValid/);
	});

	it('throws if param2 not array', function() {
		throws(function() {
			mod.OLSKEnvGuard({}, null);
		}, /OLSKErrorInputNotValid/);
	});

	it('throws if param2 not filled', function() {
		throws(function() {
			mod.OLSKEnvGuard({}, []);
		}, /OLSKErrorInputNotValid/);
	});

	it('throws if param2 element not string', function() {
		throws(function() {
			mod.OLSKEnvGuard({}, [null]);
		}, /OLSKErrorInputNotValid/);
	});

	it('throws if param2 element not filled', function() {
		throws(function() {
			mod.OLSKEnvGuard({}, [' ']);
		}, /OLSKErrorInputNotValid/);
	});

	it('throws if param2 elements not keys of param1', function() {
		const item = Date.now().toString();
		throws(function() {
			mod.OLSKEnvGuard({}, [item]);
		}, new RegExp(`${ item } not defined`));
	});

	it('throws if param1[param2 element] not filled', function() {
		const item = Date.now().toString();
		throws(function() {
			mod.OLSKEnvGuard({
				[item]: ' ',
			}, [item]);
		}, new RegExp(`${ item } blank`));
	});

	it('returns undefined', function() {
		const item = Date.now().toString();
		deepEqual(mod.OLSKEnvGuard({
			[item]: Math.random().toString(),
		}, [item]), undefined);
	});

});
