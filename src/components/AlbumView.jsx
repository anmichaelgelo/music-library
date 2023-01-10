// These components will be making separate API calls from the app
// component to serve specific data about a given album
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

function AlbumView() {
    const nav = useNavigate()
    const { id } = useParams()
    const [ albumData, setAlbumData ] = useState([])

    useEffect(() => {
        const API_URL = `http://localhost:4000/song/${id}`
        const fetchData = async () => {
            const response = await fetch(API_URL)
            const data = await response.json()

            setAlbumData(data.results)
        }

        fetchData()
    }, [id])  

    const justSongs = albumData.filter(entry => entry.wrapperType === 'track')

    const renderSongs = justSongs.map((song, i) => {
        return (
            <div key={i}>
                <p>{song.trackName}</p>
            </div>
        )
    })

    const navButtons = () => {
        return (
            <div>
                <button type="button" 
                    onClick={() => nav(-1)}>Back</button>
                <button type="button" 
                    onClick={() => nav('/')}>Home</button>
            </div>
        )
    }

    return (
        <div>
            <h1>{albumData.length > 0 ? albumData[0].collectionName : 'Loading...'}</h1>
            {navButtons()}
            {renderSongs}
        </div>
    )
}

export default AlbumView
