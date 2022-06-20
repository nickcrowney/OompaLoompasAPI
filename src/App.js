import './App.css';
import PageRoute from './Components/PageRoute';

function App() {
  return (
    <>
      <div className="App">
        <header className="header">
          <img src={`/logo-umpa-loompa.png`} alt="logo" width={20}></img>
          &nbsp;
          <div>Oompa Loompa's Crew</div>
        </header>

        <PageRoute />
      </div>
    </>
  );
}

export default App;
