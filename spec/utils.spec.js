const { expect } = require('chai');
const {
  formatDates,
  makeRefObj,
  formatComments,
} = require('../db/utils/utils');

describe('formatDates', () => {
  it('When passed an empty array, return a new empty array', () => {
    const input = [];
    expect(formatDates(input)).to.deep.equal([]);
    expect(formatDates(input)).to.not.equal(input);
  });
  it('When passed an array, do not mutate the array', () => {
    const originalInput = [{}];
    formatDates(originalInput);
    expect(originalInput).to.equal(originalInput)
  });
  it('When passed an array containing an sql timestamp object, return a new array containing the equivalent JS date object', () => {
    const output = formatDates([{ created_at: 1511354163389 }]);
    expect(output[0]).to.be.an.instanceOf(Date);
  });
  it('When passed an array containing multiple sql timestamp objects, return a new array containing the equivalent JS date objects', () => {
    const output = formatDates([{ created_at: 1511354163389 }, { created_at: 1479818163389 }, { created_at: 1385210163389 }])
    expect(output[0]).to.be.an.instanceOf(Date);
    expect(output[1]).to.be.an.instanceOf(Date);
    expect(output[2]).to.be.an.instanceOf(Date);
  });



});

describe('makeRefObj', () => { });

describe('formatComments', () => { });
