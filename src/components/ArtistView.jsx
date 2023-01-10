// These components will be making separate API calls from the app
// component to serve specific data about our artist
import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'

function ArtistView() {
    const nav = useNavigate()
    const { id } = useParams()
    const [ artistData, setArtistData ] = useState([])

    useEffect(() => {
        const API_URL = `http://localhost:4000/album/${id}`
        const fetchData = async () => {
            const response = await fetch(API_URL)
            const resData = await response.json()

            setArtistData(resData.results)
        }

        fetchData()
    }, [id])

    const justAlbums = artistData.filter(entry => entry.collectionType === 'Album')
    const renderAlbums = justAlbums.map((album, i) => {
        return (
            <div key={i}>
                <Link to={`/album/${album.collectionId}`}>
                    <p>{album.collectionName}</p>
                </Link>
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
            <h1>{artistData.length > 0 ? artistData[0].artistName : 'Loading...'}</h1>
            {navButtons()}
            {renderAlbums}
        </div>
    )
}

export default ArtistView
