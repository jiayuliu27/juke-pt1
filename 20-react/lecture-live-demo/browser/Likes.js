const React = require('react');

// function fetchLikesInLocalStorage () {
//   return JSON.parse(localStorage.getItem('total_likes'));
// }

// class Likes extends React.Component {
//   constructor () {
//     super();
//     this.state = {
//       total: null
//     };
//   }
//   componentDidMount () {
//     setTimeout(() => {
//       let total = localStorage.getItem('total_likes');
//       if (!total) {
//         localStorage.setItem('total_likes', 0);
//         total = 0;
//       }
//       this.setState({
//         total: total
//       });
//     }, 2000);
//   }
//   render () {
//     return (
//       <div>
//         <div>
//           <input
//             onClick={() => {
//               localStorage.setItem('total_likes', this.state.total + 1);
//               // two thigns
//               // 1) changes `this.state`
//               // 2) rerenders the component instance (`this`)
//               this.setState({
//                 total: this.state.total + 1
//               });
//             }}
//             type="submit"
//             value="Increase likes" />
//         </div>
//         <div>This has {this.state.total === null ? 'LOADING' : this.state.total} likes</div>
//       </div>
//     );
//   }
// }

class Likes extends React.Component {
  constructor () {
    super();
    this.state = {
      total: 0
    };
  }
  componentDidMount () {
    // nothin for now
  }
  render () {
    return (
      <div>
        <div>
          <input
            onClick={() => {
              // two thigns
              // 1) changes `this.state`
              // 2) rerenders the component instance (`this`)
              this.setState({
                total: this.state.total + 1
              });
            }}
            type="submit"
            value="Increase likes" />
        </div>
        <div>This has {this.state.total} likes</div>
      </div>
    );
  }
}

module.exports = Likes;
