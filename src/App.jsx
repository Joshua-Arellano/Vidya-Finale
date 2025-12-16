import { useEffect, useState } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import {nanoid} from 'nanoid'
import AddGame from './components/AddGame'
import Game from './components/Game'
import _ from 'lodash'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

function App() {

  const [allGames, setAllGames] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [keywords, setKeywords] = useState('');
  const [releaseYear, setReleaseYear] = useState('');

  useEffect(() => {
    if(localStorage){
      const gamesLocalStorage = JSON.parse(localStorage.getItem('games'));

      if(gamesLocalStorage){
        saveGames(gamesLocalStorage);
      }else{
        saveGames(games);
      }
  }
}, []);

const addGame = (newGame) => {
  const updatedGames = [...allGames, newGame];
  saveGames(updatedGames);
}
const saveGames = (games) => {
  setAllGames(games);
  setSearchResults(games);
  if(localStorage){
    localStorage.setItem('games', JSON.stringify(games));
    console.log("Saved to local storage");
  }
}

const removeGame = (gameToDelete) => {
  const updatedGamesArray = allGames.filter(game => game.id !== gameToDelete.id);
  saveGames(updatedGamesArray);
}

const updateGame = (updatedGame) => {
  const updatedGameArray = allGames.map(game => game.id === updatedGame.id ? {...game, ...updatedGame} : game);
  saveGames(updatedGameArray);
}

const searchGames = () => {
  let searchResults = allGames;

  if (keywords) {
    const keywordLower = keywords.toLowerCase();
    searchResults = searchResults.filter(game =>
      game.title.toLowerCase().includes(keywordLower)
    );
  }

  if (releaseYear) {
    searchResults = searchResults.filter(game =>
      game.releaseYear === parseInt(releaseYear)
    );
  }

  setSearchResults(searchResults);
};

const games = [{
  id: nanoid(),
  title: 'Glover',
  platform: 'N64',
  genre: 'Platformer',
  releaseYear: 1998,
  developer: 'Interactive Studios',
  cover: 'images/glover.jpg'
}, {
  id: nanoid(),
  title: 'The Legend of Zelda: Ocarina of Time',
  platform: 'N64',
  genre: 'Action-Adventure',
  releaseYear: 1998,
  developer: 'Nintendo',
  cover: './assets/oot.jpg'
}, {
  id: nanoid(),
  title: 'Gex',
  platform: 'PSX, Saturn',
  genre: 'Platformer',
  releaseYear: 1995,
  developer: 'Crystal Dynamics',
  cover: './assets/gex.jpg'
}, {
  id: nanoid(),
  title: 'IQ Intelligent Qube',
  platform: 'PSX',
  genre: 'Puzzle',
  releaseYear: 1997,
  developer: 'Genius Sonority',
  cover: './assets/iq.jpg'
}, {
  id: nanoid(),
  title: 'Castlevania: Symphony of the Night',
  platform: 'PSX, Saturn',
  genre: 'Action-Adventure',
  releaseYear: 1997,
  developer: 'Konami',
  cover: './assets/sotn.jpg'
}, {
  id: nanoid(),
  title: 'Phantasy Star II',
  platform: 'Sega Genesis',
  genre: 'RPG',
  releaseYear: 1989,
  developer: 'Sega',
  cover: './assets/phs2.jpg'
}, {
  id: nanoid(),
  title: 'Super Mario World',
  platform: 'SNES',
  genre: 'Platformer',
  releaseYear: 1990,
  developer: 'Nintendo',
  cover: './assets/smw.jpg'
}, {
  id: nanoid(),
  title: 'Balloon Fight',
  platform: 'NES',
  genre: 'Action',
  releaseYear: 1984,
  developer: 'Nintendo',
  cover: './assets/balloonfight.jpg'
}]

return (
    <div className="container">
      <div className='row my-3' id='searchGames'>
        <h3>Search Games</h3>
        <div className="col-md-4">
          <label htmlFor="txtKeywords">Search by Title</label>
          <input type="text" className='form-control' placeholder='Enter Game Title' onChange={(e) => setKeywords(e.currentTarget.value)} value={keywords} />
        </div>
        <div className="col-md-4">
          <select value={releaseYear} onChange={ (e) => setReleaseYear(e.currentTarget.value)} className='form-select'>
            <option value=''>Select Release Year</option>
            {_(allGames).map(game => game.releaseYear).sort().uniq().map(year => <option key={year} value={year}>{year}</option>).value()}
          </select>
        </div>
        <div className='col-md-4'>
          <button type='button' className='btn btn-primary btn-lg' onClick={searchGames}>Search Games <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon></button>
        </div>
      </div>
      <div className="row" id='allGames'>
        <h2>Current Games</h2>
        {searchResults && searchResults.map((game) =>
        (
          <div className="col-md-3" key={game.id}>
            <Game game={game} removeGame={removeGame} updateGame={updateGame}/>
          </div>)
        )}
      </div>
      <AddGame addGame={addGame}/>
    </div>
  )
}

export default App