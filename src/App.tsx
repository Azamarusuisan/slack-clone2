import { useEffect, useRef, useState } from 'react'
import { Menu, Pencil, Smile, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from '@/components/ui/sheet'
import {
  channels,
  messages as initialMessages,
  type Message,
} from '@/data/messages'
import { directMessages } from '@/data/dms'

type SelectedItem =
  | { type: 'channel'; id: string }
  | { type: 'dm'; id: string }

type SidebarContentProps = {
  selectedItem: SelectedItem
  onSelect: (item: SelectedItem) => void
}

function SidebarContent({ selectedItem, onSelect }: SidebarContentProps) {
  return (
    <div className="flex h-full flex-col bg-[#611f69] text-white">
      <div className="px-4 py-4 border-b border-white/10">
        <h1 className="text-lg font-bold">My Workspace</h1>
      </div>
      <nav className="flex-1 px-2 py-4">
        <h2 className="px-2 mb-2 text-xs font-semibold uppercase tracking-wide text-white/70">
          チャンネル
        </h2>
        <ul className="space-y-0.5">
          {channels.map((channel) => {
            const isSelected =
              selectedItem.type === 'channel' && selectedItem.id === channel.id
            return (
              <li key={channel.id}>
                <button
                  type="button"
                  onClick={() => onSelect({ type: 'channel', id: channel.id })}
                  className={`w-full text-left px-2 py-1.5 rounded text-sm transition-colors ${
                    isSelected
                      ? 'bg-[#1264A3] text-white font-medium'
                      : 'text-white/90 hover:bg-white/10'
                  }`}
                >
                  # {channel.name}
                </button>
              </li>
            )
          })}
        </ul>

        <h2 className="text-xs uppercase tracking-wide opacity-70 px-3 py-2 mt-2">
          ダイレクトメッセージ
        </h2>
        <ul className="space-y-0.5">
          {directMessages.map((dm) => {
            const isSelected =
              selectedItem.type === 'dm' && selectedItem.id === dm.id
            return (
              <li key={dm.id}>
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => onSelect({ type: 'dm', id: dm.id })}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      onSelect({ type: 'dm', id: dm.id })
                    }
                  }}
                  className={`h-8 px-3 rounded text-sm flex items-center gap-2 cursor-pointer ${
                    isSelected
                      ? 'bg-[#1264A3] text-white'
                      : 'hover:bg-white/10'
                  }`}
                >
                  <span
                    className={`w-2 h-2 rounded-full ${
                      dm.status === 'online' ? 'bg-green-500' : 'bg-gray-400'
                    }`}
                  />
                  <span>{dm.name}</span>
                </div>
              </li>
            )
          })}
        </ul>
      </nav>
    </div>
  )
}

