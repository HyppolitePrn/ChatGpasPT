import { useState, useEffect } from 'react'
import axios from 'axios'
import { REACT_APP_API_URL } from '@env'

const useFetch = (endpoint, query) => {
    const [data, setData] = useState(null)
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    const options = {
        method: 'GET',
        url: REACT_APP_API_URL + endpoint,
        data: body,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        query: {
            ...query
        }
    }

    const fetchData = async () => {
        try {

            setIsLoading(true)
            const response = await axios.request(options)
            setData(response.data)

        } catch (error) {

            setError(error)
            setIsLoading(false)

        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    return { data, error, isLoading }
}

export default useFetch
