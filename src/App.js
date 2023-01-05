import { useEffect, useState } from 'react'
import Gallery from './components/Gallery'
import SearchBar from './components/SearchBar'

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

    const handleSearch = (event, term) => {
      // event.preventDefault()
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
            <SearchBar 
              handleSearch={handleSearch}
              handleClearSearch={handleClearSearch} />
            {message}
            <Gallery data={data} />
        </div>
    )
}

export default App