function App() {
  const [selectedItem, setSelectedItem] = useState<SelectedItem>({
    type: 'channel',
    id: channels[0].id,
  })
  const [mobileOpen, setMobileOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [input, setInput] = useState('')
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editBody, setEditBody] = useState('')
  const endRef = useRef<HTMLDivElement>(null)

  const selectedChannel =
    selectedItem.type === 'channel'
      ? channels.find((c) => c.id === selectedItem.id)
      : undefined
  const selectedDm =
    selectedItem.type === 'dm'
      ? directMessages.find((d) => d.id === selectedItem.id)
      : undefined

  const visibleMessages = messages.filter(
    (m) => m.type === selectedItem.type && m.parentId === selectedItem.id,
  )

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSelect = (item: SelectedItem) => {
    setSelectedItem(item)
    setMobileOpen(false)
  }

  const handleSend = () => {
    if (!input.trim()) return
    const newMessage: Message = {
      id: crypto.randomUUID(),
      type: selectedItem.type,
      parentId: selectedItem.id,
      userName: '自分',
      body: input,
      createdAt: new Date().toISOString(),
      reactions: {},
    }
    setMessages((prev) => [...prev, newMessage])
    setInput('')
  }

  const handleStartEdit = (id: string, body: string) => {
    setEditingId(id)
    setEditBody(body)
  }

  const handleSaveEdit = (id: string) => {
    setMessages((prev) =>
      prev.map((m) => (m.id === id ? { ...m, body: editBody } : m)),
    )
    setEditingId(null)
  }

  const handleCancelEdit = () => {
    setEditingId(null)
  }

  const handleDelete = (id: string) => {
    if (!window.confirm('削除しますか？')) return
    setMessages((prev) => prev.filter((m) => m.id !== id))
  }

  const handleReact = (id: string, emoji: string) => {
    setMessages((prev) =>
      prev.map((m) =>
        m.id === id
          ? {
              ...m,
              reactions: {
                ...m.reactions,
                [emoji]: (m.reactions[emoji] ?? 0) + 1,
              },
            }
          : m,
      ),
    )
  }

  const REACTION_EMOJIS = ['👍', '❤️', '😂', '🎉', '😮']

  const headerLabel = selectedChannel
    ? `# ${selectedChannel.name}`
    : selectedDm
      ? `@ ${selectedDm.name}`
      : ''

  const inputPlaceholder = selectedChannel
    ? `#${selectedChannel.name} へメッセージを送信`
    : selectedDm
      ? `@${selectedDm.name} へメッセージを送信`
      : ''

  return (
    <div className="flex min-h-screen">
      <aside className="hidden md:flex w-[260px] flex-shrink-0">
        <SidebarContent selectedItem={selectedItem} onSelect={handleSelect} />
      </aside>

      <main className="flex-1 flex flex-col">
        <header className="flex items-center gap-2 px-4 md:px-6 py-4 border-b">
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                aria-label="メニューを開く"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-[260px]">
              <SheetTitle className="sr-only">チャンネル一覧</SheetTitle>
              <SidebarContent
                selectedItem={selectedItem}
                onSelect={handleSelect}
              />
            </SheetContent>
          </Sheet>
          <h2 className="text-xl font-bold">{headerLabel}</h2>
        </header>

        <div className="flex-1 overflow-y-auto px-4 md:px-6 py-4 space-y-4">
          {visibleMessages.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              まだメッセージはありません。
            </p>
          ) : (
            visibleMessages.map((message) => {
              const initials = message.userName
                .split(/\s+/)
                .map((s) => s.charAt(0))
                .join('')
                .slice(0, 2)
                .toUpperCase()
              const isEditing = editingId === message.id
              return (
                <div
                  key={message.id}
                  className="group relative flex gap-3 rounded px-2 py-1 hover:bg-muted/50"
                >
                  <Avatar className="h-9 w-9">
                    <AvatarFallback>{initials}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline gap-2">
                      <span className="font-semibold">{message.userName}</span>
                      <span className="text-xs text-muted-foreground">
                        {message.createdAt}
                      </span>
                    </div>
                    {isEditing ? (
                      <div className="flex flex-col gap-2 mt-1">
                        <textarea
                          value={editBody}
                          onChange={(e) => setEditBody(e.target.value)}
                          rows={2}
                          className="w-full resize-none rounded-lg border border-input bg-transparent px-2.5 py-1.5 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 dark:bg-input/30"
                          autoFocus
                        />
                        <div className="flex gap-2">
                          <Button
                            type="button"
                            size="sm"
                            onClick={() => handleSaveEdit(message.id)}
                          >
                            保存
                          </Button>
                          <Button
                            type="button"
                            size="sm"
                            variant="outline"
                            onClick={handleCancelEdit}
                          >
                            キャンセル
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <p className="text-sm whitespace-pre-wrap">{message.body}</p>
                        {Object.entries(message.reactions).some(
                          ([, count]) => count > 0,
                        ) && (
                          <div className="flex flex-wrap gap-1 mt-1">
                            {Object.entries(message.reactions)
                              .filter(([, count]) => count > 0)
                              .map(([emoji, count]) => (
                                <Badge
                                  key={emoji}
                                  onClick={() => handleReact(message.id, emoji)}
                                >
                                  <span>{emoji}</span>
                                  <span>{count}</span>
                                </Badge>
                              ))}
                          </div>
                        )}
                      </>
                    )}
                  </div>
                  {!isEditing && (
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition flex gap-1">
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            type="button"
                            size="icon"
                            variant="ghost"
                            className="h-7 w-7"
                            aria-label="リアクション"
                          >
                            <Smile className="h-4 w-4" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="flex gap-1" align="end">
                          {REACTION_EMOJIS.map((emoji) => (
                            <button
                              key={emoji}
                              type="button"
                              onClick={() => handleReact(message.id, emoji)}
                              className="text-lg leading-none rounded p-1 hover:bg-muted"
                            >
                              {emoji}
                            </button>
                          ))}
                        </PopoverContent>
                      </Popover>
                      <Button
                        type="button"
                        size="icon"
                        variant="ghost"
                        className="h-7 w-7"
                        aria-label="編集"
                        onClick={() => handleStartEdit(message.id, message.body)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        type="button"
                        size="icon"
                        variant="ghost"
                        className="h-7 w-7"
                        aria-label="削除"
                        onClick={() => handleDelete(message.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>
              )
            })
          )}
          <div ref={endRef} />
        </div>

        <div className="sticky bottom-0 bg-background border-t px-4 md:px-6 py-4">
          <form
            className="flex gap-2 items-end"
            onSubmit={(e) => {
              e.preventDefault()
              handleSend()
            }}
          >
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault()
                  handleSend()
                }
              }}
              placeholder={inputPlaceholder}
              rows={1}
              className="flex-1 min-h-9 max-h-40 resize-none rounded-lg border border-input bg-transparent px-2.5 py-1.5 text-sm outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 dark:bg-input/30"
            />
            <Button type="submit">送信</Button>
          </form>
        </div>
      </main>
    </div>
  )
}

export default App
