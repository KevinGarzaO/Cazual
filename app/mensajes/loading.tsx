export default function Loading() {
  return (
    <main className="min-h-screen bg-background text-text">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <div className="mb-8 animate-pulse space-y-3">
          <div className="h-5 w-24 rounded-full bg-white/10" />
          <div className="h-9 w-48 rounded-full bg-white/10" />
        </div>
        <div className="animate-pulse space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex items-center gap-4 rounded-[2rem] border border-white/10 bg-card/80 p-4">
              <div className="h-16 w-16 rounded-full bg-white/10" />
              <div className="flex-1 space-y-3">
                <div className="h-5 w-32 rounded-full bg-white/10" />
                <div className="h-4 w-48 rounded-full bg-white/10" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
