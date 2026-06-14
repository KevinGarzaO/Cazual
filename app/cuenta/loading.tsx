export default function Loading() {
  return (
    <main className="min-h-screen bg-background text-text">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <div className="mb-8 animate-pulse space-y-3">
          <div className="h-5 w-24 rounded-full bg-white/10" />
          <div className="h-9 w-64 rounded-full bg-white/10" />
          <div className="h-4 w-80 rounded-full bg-white/10" />
        </div>
        <div className="grid animate-pulse gap-6 xl:grid-cols-3">
          <div className="rounded-[2rem] border border-white/10 bg-card/80 p-6">
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 rounded-full bg-white/10" />
              <div className="space-y-2">
                <div className="h-5 w-32 rounded-full bg-white/10" />
                <div className="h-4 w-20 rounded-full bg-white/10" />
              </div>
            </div>
          </div>
          <div className="rounded-[2rem] border border-white/10 bg-card/80 p-6 xl:col-span-2">
            <div className="h-20 w-full rounded-[1.75rem] bg-white/10" />
          </div>
        </div>
      </div>
    </main>
  );
}
