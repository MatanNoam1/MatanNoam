export default function Footer() {
  return (
    <footer className="bg-bg border-t border-stroke py-8 px-6">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs text-muted">© 2026 Matan Noam · Israel</p>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-xs text-muted">Available for opportunities</span>
        </div>
      </div>
    </footer>
  )
}
