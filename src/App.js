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
          console.log(resData)

          if(resData.length !== 0) {
            return setData(resData.results)
          }else{
            return setMessage('Not Found')
          }
        }
  
        fetchData()

        console.log('filled')
      }
    }, [search])

    const handleSearch = (event, term) => {
      event.preventDefault()
      setSearch(term)
    }

    return (
        <div>
            <SearchBar handleSearch={handleSearch} />
            {message}
            <Gallery data={data} />
        </div>
    )
}

export default App