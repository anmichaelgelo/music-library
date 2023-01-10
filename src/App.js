import { useEffect, useState, Suspense } from 'react'
import Gallery from './components/Gallery'
import SearchBar from './components/SearchBar'
import Spinner from './components/Spinner'

import { createResource as fetchData } from './helper'

function App(){
    let [search, setSearch] = useState('')
    let [message, setMessage] = useState('Search for Music!')
    let [data, setData] = useState(null)

    // const API_URL = 'https://itunes.apple.com/search?term='
    
    useEffect(() => {
      if (search) {
        const getData = fetchData(search)
        setData(getData)
      }
    }, [search])
  

    const handleSearch = (e, term) => {
      e.preventDefault()
      setSearch(term)
    }

    const handleClearSearch = () => {
      setSearch('')
      setData([])
    }

    const layoutStyle = {
      'display': 'flex',
      'justifyContent': 'center',
      'alignItems': 'center',
      'flexDirection': 'column'
    }

    const renderGallery = () => {
      if(data){
          return (
            <Suspense fallback={<Spinner />}>
              <Gallery data={data} />
            </Suspense>
          )
      }
    }
  
    return (
        <div style={layoutStyle}>
            <SearchBar handleSearch={handleSearch}
              handleClearSearch={handleClearSearch} />
            {message}
            {renderGallery()}
        </div>
    )
}

export default App