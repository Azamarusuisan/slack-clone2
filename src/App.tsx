import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { channels, messages } from '@/data/messages'

function App() {
  const [selectedChannelId, setSelectedChannelId] = useState(channels[0].id)
  const selectedChannel = channels.find((c) => c.id === selectedChannelId)!
  const channelMessages = messages.filter(
    (m) => m.channelId === selectedChannelId,
  )

  return (
    <div className="flex min-h-screen">
      <aside className="w-[260px] flex-shrink-0 bg-[#611f69] text-white flex flex-col">
        <div className="px-4 py-4 border-b border-white/10">
          <h1 className="text-lg font-bold">My Workspace</h1>
        </div>
        <nav className="flex-1 px-2 py-4">
          <h2 className="px-2 mb-2 text-xs font-semibold uppercase tracking-wide text-white/70">
            チャンネル
          </h2>
          <ul className="space-y-0.5">
            {channels.map((channel) => {
              const isSelected = channel.id === selectedChannelId
              return (
                <li key={channel.id}>
                  <button
                    type="button"
                    onClick={() => setSelectedChannelId(channel.id)}
                    className={`w-full text-left px-2 py-1.5 rounded text-sm transition-colors ${
                      isSelected
                        ? 'bg-[#3d1142] text-white font-medium'
                        : 'text-white/90 hover:bg-white/10'
                    }`}
                  >
                    # {channel.name}
                  </button>
                </li>
              )
            })}
          </ul>
        </nav>
      </aside>

      <main className="flex-1 flex flex-col">
        <header className="px-6 py-4 border-b">
          <h2 className="text-xl font-bold"># {selectedChannel.name}</h2>
        </header>

        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {channelMessages.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              まだメッセージはありません。
            </p>
          ) : (
            channelMessages.map((message) => (
              <div key={message.id} className="flex gap-3">
                <Avatar className="h-9 w-9">
                  <AvatarFallback>{message.initials}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-baseline gap-2">
                    <span className="font-semibold">{message.user}</span>
                    <span className="text-xs text-muted-foreground">
                      {message.time}
                    </span>
                  </div>
                  <p className="text-sm">{message.body}</p>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="sticky bottom-0 bg-background border-t px-6 py-4">
          <form
            className="flex gap-2"
            onSubmit={(e) => e.preventDefault()}
          >
            <Input
              placeholder={`#${selectedChannel.name} へメッセージを送信`}
              className="flex-1"
            />
            <Button type="submit">送信</Button>
          </form>
        </div>
      </main>
    </div>
  )
}

export default App
