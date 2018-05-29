const expect = require('chai').expect;

if (process.env.NODE_ENV !== 'testing') {
	console.log('Please change env files');
	process.exit(1);
}

describe('Test case description', () => {
	it('Scenario', done => {
		expect(0).to.be.equal(0);
		done();
	});
});
