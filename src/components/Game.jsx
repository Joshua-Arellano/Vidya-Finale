import React, {useState, useEffect} from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faFloppyDisk} from '@fortawesome/free-solid-svg-icons';

function Game(props) {
    const [editMode, setEditMode] = useState(false);
    const [title, setTitle] = useState('');
    const [platform, setPlatform] = useState('');
    const [genre, setGenre] = useState('');
    const [releaseYear, setReleaseYear] = useState('');
    const [developer, setDeveloper] = useState('');

    useEffect(() => {
        setTitle(props.game.title);
        setPlatform(props.game.platform);
        setGenre(props.game.genre);
        setReleaseYear(props.game.releaseYear);
        setDeveloper(props.game.developer);
    }, []);

    const saveGame = () => {
        setEditMode(false);
        const updatedGame = {title:title, platform:platform, genre:genre, releaseYear:parseInt(releaseYear), developer:developer, id:props.game.id, cover:props.game.cover};
        props.updateGame(updatedGame);
    }
  return (
    <div>
      <div className="card">
            <img src={props.game.cover} alt="missing_image" className='card-image-top mx-auto'/>
            {!editMode &&
            <ul className='list-group list-group-flush'>
              <li className='list-group-item'>{props.game.title}</li>
              <li className ='list-group-item'>{props.game.platform}</li>
              <li className='list-group-item'>{props.game.genre}</li>
              <li className='list-group-item'>{props.game.releaseYear}</li>
              <li className='list-group-item'>{props.game.developer}</li>
              <button type='button' className='btn btn-sm btn-danger btn-lg' onClick={() => props.removeGame(props.game)}>Delete</button>
              <button type='button' className='btn btn-sm btn-warning btn-lg' onClick={() => setEditMode(true)}>Edit</button>
            </ul>
            }
            {editMode && <ul className='list-group list-group-flush'>
              <li className='list-group-item text-center'><input type='text' className='form-control' value={title}onChange={(e) => setTitle(e.currentTarget.value)} /></li>
              <li className='list-group-item text-center'><input type='text' className='form-control' value={platform} onChange={(e) => setPlatform(e.currentTarget.value)} /></li>
              <li className='list-group-item text-center'><input type='text' className='form-control' value={genre} onChange={(e) => setGenre(e.currentTarget.value)} /></li>
              <li className='list-group-item text-center'><input type='text' className='form-control' value={releaseYear} onChange={(e) => setReleaseYear(e.currentTarget.value)} /></li>
              <li className='list-group-item text-center'><input type='text' className='form-control' value={developer} onChange={(e) => setDeveloper(e.currentTarget.value)} /></li>
              <li className='list-group-item text-center'><button type='button' className='btn btn-secondary' onClick={saveGame}>Save<FontAwesomeIcon icon={faFloppyDisk} /></button></li>
            </ul>}
      </div>
    </div>
  )
}

export default Game