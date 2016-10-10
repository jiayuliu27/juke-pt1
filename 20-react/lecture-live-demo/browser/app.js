const React = require('react');
const ReactDOM = require('react-dom');

const Likes = require('./Likes');

const likeData = [{
  subject: 'Literature',
  id: 1
}, {
  subject: 'Philosophy',
  id: 2
}, {
  subject: 'Puppies',
  id: 3
}, {
  subject: 'Fallafell',
  id: 4
}];

ReactDOM.render(
  <div>
    {
      likeData.map(function (likeObj) {
        return (
          <div key={likeObj.id}>
            <Likes />
            <h1>{likeObj.subject}</h1>
          </div>
        );
      })
    }
  </div>,
  document.getElementById('app')
);

