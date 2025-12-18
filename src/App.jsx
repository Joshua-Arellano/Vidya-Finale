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
  const [genre, setGenre] = useState('');
  const [developer, setDeveloper] = useState('');
  const [showButtons, setShowButtons] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

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
  cover: 'images/oot.jpg'
}, {
  id: nanoid(),
  title: 'Gex-64: Enter the Gecko',
  platform: 'N64',
  genre: 'Platformer',
  releaseYear: 1995,
  developer: 'Crystal Dynamics',
  cover: 'images/gex64.jpg'
}, {
  id: nanoid(),
  title: 'Silent Hill',
  platform: 'PSX',
  genre: 'Horror',
  releaseYear: 1999,
  developer: 'Konami',
  cover: 'images/silent-hill.png'
}, {
  id: nanoid(),
  title: 'Castlevania: Symphony of the Night',
  platform: 'PSX',
  genre: 'Action-Adventure',
  releaseYear: 1997,
  developer: 'Konami',
  cover: '/images/sotn.png'
}, {
  id: nanoid(),
  title: 'Phantasy Star II',
  platform: 'Genesis',
  genre: 'RPG',
  releaseYear: 1989,
  developer: 'Sega',
  cover: '/images/phs2.png'
}, {
  id: nanoid(),
  title: 'Super Mario World',
  platform: 'SNES',
  genre: 'Platformer',
  releaseYear: 1990,
  developer: 'Nintendo',
  cover: 'images/super-metroid.jpg'
}, {
  id: nanoid(),
  title: 'Super Mario Bros. 3',
  platform: 'NES',
  genre: 'Action',
  releaseYear: 1984,
  developer: 'Nintendo',
  cover: 'images/smb3.jpg'
}]

useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('games'));
    stored ? saveGames(stored) : saveGames(games);
}, []);

const saveGames = (games) => {
  setAllGames(games);
  setSearchResults(games);
  localStorage.setItem('games', JSON.stringify(games));
}

const addGame = (newGame) => saveGames([...allGames, newGame]);

const removeGame = (gameToDelete) => saveGames(allGames.filter(g => g.id !== gameToDelete.id));

const updateGame = (updatedGame) => saveGames(allGames.map(g => g.id === updatedGame.id ? updatedGame : g));

const searchGames = () => {
  let results = allGames;

  if (keywords) {
    const key = keywords.toLowerCase();
    results = results.filter(g => g.title.toLowerCase().includes(key));
  }

if (releaseYear) results = results.filter(g => g.releaseYear === parseInt(releaseYear));
    if (genre) results = results.filter(g => g.genre === genre);
    if (developer) results = results.filter(g => g.developer === developer);

  setSearchResults(results);
};



return (
  <div className="app-layout">
    
    {/* Toggle button for mobile */}
    <button 
      className="toggle-search-btn btn btn-primary d-md-none"
      onClick={() => setShowSearch(prev => !prev)}
    >
      &#9776;
    </button>

    {/* Sidebar Search Panel */}
    <div className={`search-sidebar ${showSearch ? 'open' : ''}`}>
      <div className='card p-3 mb-4 shadow-sm' id='searchGames'>
        <h3 className='mb-3'>Search Games</h3>
        <div className="row g-3">

          <div className="col-12">
            <label htmlFor="txtKeywords">Search by Title</label>
            <input type="text" className='form-control' placeholder='Enter Game Title' onChange={(e) => setKeywords(e.currentTarget.value)} value={keywords} />
          </div>

          <div className="col-12">
            <label htmlFor="selYear">Select Release Year</label>
            <select value={releaseYear} onChange={ (e) => setReleaseYear(e.currentTarget.value)} className='form-select' id="selYear">
              <option value=''>Select Release Year</option>
              {_(allGames).map(game => game.releaseYear).sort().uniq().map(year => <option key={year} value={year}>{year}</option>).value()}
            </select>
          </div>

          <div className="col-12">
            <label htmlFor="txtGenre">Select Genre</label>
            <select value={genre} onChange={ (e) => setGenre(e.currentTarget.value)} className='form-select' id="txtGenre">
              <option value=''>Select Genre</option>
              {_(allGames).map(game => game.genre).sort().uniq().map(genre => <option key={genre} value={genre}>{genre}</option>).value()}
            </select>
          </div>

          <div className="col-12">
            <label htmlFor="txtDeveloper">Select Developer</label>
            <select value={developer} onChange={ (e) => setDeveloper(e.currentTarget.value)} className='form-select' id="txtDeveloper">
              <option value=''>Select Developer</option>
              {_(allGames).map(game => game.developer).sort().uniq().map(developer => <option key={developer} value={developer}>{developer}</option>).value()}
            </select>
          </div>

          <div className="col-12 text-end">
            <button type='button' className='btn btn-primary btn-lg w-100' onClick={searchGames}>
              Search Games <FontAwesomeIcon icon={faSearch}/>
            </button>
          </div>

        </div>
      </div>
    </div>

    {/* Main Content */}
    <div className="main-content">
      <AddGame addGame={addGame}/>
      <div className="d-flex justify-content-between align-items-center mb-3" id='allGames'>
        <h2>Current Games</h2>
        <button className='btn btn-warning' onClick={() => setShowButtons(prev => !prev)}>Edit Games</button>
      </div>

      <div className='games-grid'>
        {searchResults.map(game => (
          <Game key={game.id} game={game} removeGame={removeGame} updateGame={updateGame} showButtons={showButtons}/>
        ))}
      </div>
    </div>

  </div>
);
}

export default App