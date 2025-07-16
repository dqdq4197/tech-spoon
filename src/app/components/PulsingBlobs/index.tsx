import Blob from './Blob'

function PulsingBlobs() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      <Blob className="top-1/4 left-1/4 h-96 w-96 bg-purple-500/20" />
      <Blob className="right-1/4 bottom-1/4 h-80 w-80 bg-blue-500/20 delay-1000" />
      <Blob className="top-1/2 left-1/2 h-64 w-64 bg-pink-500/20 delay-500" />
    </div>
  )
}

export default PulsingBlobs
