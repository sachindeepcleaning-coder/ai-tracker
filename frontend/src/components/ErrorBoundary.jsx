import { Component } from 'react'

/** Prevents a single bad data row / chart glitch from blanking the whole dashboard. */
export default class ErrorBoundary extends Component {
  state = { error: null }

  static getDerivedStateFromError(error) {
    return { error }
  }

  render() {
    if (this.state.error) {
      return (
        <div className="card p-8 text-center">
          <h2 className="font-bold">Something went wrong rendering this panel.</h2>
          <p className="text-sm text-white/60 mt-2">This is a planning dashboard — the underlying catalog may have a row the UI doesn't expect.</p>
          <button type="button" className="mt-4 btn btn-primary" onClick={() => window.location.reload()}>Reload dashboard</button>
        </div>
      )
    }
    return this.props.children
  }
}