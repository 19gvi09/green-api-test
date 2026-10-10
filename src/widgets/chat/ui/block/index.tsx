"use client";

import { ArrowLeft, MessageCircleMore, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { CreateChatDialog } from "@/features/chat/create";
import { ChatSendMessageForm } from "@/features/chat/send-message";
import { useApiContext } from "@/shared/api";
import { Button } from "@/shared/shadcn/components/ui/button";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/shared/shadcn/components/ui/empty";
import { Message, MessageContent } from "@/shared/shadcn/components/ui/message";
import {
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerProvider,
  MessageScrollerViewport,
} from "@/shared/shadcn/components/ui/message-scroller";

interface ChatMessage {
  direction: "incoming" | "outgoing";
  id: string;
  text: string;
}

const getPhoneNumber = (chatId: string) => `+${chatId.replace("@c.us", "")}`;

export const ChatWidget = () => {
  const { client, clearClient } = useApiContext();
  const router = useRouter();
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  useEffect(() => {
    if (!client) {
      router.replace("/");
    }
  }, [client, router]);

  const createChat = (chatId: string) => {
    setActiveChatId(chatId);
    setMessages([]);
  };

  const closeChat = () => {
    setActiveChatId(null);
    setMessages([]);
  };

  const changeClient = () => {
    setActiveChatId(null)
    setMessages([])
    clearClient();
    router.push("/");
  };

  const addSentMessage = async (message: { id: string; text: string }) => {
    if (!activeChatId || !client) {
      return;
    }

    setMessages((prev) => [...prev, { ...message, direction: "outgoing" }]);
    const result = await client.receiveNotification();
    if (result) {
      if (
        result.body.typeWebhook === "incomingMessageReceived" &&
        result.body.messageData.typeMessage === "textMessage"
      ) {
        const message: ChatMessage = {
          direction: "incoming",
          text: result.body.messageData.textMessageData.textMessage,
          id: result.body.idMessage,
        };
        setMessages((prev) => [...prev, message]);
      }
      await client.deleteNotification(result.receiptId);
    }
  };

  if (!client) {
    return null;
  }

  return (
    <section className="min-h-dvh p-0 sm:p-6">
      <div className="mx-auto flex min-h-dvh w-full max-w-6xl overflow-hidden bg-max-surface sm:min-h-[calc(100dvh-3rem)] sm:rounded-max-xl sm:border sm:border-max-border sm:shadow-max-card">
        <aside
          className={`w-full shrink-0 flex-col bg-max-surface md:flex md:w-80 md:border-r md:border-max-border ${
            activeChatId ? "hidden" : "flex"
          }`}
        >
          <header className="flex items-center justify-between border-b border-max-border px-5 py-4">
            <h1 className="text-xl font-semibold text-max-text">Чаты</h1>
            <CreateChatDialog onSuccess={(id) => createChat(id)} />
          </header>

          {activeChatId ? (
            <nav className="flex flex-col gap-1 p-3" aria-label="Список чатов">
              <div className="flex w-full items-center gap-3 rounded-max-md bg-max-accent-subtle p-3">
                <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-max-surface-muted text-max-accent-pressed">
                  <MessageCircleMore className="size-5" />
                </div>
                <span className="truncate font-medium text-max-text">
                  {getPhoneNumber(activeChatId)}
                </span>
              </div>
            </nav>
          ) : (
            <Empty className="m-auto max-w-56 flex-none px-5">
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  <MessageCircleMore className="size-5" />
                </EmptyMedia>
                <EmptyTitle className="text-base">
                  Нет открытых чатов
                </EmptyTitle>
                <EmptyDescription>
                  Добавьте номер получателя, чтобы начать диалог.
                </EmptyDescription>
              </EmptyHeader>
            </Empty>
          )}

          <footer className="mt-auto border-t border-max-border px-5 py-4">
            <Button onClick={changeClient} type="button" variant="link">
              Сменить аккаунт
            </Button>
          </footer>
        </aside>

        <section
          className={`min-w-0 flex-1 flex-col bg-max-surface ${
            activeChatId ? "flex" : "hidden md:flex"
          }`}
        >
          {activeChatId ? (
            <>
              <header className="flex items-center gap-3 border-b border-max-border px-4 py-3">
                <Button
                  aria-label="К списку чатов"
                  className="md:hidden"
                  onClick={() => setActiveChatId(null)}
                  size="icon"
                  variant="ghost"
                >
                  <ArrowLeft />
                </Button>
                <div className="flex size-11 items-center justify-center rounded-full bg-max-accent-subtle text-max-accent-pressed">
                  <MessageCircleMore className="size-5" />
                </div>
                <div className="min-w-0">
                  <h2 className="truncate font-semibold text-max-text">
                    {getPhoneNumber(activeChatId)}
                  </h2>
                </div>
                <Button
                  aria-label="Закрыть чат"
                  className="ml-auto hidden md:inline-flex"
                  onClick={() => closeChat()}
                  size="icon"
                  variant="ghost"
                >
                  <X />
                </Button>
              </header>

              <main className="min-h-0 flex flex-1 flex-col bg-background">
                <MessageScrollerProvider autoScroll>
                  <MessageScroller>
                    <MessageScrollerViewport aria-label="Сообщения чата">
                      <MessageScrollerContent className="gap-3 p-4">
                        {messages.length ? (
                          messages.map((message) => (
                            <MessageScrollerItem
                              key={message.id}
                              messageId={message.id}
                            >
                              <Message
                                align={
                                  message.direction === "outgoing"
                                    ? "end"
                                    : "start"
                                }
                              >
                                <MessageContent>{message.text}</MessageContent>
                              </Message>
                            </MessageScrollerItem>
                          ))
                        ) : (
                          <MessageScrollerItem className="flex min-h-full flex-1">
                            <Empty className="border-0 p-4">
                              <EmptyHeader>
                                <EmptyMedia variant="icon">
                                  <MessageCircleMore className="size-6" />
                                </EmptyMedia>
                                <EmptyTitle>Начните диалог</EmptyTitle>
                                <EmptyDescription>
                                  Отправьте сообщение — ответы получателя
                                  появятся здесь.
                                </EmptyDescription>
                              </EmptyHeader>
                            </Empty>
                          </MessageScrollerItem>
                        )}
                      </MessageScrollerContent>
                    </MessageScrollerViewport>
                    <MessageScrollerButton />
                  </MessageScroller>
                </MessageScrollerProvider>
              </main>

              <footer className="border-t border-max-border bg-max-surface p-4">
                <ChatSendMessageForm
                  chatId={activeChatId}
                  onSent={addSentMessage}
                />
              </footer>
            </>
          ) : (
            <Empty className="m-auto hidden max-w-sm flex-none md:flex">
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  <MessageCircleMore className="size-6" />
                </EmptyMedia>
                <EmptyTitle>Выберите чат</EmptyTitle>
                <EmptyDescription>
                  Откройте диалог из списка или добавьте новый чат.
                </EmptyDescription>
              </EmptyHeader>
            </Empty>
          )}
        </section>
      </div>
    </section>
  );
};
