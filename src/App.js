import { useRef, useState } from 'react'
import Gallery from './components/Gallery'
import SearchBar from './components/SearchBar'

import { DataContext } from './context/DataContext'
import { SearchContext} from './context/SearchContext'

function App(){
    let [message, setMessage] = useState('Search for Music!')
    let [data, setData] = useState([])
    let searchInput = useRef('')

    const API_URL = 'https://itunes.apple.com/search?term='

    const handleSearch = (event, term) => {
      event.preventDefault()

      const fetchData = async () => {
        document.title = `${term} Music`
        const response = await fetch(API_URL + term, {
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

    const handleClearSearch = () => {
      document.title = `Search for Music!`
      setData([])
    }

    const layoutStyle = {
      'display': 'flex',
      'justifyContent': 'center',
      'alignItems': 'center',
      'flexDirection': 'column'
    }

    return (
        <div style={layoutStyle} className="App">
            <SearchContext.Provider value={{
              term: searchInput,
              handleSearch: handleSearch,
              handleClearSearch: handleClearSearch
            }}>
              <SearchBar />
            </SearchContext.Provider>

            {message}
            
            <DataContext.Provider value={data}>
              <Gallery />
            </DataContext.Provider>
        </div>
    )
}

export default App