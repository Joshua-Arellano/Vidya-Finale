import React, {useState} from 'react'
import {nanoid} from 'nanoid'
import "../App.css"

function AddGame({ addGame }) {

    const [title, setTitle] = useState('');
    const [platform, setPlatform] = useState('');
    const [genre, setGenre] = useState('');
    const [releaseYear, setReleaseYear] = useState('');
    const [developer, setDeveloper] = useState('');
    const [selectedCover, setSelectedCover] = useState();

    const doWork = () => {
        const newGame = {
            'id':nanoid(),
            title,
            platform,
            genre,
            releaseYear: parseInt(releaseYear),
            developer,
            cover: URL.createObjectURL(selectedCover)
        };
        addGame(newGame);

        setTitle('');
        setPlatform('');
        setGenre('');
        setReleaseYear('');
        setDeveloper('');
        setSelectedCover();
    }

    const imageUpdate = (e) => {
      setSelectedCover(e.target.files[0]);
    }
    
  return (
    <div className="retro-panel mt-5 p-4" id="addGame">
      <h3 className="retro-title mb-4">Add New Game</h3>

      <div className="row g-3">

        <div className="col-md-4">
          <label className="retro-label">Title</label>
          <input
            type="text"
            className="form-control retro-input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="col-md-4">
          <label className="retro-label">Platform</label>
          <input
            type="text"
            className="form-control retro-input"
            value={platform}
            onChange={(e) => setPlatform(e.target.value)}
          />
        </div>

        <div className="col-md-4">
          <label className="retro-label">Genre</label>
          <input
            type="text"
            className="form-control retro-input"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
          />
        </div>

        <div className="col-md-4">
          <label className="retro-label">Release Year</label>
          <input
            type="text"
            className="form-control retro-input"
            value={releaseYear}
            onChange={(e) => setReleaseYear(e.target.value)}
          />
        </div>

        <div className="col-md-4">
          <label className="retro-label">Developer</label>
          <input
            type="text"
            className="form-control retro-input"
            value={developer}
            onChange={(e) => setDeveloper(e.target.value)}
          />
        </div>

        <div className="col-md-4">
          <label className="retro-label">Cover Image</label>
          <input
            type="file"
            name='file'
            id='fileUpload'
            className="form-control retro-input"
            onChange={imageUpdate}
          />
        </div>

        <div className="col-12 text-end mt-3">
          <button className="retro-btn" onClick={doWork}>
            + Add Game
          </button>
        </div>
      </div>
    </div>
  )
}

export default AddGame