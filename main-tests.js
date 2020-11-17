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
		deepEqual(mod.OLSKEnvKeys(require('path').join(process.cwd(), mod.OLSKEnvSampleFilename())), ['ALFA']);
	});

});

describe('_OLSKEnvGuard', function test__OLSKEnvGuard() {

	it('throws if param1 not object', function() {
		throws(function() {
			mod._OLSKEnvGuard(null, [Math.random().toString()]);
		}, /OLSKErrorInputNotValid/);
	});

	it('throws if param2 not array', function() {
		throws(function() {
			mod._OLSKEnvGuard({}, null);
		}, /OLSKErrorInputNotValid/);
	});

	it('throws if param2 not filled', function() {
		throws(function() {
			mod._OLSKEnvGuard({}, []);
		}, /OLSKErrorInputNotValid/);
	});

	it('throws if param2 element not string', function() {
		throws(function() {
			mod._OLSKEnvGuard({}, [null]);
		}, /OLSKErrorInputNotValid/);
	});

	it('throws if param2 element not filled', function() {
		throws(function() {
			mod._OLSKEnvGuard({}, [' ']);
		}, /OLSKErrorInputNotValid/);
	});

	it('throws if param2 elements not keys of param1', function() {
		const item = Date.now().toString();
		throws(function() {
			mod._OLSKEnvGuard({}, [item]);
		}, new RegExp(`${ item } not defined. Please update the .env file`));
	});

	it('throws if param1[param2 element] not filled', function() {
		const item = Date.now().toString();
		throws(function() {
			mod._OLSKEnvGuard({
				[item]: ' ',
			}, [item]);
		}, new RegExp(`${ item } blank. Please update the .env file`));
	});

	it('returns undefined', function() {
		const item = Date.now().toString();
		deepEqual(mod._OLSKEnvGuard({
			[item]: Math.random().toString(),
		}, [item]), undefined);
	});

});

describe('OLSKEnvGuard', function test_OLSKEnvGuard() {

	beforeEach(function () {
		delete process.env.ALFA;

		deepEqual(process.env.ALFA, undefined);
	});

	it('sets .env variables', function() {
		const item = Date.now().toString();

		require('fs').writeFileSync(require('path').join(process.cwd(), '.env'), 'ALFA=' + item);

		mod.OLSKEnvGuard();

		deepEqual(process.env.ALFA, item);
	});

	it('sets .env.crypto variables', function() {
		const item = Date.now().toString();

		require('fs').writeFileSync(require('path').join(process.cwd(), '.env'), 'BRAVO=' + item);
		require('fs').writeFileSync(require('path').join(process.cwd(), '.env.crypto'), 'ALFA=' + item);

		mod.OLSKEnvGuard();

		deepEqual(process.env.ALFA, item);
	});

	it('calls _OLSKEnvGuard', function() {
		deepEqual(Object.assign(Object.assign({}, mod), {
			_OLSKEnvGuard: (function () {
				return Array.from(arguments);
			}),
		}).OLSKEnvGuard(), [process.env, mod.OLSKEnvKeys(mod.OLSKEnvSampleFilename())]);
	});

});
