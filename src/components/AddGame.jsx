import React, {useState} from 'react'
import {nanoid} from 'nanoid'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

function AddGame(props) {
    const [title, setTitle] = useState('');
    const [platform, setPlatform] = useState('');
    const [genre, setGenre] = useState('');
    const [releaseYear, setReleaseYear] = useState('');
    const [developer, setDeveloper] = useState('');
    const [selectedCover, setSelectedCover] = useState(null);

    const doWork = () => {
        const newGame = {
            'id':nanoid(),
            'title':title,
            'platform':platform,
            'genre':genre,
            'releaseYear': parseInt(releaseYear),
            'developer':developer,
            'cover':URL.createObjectURL(selectedCover)
        };
        props.addGame(newGame);

            setTitle('');
            setPlatform('');
            setGenre('');
            setReleaseYear('');
            setDeveloper('');
            setSelectedCover(null);
    }

    const imageUpdate = (e) => {
        setSelectedCover(e.target.files[0]);
    }
  return (
    <>
    <div className="row mt-5" id='addGame'>
        <h3>Add Game</h3>
        <div className='col-md-2'>
            <label htmlFor="txtTitle" className='form-label'>Title</label>
            <input type="text" id='txtTitle' className='form-control' onChange={(e) => setTitle(e.currentTarget.value)} value={title} />
        </div>
        <div className="col-md-2">
            <label htmlFor="txtPlatform" className='form-label'>Platform</label>
            <input type="text" id='txtPlatform' className='form-control' onChange={(e) => setPlatform(e.currentTarget.value)} value={platform} />
        </div>
        <div className="col-md-2">
            <label htmlFor="txtGenre" className='form-label'>Genre</label>
            <input type="text" id='txtGenre' className='form-control' onChange={(e) => setGenre(e.currentTarget.value)} value={genre} />
        </div>
        <div className="col-md-2">
            <label htmlFor="txtReleaseYear" className='form-label'>Release Year</label>
            <input type="text" id='txtReleaseYear' className='form-control' onChange={(e) => setReleaseYear(e.currentTarget.value)} value={releaseYear} />
        </div>
        <div className="col-md-2">
            <label htmlFor="txtDeveloper" className='form-label'>Developer</label>
            <input type="text" id='txtDeveloper' className='form-control' onChange={(e) => setDeveloper(e.currentTarget.value)} value={developer} />
        </div>
        <div className="col-md-2">
            <label htmlFor="fileUpload" className='form-label'>Cover</label>
            <input type="file" name='file' id='fileUpload' onChange={imageUpdate} />
        </div>
        <div className="col-md-2">
            <button type='button' id='btnAdd' className='btn btn-success btn-lg' onClick={doWork}>Add Game</button>
        </div>
    </div>
    </>
  )
}

export default AddGame