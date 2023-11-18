import { useState, useEffect, useMemo } from 'react'

const useFetch = (endpoint, initialOptions) => {
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const options = useMemo(() => initialOptions, [initialOptions])
  console.log(options)
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const response = await fetch(process.env.API_URL + endpoint, options)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        setData(data)
      } catch (error) {
        setError(error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [endpoint, options])
  console.log(data)

  return { data, error, isLoading }
}

export default useFetch
