import Image from "next/image";
import Link from "next/link";
import { chats } from "@/lib/chats";
import { MessageCircle } from "lucide-react";

export default function MessagesPage() {
  return (
    <main className="min-h-screen bg-background text-text">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <div className="mb-8 flex items-center justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-premium">
              Mensajes
            </p>
            <h1 className="text-4xl font-semibold text-white">Chats activos</h1>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full bg-white/5 px-4 py-2 text-sm text-textSecondary">
            <MessageCircle className="h-5 w-5 text-premium" />
            Conversaciones recientes
          </div>
        </div>

        <div className="space-y-4">
          {chats.map((chat) => (
            <Link
              key={chat.id}
              href="#"
              className="group flex items-center gap-4 overflow-hidden rounded-[2rem] border border-white/10 bg-card/80 p-4 transition hover:border-white/20 hover:bg-white/5"
            >
              <div className="relative h-16 w-16 overflow-hidden rounded-full bg-slate-800">
                <Image
                  src={chat.image}
                  alt={chat.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-4">
                  <h2 className="text-lg font-semibold text-white">
                    {chat.name}
                  </h2>
                  <span className="text-xs uppercase tracking-[0.25em] text-textSecondary">
                    {chat.time}
                  </span>
                </div>
                <p className="mt-2 truncate text-sm text-textSecondary">
                  {chat.lastMessage}
                </p>
              </div>
              {chat.unread > 0 ? (
                <div className="min-w-[2rem] rounded-full bg-premium px-2 py-1 text-center text-xs font-semibold text-black">
                  {chat.unread}
                </div>
              ) : null}
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
