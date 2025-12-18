import React, {useState, useEffect} from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faFloppyDisk} from '@fortawesome/free-solid-svg-icons';
import '../index.css'
import '../App.css'

function Game({ game, removeGame, updateGame, showButtons }) {
    const [editMode, setEditMode] = useState(false);
    const [title, setTitle] = useState('');
    const [platform, setPlatform] = useState('');
    const [genre, setGenre] = useState('');
    const [releaseYear, setReleaseYear] = useState('');
    const [developer, setDeveloper] = useState('');

    useEffect(() => {
        setTitle(game.title);
        setPlatform(game.platform);
        setGenre(game.genre);
        setReleaseYear(game.releaseYear);
        setDeveloper(game.developer);
    }, [game]);

    const saveGame = () => {
        updateGame({
          ...game,
          title,
          platform,
          genre,
          releaseYear: parseInt(releaseYear),
          developer
        });
        setEditMode(false);
    };

  return (
    <div className='game-card-wrapper'>
      <div className="card shadow-sm game-card">

          <img className='cartridge-img' src={`cartridges/${game.platform}.png`} alt=""/>
          <div className={`card-img-overlay ${platform}`}>
            <img className='cover-img' src={game.cover} alt="missing_image"/>
          </div>
          {!editMode && (
            <>
            <ul className='list-group list-group-flush'>
              <li className='list-group-item fw-bold'>{game.title}</li>
              <li className='list-group-item'>{game.platform}</li>
              <li className='list-group-item'>{game.genre}</li>
              <li className='list-group-item'>{game.releaseYear}</li>
              <li className='list-group-item'>{game.developer}</li>
            </ul>
            {showButtons && (
            <div className='card-footer d-flex justify-content-between p-2'>
              <button className='btn btn-sm btn-danger btn-sm' onClick={() => removeGame(game)}>Delete</button>
              <button className='btn btn-sm btn-warning btn-sm' onClick={() => setEditMode(true)}>Edit</button>
            </div>
             )}
          </>
          )}
        {editMode && (
          <div className='p-2'>
          <input className="form-control mb-2" value={title} onChange={e => setTitle(e.target.value)} />
            <input className="form-control mb-2" value={platform} onChange={e => setPlatform(e.target.value)} />
            <input className="form-control mb-2" value={genre} onChange={e => setGenre(e.target.value)} />
            <input className="form-control mb-2" value={releaseYear} onChange={e => setReleaseYear(e.target.value)} />
            <input className="form-control mb-2" value={developer} onChange={e => setDeveloper(e.target.value)} />
            <button className='btn btn-secondary w-100' onClick={saveGame}>
              Save <FontAwesomeIcon icon={faFloppyDisk} />
            </button>
        </div>
        )}
      </div>
    </div>
  );
}

export default Game