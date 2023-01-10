import { Fragment, useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Gallery from './components/Gallery'
import SearchBar from './components/SearchBar'
import AlbumView from './components/AlbumView'
import ArtistView from './components/ArtistView'

function App(){
    let [search, setSearch] = useState('')
    let [message, setMessage] = useState('Search for Music!')
    let [data, setData] = useState([])

    const API_URL = 'https://itunes.apple.com/search?term='
    
    useEffect(() => {
      if(search){
        const fetchData = async () => {
          document.title = `${search} Music`
          const response = await fetch(API_URL + search, {
            headers: {
              mode: 'no-cors'
            }
          })
          const resData = await response.json()

          if(resData.length !== 0) {
            return setData(resData.results)
          }else{
            return setMessage('Not Found')
          }
        }
  
        fetchData()
      }
    }, [search])

    const handleSearch = (e, term) => {
      // e.preventDefault()
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

    return (
        <div style={layoutStyle}>
            {message}
            <Router>
              <Routes>
                <Route path="/" element={
                  <Fragment>
                    <SearchBar 
                    handleSearch={handleSearch}
                    handleClearSearch={handleClearSearch} />
                    <Gallery data={data} />
                  </Fragment>
                }>
                </Route>
                <Route path="/album/:id" 
                  element={<AlbumView />}>
                </Route>
                <Route path="/artist/:id" 
                  element={<ArtistView />}>
                </Route>
              </Routes>
            </Router>
        </div>
    )
}

export default App