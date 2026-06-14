export default function Loading() {
  return (
    <main className="min-h-screen bg-background text-text">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <div className="mb-8 animate-pulse space-y-3">
          <div className="h-5 w-24 rounded-full bg-white/10" />
          <div className="h-9 w-72 rounded-full bg-white/10" />
          <div className="h-4 w-96 rounded-full bg-white/10" />
        </div>
        <div className="grid animate-pulse gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="overflow-hidden rounded-[2rem] border border-white/10 bg-card/80">
              <div className="h-72 bg-white/5" />
              <div className="space-y-3 p-5">
                <div className="h-5 w-32 rounded-full bg-white/10" />
                <div className="h-4 w-24 rounded-full bg-white/10" />
                <div className="flex gap-2">
                  <div className="h-6 w-16 rounded-full bg-white/10" />
                  <div className="h-6 w-20 rounded-full bg-white/10" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
