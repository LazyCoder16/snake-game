import './App.css';
import Game from './Game';

function App() {
  return (
    <div className="App">
      <header id="title-container">
        <h3 id="title">GreedySnake</h3>
        <p id="tag-line">Accompolish snake's ambition to become as long as possible!</p>
      </header>

      <Game/>
    </div>
  );
}

export default App;
