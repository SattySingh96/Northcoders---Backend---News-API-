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
    const output = formatDates([{
      title: 'Living in the shadow of a great man',
      topic: 'mitch',
      author: 'butter_bridge',
      body: 'I find this existence challenging',
      created_at: 1542284514171,
      votes: 100
    }]);
    expect(output[0].created_at).to.be.an.instanceOf(Date);
  });
  it('When passed an array containing multiple sql timestamp objects, return a new array containing the equivalent JS date objects', () => {
    const output = formatDates([{
      title: 'Living in the shadow of a great man',
      topic: 'mitch',
      author: 'butter_bridge',
      body: 'I find this existence challenging',
      created_at: 1542284514171,
      votes: 100
    }, {
      title: 'Living in the shadow of a great man',
      topic: 'mitch',
      author: 'butter_bridge',
      body: 'I find this existence challenging',
      created_at: 1479818163389,
      votes: 100
    }, {
      title: 'Living in the shadow of a great man',
      topic: 'mitch',
      author: 'butter_bridge',
      body: 'I find this existence challenging',
      created_at: 1385210163389,
      votes: 100
    }])
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
  it('When passed an empty array, return a new empty object', () => {
    expect(makeRefObj([])).to.deep.equal({});
  });
  it('When passed an array containing a single object, return a reference object with title & article_id as the key:value pair', () => {
    const input = [{
      article_id: 1,
      title: 'Living in the shadow of a great man',
      topic: 'mitch',
      author: 'butter_bridge',
      body: 'I find this existence challenging',
      created_at: 1542284514171,
      votes: 100,
    }]
    expect(makeRefObj(input, 'title', 'article_id')).to.deep.equal({ 'Living in the shadow of a great man': 1 });
  });
  it('When passed an array containing multiple objects, return a reference object with multiple pairs, each with article_id and title as the key & value, respectively', () => {
    const input = [{
      article_id: 1,
      title: 'Living in the shadow of a great man',
      topic: 'mitch',
      author: 'butter_bridge',
      body: 'I find this existence challenging',
      created_at: 1542284514171,
      votes: 100,
    },
    {
      article_id: 2,
      title: 'Sony Vaio; or, The Laptop',
      topic: 'mitch',
      author: 'icellusedkars',
      body:
        'Call me Mitchell. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would buy a laptop about a little and see the codey part of the world. It is a way I have of driving off the spleen and regulating the circulation. Whenever I find myself growing grim about the mouth; whenever it is a damp, drizzly November in my soul; whenever I find myself involuntarily pausing before coffin warehouses, and bringing up the rear of every funeral I meet; and especially whenever my hypos get such an upper hand of me, that it requires a strong moral principle to prevent me from deliberately stepping into the street, and methodically knocking people’s hats off—then, I account it high time to get to coding as soon as I can. This is my substitute for pistol and ball. With a philosophical flourish Cato throws himself upon his sword; I quietly take to the laptop. There is nothing surprising in this. If they but knew it, almost all men in their degree, some time or other, cherish very nearly the same feelings towards the the Vaio with me.',
      created_at: 1416140514171,
    },
    {
      article_id: 3,
      title: 'Eight pug gifs that remind me of mitch',
      topic: 'mitch',
      author: 'icellusedkars',
      body: 'some gifs',
      created_at: 1289996514171,
    }]
    expect(makeRefObj(input, 'title', 'article_id')).to.deep.equal({ 'Living in the shadow of a great man': 1, 'Sony Vaio; or, The Laptop': 2, 'Eight pug gifs that remind me of mitch': 3 });
  });
});

describe('formatComments', () => {
  it('when passed an empty array, and no refObj, return a new empty array', () => {
    expect(formatComments([])).to.deep.equal([])
  });
  it('when passed an array containing a comments object, and an article reference, format the object so that: The created_by & belongs_to properties becomes author & article_id, The article_id value becomes equal to the value in the reference object, and the created_at timestamp is changed to JS date object', () => {
    const refObj = { "They're not exactly dogs, are they?": 1 };
    const input = [{
      body:
        "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
      belongs_to: "They're not exactly dogs, are they?",
      created_by: 'butter_bridge',
      votes: 16,
      created_at: 1511354163389
    }]
    expect(formatComments(input, refObj)).to.deep.equal([{
      body:
        "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
      article_id: 1,
      author: 'butter_bridge',
      votes: 16,
      created_at: new Date(1511354163389)
    }])
  });
});
