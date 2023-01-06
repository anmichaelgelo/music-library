import { useState, useContext } from 'react'
import { SearchContext } from '../context/SearchContext'

function SearchBar() {
    let [sentence, setSentence] = useState([])
    const { term, handleSearch, handleClearSearch } = useContext(SearchContext)
    
    const titleCase = (string) => {
        let splitWords = string.toLowerCase().split(' ')
        for(var i = 0; i< splitWords.length; i++){
            splitWords[i] = splitWords[i][0].toUpperCase() + splitWords[i].slice(1)
        }

        setSentence(splitWords.join(' '))
        return sentence
    }

    return (
        <form>
            <input type="text"
                ref={term} 
                placeholder="Search here..." />
            <button type="reset" 
                onClick={handleClearSearch}>Clear</button>
            <button type="button" 
                onClick={e => handleSearch(e, titleCase(term.current.value))}>Submit</button>
        </form>
    )
}

export default SearchBar