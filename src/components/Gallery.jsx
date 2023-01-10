import GalleryItem from './GalleryItem'

function Gallery(props){
    const data = props.data.result.read()
    console.log(data)
    
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