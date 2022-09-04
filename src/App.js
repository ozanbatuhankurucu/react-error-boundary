import './App.css'
import { ErrorBoundary } from 'react-error-boundary'
import { useState } from 'react'

function ErrorFallback({ error, componentStack, resetErrorBoundary }) {
  return (
    <div role='alert'>
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <pre>{componentStack}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  )
}

function Bomb() {
  throw new Error('💥 KABOOM 💥')
}
function App() {
  const [explode, setExplode] = useState(false)
  return (
    <div>
      <button onClick={() => setExplode((e) => !e)}>toggle explode</button>
      <ErrorBoundary
        FallbackComponent={ErrorFallback}
        onReset={() => setExplode(false)}
        resetKeys={[explode]}>
        {explode ? <Bomb /> : null}
      </ErrorBoundary>
    </div>
  )
}

export default App
