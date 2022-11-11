import logo from './logo.svg';
import './App.css';

function App() {
  //THIS IS THE YELP API KEY!!!
  // const yelpApiKey = process.env.REACT_APP_API_KEY_YELP
  // console.log('The Yelp API Key is defined in App.js.  You can find it at the top of the App component:  ' + yelpApiKey)

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
