import GalleryItem from './GalleryItem'
import { useContext } from 'react'
import { DataContext } from '../context/DataContext'

function Gallery(){
    const data = useContext(DataContext)
    const display = data.map((item, i) =>{
        return (
            <GalleryItem item={item} key={i} />
        )
    })

    const layoutStyle = {
        'display': 'flex',
        'justifyContent': 'center',
        'alignItems': 'stretch',
        'flexWrap': 'wrap',
        'gap': '8px'
    }

    return (
        <div style={layoutStyle}>
            {display}
        </div>
    )
}

export default Gallery