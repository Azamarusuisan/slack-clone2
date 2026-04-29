export type Channel = {
  id: string
  name: string
}

export type Message = {
  id: string
  channelId: string
  user: string
  initials: string
  time: string
  body: string
}

export const channels: Channel[] = [
  { id: 'general', name: 'general' },
  { id: 'random', name: 'random' },
  { id: 'project-a', name: 'project-a' },
  { id: 'design', name: 'design' },
  { id: 'announcements', name: 'announcements' },
]

export const messages: Message[] = [
  {
    id: 'm1',
    channelId: 'general',
    user: 'Hiroshi Tanaka',
    initials: 'HT',
    time: '09:02',
    body: 'おはようございます！今日もよろしくお願いします。',
  },
  {
    id: 'm2',
    channelId: 'general',
    user: 'Aiko Sato',
    initials: 'AS',
    time: '09:14',
    body: 'おはようございます。10時から定例ありますね。',
  },
  {
    id: 'm3',
    channelId: 'random',
    user: 'Kenji Yamada',
    initials: 'KY',
    time: '10:23',
    body: '近所にできた新しいカフェ、抹茶ラテが美味しかったです☕️',
  },
  {
    id: 'm4',
    channelId: 'project-a',
    user: 'Mika Suzuki',
    initials: 'MS',
    time: '11:05',
    body: 'API のレスポンス仕様、PR にコメント残しました。確認お願いします。',
  },
  {
    id: 'm5',
    channelId: 'design',
    user: 'Ryo Kobayashi',
    initials: 'RK',
    time: '11:42',
    body: 'ロゴの新パターンを Figma に上げました。意見ください。',
  },
  {
    id: 'm6',
    channelId: 'general',
    user: 'Yuki Nakamura',
    initials: 'YN',
    time: '12:30',
    body: 'お昼休憩入ります〜🍜',
  },
  {
    id: 'm7',
    channelId: 'announcements',
    user: 'Admin',
    initials: 'AD',
    time: '13:00',
    body: '【お知らせ】明日メンテナンスのため 22:00-23:00 サービス停止します。',
  },
  {
    id: 'm8',
    channelId: 'project-a',
    user: 'Hiroshi Tanaka',
    initials: 'HT',
    time: '14:18',
    body: 'バックエンド側の修正マージ済みです。検証よろしくお願いします。',
  },
  {
    id: 'm9',
    channelId: 'random',
    user: 'Aiko Sato',
    initials: 'AS',
    time: '15:47',
    body: '週末おすすめの本ありますか？技術書じゃなくて小説が読みたい気分です📚',
  },
  {
    id: 'm10',
    channelId: 'general',
    user: 'Mika Suzuki',
    initials: 'MS',
    time: '17:55',
    body: '本日もお疲れさまでした！',
  },
]
