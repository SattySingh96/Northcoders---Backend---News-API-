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
    expect(output[0].created_at).to.be.an.instanceOf(Date);
  });
  it('When passed an array containing multiple sql timestamp objects, return a new array containing the equivalent JS date objects', () => {
    const output = formatDates([{ created_at: 1511354163389 }, { created_at: 1479818163389 }, { created_at: 1385210163389 }])
    expect(output[0].created_at).to.be.an.instanceOf(Date);
    expect(output[1].created_at).to.be.an.instanceOf(Date);
    expect(output[2].created_at).to.be.an.instanceOf(Date);
  });
  it('When passed an array containing multiple objects, return a new array containing the equivalent objects, with only the JS date object altered, and the rest of the data the same', () => {
    const output = formatDates([{
      title: 'Living in the shadow of a great man',
      topic: 'mitch',
      author: 'butter_bridge',
      body: 'I find this existence challenging',
      created_at: 1542284514171,
      votes: 100
    }])
    expect(output[0].created_at).to.be.an.instanceOf(Date);
  });



});

describe('makeRefObj', () => {
  it('When passed an array containing an empty object, return an empty object', () => {
    expect(makeRefObj([])).to.deep.equal({});
  });
  it('When passed an array containing a single object with two key:value pairs, return an object with both values as a key:value pair', () => {
    const input = [{ A: 1, B: 2 }]
    expect(makeRefObj(input)).to.equal({ 1: 2 })


  });
});

describe('formatComments', () => { });
