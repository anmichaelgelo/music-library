import { useState } from 'react'

function GalleryItem(props) {
    let [view, setView] = useState(false)

    const simpleStyle = {
        'width': '25vw',
        'padding': '16px',
        'borderRadius': '4px',
        'color': '#f3f3f3',
        'backgroundColor': '#123',
        'fontWeight': 'normal',
    }
    
    const detailStyle = {
        'width': '80vw',
        'background': `linear-gradient(to right, rgba(0,0,0,0.5), rgba(0,0,0,0.6)), url(${props.item.artworkUrl100}) no-repeat`,
        'backgroundSize': 'cover',
        'padding': '16px',
        'borderRadius': '4px',
        'color': '#fff',
        'backgroundColor': 'rgba(0,0,0,0.8)',
        'fontWeight': 'normal',
    }    

    const simpleView = () => {
        return (
            <div style={simpleStyle}>
                <h3>{props.item.trackName}</h3>
                <h4>{props.item.collectionName}</h4>
            </div>
        )
    }

    const detailView = () => {
        return (
            <div style={detailStyle}>
                <h2>{props.item.trackName}</h2>
                <h3>{props.item.collectionName}</h3>
                <h4>{props.item.primaryGenreName}</h4>
                <h4>{props.item.releaseDate}</h4>
            </div>
        )
    }

    return (
        <div onClick={() => setView(!view)}
        style={{'display': 'inline-block'}}>
        
            {/* This simple ternary shows the simple view when 'view' is false! */}
            {view ? detailView() : simpleView()}

        </div>
    )

}
export default GalleryItem
