const mod = {

	OLSKEnvSampleFilename () {
		return '.env-sample';
	},

	OLSKEnvKeys (inputData) {
		if (typeof inputData !== 'string') {
			throw new Error('OLSKErrorInputNotValid');
		}

		if (!require('fs').existsSync(inputData)) {
			throw new Error('OLSKErrorInputNotRealFile');
		}

		return Object.keys(require('dotenv').parse(require('fs').readFileSync(inputData, 'utf8')));
	},

	_OLSKEnvGuard (param1, param2) {
		if (typeof param1 !== 'object' || param1 === null) {
			throw new Error('OLSKErrorInputNotValid');
		}

		if (!Array.isArray(param2)) {
			throw new Error('OLSKErrorInputNotValid');
		}

		if (!param2.length) {
			throw new Error('OLSKErrorInputNotValid');
		}

		param2.forEach(function (e) {
			if (typeof e !== 'string') {
				throw new Error('OLSKErrorInputNotValid');
			}

			if (!e.trim()) {
				throw new Error('OLSKErrorInputNotValid');
			}

			if (!param1[e]) {
				throw new Error(`${ e} not defined`);
			}

			if (!param1[e].trim()) {
				throw new Error(`${ e} blank`);
			}
		});
	},

};

Object.assign(exports, mod);
