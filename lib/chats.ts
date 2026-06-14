export interface ChatThread {
  id: string;
  name: string;
  image: string;
  lastMessage: string;
  time: string;
  unread: number;
}

export const chats: ChatThread[] = [
  {
    id: "1",
    name: "Valeria",
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=900&q=80",
    lastMessage: "Perfecto, te aviso cuando esté disponible este viernes.",
    time: "12:22",
    unread: 2,
  },
  {
    id: "2",
    name: "Camila",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=80",
    lastMessage: "Me encantó la última salida, gracias por la buena vibra.",
    time: "09:48",
    unread: 0,
  },
  {
    id: "3",
    name: "Sofía",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=900&q=80",
    lastMessage: "¿Te parece bien si nos vemos después de las 8?",
    time: "Ayer",
    unread: 1,
  },
];
