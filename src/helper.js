const fetchSearch = async (searchTerm) => {
    const response = await fetch('https://itunes.apple.com/search?term=' + searchTerm)
    const resData = await response.json()
    return resData.results
}

const wrapPromise = async (promise) => {
    let status = 'pending'
    let result = ''
    let suspender = promise.then(response => {
        status = 'success'
        result = response
    }, err => {
        status = 'error'
        result = err

        console.error(err)
    })

    return {
        read() {
            if(status === 'pending') {
                throw suspender
            } else if (status === 'error') {
                throw result
            }
            
            return result
        }
    }
}

export const createResource = (searchTerm) => {
    return {
        result: wrapPromise(fetchSearch(searchTerm))
    }
}