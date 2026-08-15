import { useEffect, useState } from 'react'

const FUNCTION_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/views`
const ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY

const HEADERS = {
  'Content-Type': 'application/json',
  'apikey': ANON_KEY,
  'Authorization': `Bearer ${ANON_KEY}`,
}

// Track whether we've already POSTed this visit in this session
let visitPosted = false

export function useVisitorCount() {
  const [count, setCount] = useState(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    // POST a new visit (once per session)
    if (!visitPosted && FUNCTION_URL && ANON_KEY) {
      visitPosted = true
      fetch(FUNCTION_URL, {
        method: 'POST',
        headers: HEADERS,
        body: JSON.stringify({ path: window.location.pathname || '/' }),
      }).catch(() => {})
    }

    // GET the current total count
    if (!FUNCTION_URL || !ANON_KEY) {
      setError(true)
      return
    }

    fetch(FUNCTION_URL, { headers: HEADERS })
      .then(res => res.json())
      .then(data => {
        if (typeof data.count === 'number') setCount(data.count)
        else setError(true)
      })
      .catch(() => setError(true))
  }, [])

  return { count, error }
}
