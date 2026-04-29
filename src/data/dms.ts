export type DmStatus = 'online' | 'offline'

export type DirectMessage = {
  id: string
  name: string
  status: DmStatus
}

export const directMessages: DirectMessage[] = [
  { id: 'dm-tanaka', name: '田中', status: 'online' },
  { id: 'dm-suzuki', name: '鈴木', status: 'offline' },
  { id: 'dm-sato', name: '佐藤', status: 'online' },
]
