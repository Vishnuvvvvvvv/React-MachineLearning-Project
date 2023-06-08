import React from 'react';
import {Link} from 'react-router-dom'
function Demo() {
const Title = 'Batman'
  return (
    <div>
      <h1>Welcome to the Demo React Page!</h1>
      <p>This is a simple React page.</p>
       <Link to={`/movie/${Title
}`}><img src="https://m.media-amazon.com/images/M/MV5BMTI5NDY2NDUwM15BMl5BanBnXkFtZTYwNzQxMTA3._V1_SX300.jpg"/></Link>
    </div>
  );
}

export default Demo;
