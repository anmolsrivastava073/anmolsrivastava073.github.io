function AmbientCanvas() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Soft top gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-gradient-to-b from-blue-500/[0.04] via-indigo-500/[0.02] to-transparent blur-3xl pointer-events-none rounded-full" />
    </div>
  )
}

export default AmbientCanvas
