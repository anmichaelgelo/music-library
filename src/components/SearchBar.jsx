import { useState } from 'react'

function SearchBar(props) {
    // let [searchTerm, setSearchTerm] = useState('')
    let [sentence, setSentence] = useState([])

    const titleCase = (string) => {
        let splitWords = string.toLowerCase().split(' ')
        for(var i = 0; i< splitWords.length; i++){
            if(splitWords[i][0]){
                splitWords[i] = splitWords[i][0].toUpperCase() + splitWords[i].slice(1)
            }
        }

        setSentence(splitWords.join(' '))
        return sentence
    }

    return (
        <form>
            <input type="text" 
                placeholder="Enter a search term here"
                onChange={e => props.handleSearch(e, titleCase(e.target.value))} />
            <input type="reset" value="Clear" onClick={props.handleClearSearch} />
        </form>
    )
}

export default SearchBar