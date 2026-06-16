"use client";

import { Suspense, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { chats, type ChatThread } from "@/lib/chats";
import { useAllProfiles } from "@/lib/useAllProfiles";
import { MessageCircle, ArrowLeft, Send } from "lucide-react";

export default function MessagesPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <MessagesContent />
    </Suspense>
  );
}

const initialMessages: Record<string, { text: string; sent: boolean }[]> = {
  valeria: [
    { text: "Hola, ¿cómo estás?", sent: false },
    { text: "¡Muy bien! ¿En qué puedo ayudarte?", sent: true },
  ],
  camila: [
    { text: "Hola, me gustaría saber más sobre tus servicios.", sent: true },
    { text: "Claro, dime qué necesitas saber.", sent: false },
  ],
  sofia: [
    { text: "¿Estás disponible este fin de semana?", sent: true },
    { text: "Sí, escríbeme y coordinamos.", sent: false },
  ],
};

function MessagesContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const allProfiles = useAllProfiles();
  const chatSlug = searchParams.get("chat");
  const [newMessage, setNewMessage] = useState("");

  const profile = chatSlug ? allProfiles.find((p) => p.slug === chatSlug) : null;
  const existingChat = chatSlug
    ? chats.find((c) => c.name.toLowerCase() === chatSlug)
    : null;

  const messages = chatSlug ? initialMessages[chatSlug] || [] : [];
  const contactName = profile?.name || existingChat?.name || chatSlug || "";
  const contactImage = profile?.image || existingChat?.image || "";

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !chatSlug) return;
    if (!initialMessages[chatSlug]) initialMessages[chatSlug] = [];
    initialMessages[chatSlug].push({ text: newMessage, sent: true });
    setNewMessage("");
    router.refresh();
  };

  if (chatSlug) {
    return (
      <main className="-mt-14 h-dvh bg-background text-text">
        <div className="mx-auto flex h-full max-w-3xl flex-col pt-[72px]">
          <div className="fixed left-0 right-0 top-0 z-40 border-b border-white/10 bg-background/95 px-4 py-3 backdrop-blur-xl sm:px-6">
            <div className="mx-auto flex max-w-3xl items-center gap-3">
              <button onClick={() => router.push("/mensajes")} className="rounded-full p-2 text-textSecondary transition hover:text-white">
                <ArrowLeft className="h-5 w-5" />
              </button>
              <div className="relative h-10 w-10 overflow-hidden rounded-full bg-slate-800">
                {contactImage && (
                  <Image src={contactImage} alt={contactName} fill className="object-cover" />
                )}
              </div>
              <div>
                <p className="font-semibold text-white">{contactName}</p>
                <p className="text-xs text-textSecondary">En línea</p>
              </div>
            </div>
          </div>

          <div className="flex-1 space-y-4 overflow-y-auto px-4 pb-20 pt-4 sm:px-6">
            {messages.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center text-center">
                <div className="relative mb-6 h-32 w-32">
                  <div className="flex h-full w-full items-center justify-center rounded-full bg-gradient-to-br from-premium/20 to-premium/5">
                    <MessageCircle className="h-16 w-16 text-premium/40" />
                  </div>
                </div>
                <p className="text-lg font-semibold text-white">Sin mensajes aún</p>
                <p className="mt-2 max-w-xs text-sm text-textSecondary">
                  Envía un mensaje para iniciar la conversación con {contactName}.
                </p>
              </div>
            ) : (
              messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.sent ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[75%] rounded-[1.75rem] px-4 py-3 text-sm ${
                      msg.sent
                        ? "bg-premium text-black"
                        : "border border-white/10 bg-white/5 text-white"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="fixed bottom-0 left-0 right-0 z-[60] border-t border-white/10 bg-background/95 px-4 py-3 backdrop-blur-xl sm:px-6">
            <div className="mx-auto max-w-3xl">
              <form onSubmit={handleSend} className="flex items-center gap-3 rounded-[2rem] border border-white/10 bg-card/80 p-2 shadow-glow">
                <input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Escribe un mensaje..."
                  className="flex-1 bg-transparent px-4 py-2 text-sm text-white outline-none placeholder:text-textSecondary"
                />
                <button
                  type="submit"
                  disabled={!newMessage.trim()}
                  className="rounded-full bg-premium p-3 text-black transition hover:brightness-110 disabled:opacity-50"
                >
                  <Send className="h-4 w-4" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
    );
  }

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
          {chats.length === 0 ? (
            <div className="rounded-[2rem] border border-white/10 bg-card/80 p-12 text-center shadow-glow">
              <MessageCircle className="mx-auto mb-4 h-12 w-12 text-textSecondary/50" />
              <p className="text-xl font-semibold text-white">Sin conversaciones</p>
              <p className="mt-2 text-sm text-textSecondary">
                Explora perfiles y empieza una conversación.
              </p>
            </div>
          ) : (
            chats.map((chat) => (
              <Link
                key={chat.id}
                href={`/mensajes?chat=${chat.name.toLowerCase()}`}
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
            ))
          )}
        </div>
      </div>
    </main>
  );
}
