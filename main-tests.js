const { throws, deepEqual } = require('assert');

const mod = require('./main.js');

describe('OLSKGuardSampleFilename', function test_OLSKGuardSampleFilename() {

	it('returns string', function() {
		deepEqual(mod.OLSKGuardSampleFilename(), '.env-sample');
	});

});

describe('OLSKGuardThrow', function test_OLSKGuardThrow() {

	it('throws if param1 not object', function() {
		throws(function() {
			mod.OLSKGuardThrow(null, [Math.random().toString()]);
		}, /OLSKErrorInputNotValid/);
	});

	it('throws if param2 not array', function() {
		throws(function() {
			mod.OLSKGuardThrow({}, null);
		}, /OLSKErrorInputNotValid/);
	});

	it('throws if param2 not filled', function() {
		throws(function() {
			mod.OLSKGuardThrow({}, []);
		}, /OLSKErrorInputNotValid/);
	});

	it('throws if param2 element not string', function() {
		throws(function() {
			mod.OLSKGuardThrow({}, [null]);
		}, /OLSKErrorInputNotValid/);
	});

	it('throws if param2 element not filled', function() {
		throws(function() {
			mod.OLSKGuardThrow({}, [' ']);
		}, /OLSKErrorInputNotValid/);
	});

	it('throws if param2 elements not keys of param1', function() {
		const item = Date.now().toString();
		throws(function() {
			mod.OLSKGuardThrow({}, [item]);
		}, new RegExp(`${ item } not defined`));
	});

	it('throws if param1[param2 element] not filled', function() {
		const item = Date.now().toString();
		throws(function() {
			mod.OLSKGuardThrow({
				[item]: ' ',
			}, [item]);
		}, new RegExp(`${ item } blank`));
	});

	it('returns undefined', function() {
		const item = Date.now().toString();
		deepEqual(mod.OLSKGuardThrow({
			[item]: Math.random().toString(),
		}, [item]), undefined);
	});

});
