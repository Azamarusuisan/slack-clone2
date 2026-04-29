export type Channel = {
  id: string
  name: string
}

export type Message = {
  id: string
  type: 'channel' | 'dm'
  parentId: string
  userName: string
  body: string
  createdAt: string
}

export const channels: Channel[] = [
  { id: 'general', name: 'general' },
  { id: 'random', name: 'random' },
  { id: 'project-a', name: 'project-a' },
  { id: 'design', name: 'design' },
  { id: 'announcements', name: 'announcements' },
]

export const messages: Message[] = [
  // # general
  {
    id: 'm-general-1',
    type: 'channel',
    parentId: 'general',
    userName: 'Hiroshi Tanaka',
    body: 'おはようございます！今日もよろしくお願いします。',
    createdAt: '09:02',
  },
  {
    id: 'm-general-2',
    type: 'channel',
    parentId: 'general',
    userName: 'Aiko Sato',
    body: 'おはようございます。10時から定例ありますね。',
    createdAt: '09:14',
  },
  {
    id: 'm-general-3',
    type: 'channel',
    parentId: 'general',
    userName: 'Yuki Nakamura',
    body: 'お昼休憩入ります〜🍜',
    createdAt: '12:30',
  },
  {
    id: 'm-general-4',
    type: 'channel',
    parentId: 'general',
    userName: 'Mika Suzuki',
    body: '本日もお疲れさまでした！',
    createdAt: '17:55',
  },

  // # random
  {
    id: 'm-random-1',
    type: 'channel',
    parentId: 'random',
    userName: 'Kenji Yamada',
    body: '近所にできた新しいカフェ、抹茶ラテが美味しかったです☕️',
    createdAt: '10:23',
  },
  {
    id: 'm-random-2',
    type: 'channel',
    parentId: 'random',
    userName: 'Aiko Sato',
    body: '週末おすすめの本ありますか？技術書じゃなくて小説が読みたい気分です📚',
    createdAt: '15:47',
  },
  {
    id: 'm-random-3',
    type: 'channel',
    parentId: 'random',
    userName: 'Hiroshi Tanaka',
    body: '昨日のサッカー観た人いる？延長戦アツかった⚽️',
    createdAt: '16:20',
  },

  // # project-a
  {
    id: 'm-project-a-1',
    type: 'channel',
    parentId: 'project-a',
    userName: 'Mika Suzuki',
    body: 'API のレスポンス仕様、PR にコメント残しました。確認お願いします。',
    createdAt: '11:05',
  },
  {
    id: 'm-project-a-2',
    type: 'channel',
    parentId: 'project-a',
    userName: 'Hiroshi Tanaka',
    body: 'バックエンド側の修正マージ済みです。検証よろしくお願いします。',
    createdAt: '14:18',
  },
  {
    id: 'm-project-a-3',
    type: 'channel',
    parentId: 'project-a',
    userName: 'Yuki Nakamura',
    body: 'スプリントレビューの資料、ドラフト版を共有しました。',
    createdAt: '15:02',
  },
  {
    id: 'm-project-a-4',
    type: 'channel',
    parentId: 'project-a',
    userName: 'Aiko Sato',
    body: 'QA 環境で再現できました。チケット切ります。',
    createdAt: '16:45',
  },

  // # design
  {
    id: 'm-design-1',
    type: 'channel',
    parentId: 'design',
    userName: 'Ryo Kobayashi',
    body: 'ロゴの新パターンを Figma に上げました。意見ください。',
    createdAt: '11:42',
  },
  {
    id: 'm-design-2',
    type: 'channel',
    parentId: 'design',
    userName: 'Mika Suzuki',
    body: 'カラーパレット、A 案のほうがコントラスト的に読みやすそうです。',
    createdAt: '13:08',
  },
  {
    id: 'm-design-3',
    type: 'channel',
    parentId: 'design',
    userName: 'Ryo Kobayashi',
    body: 'モバイル時のヘッダー高さは 56px に統一しましょう。',
    createdAt: '14:55',
  },

  // # announcements
  {
    id: 'm-announcements-1',
    type: 'channel',
    parentId: 'announcements',
    userName: 'Admin',
    body: '【お知らせ】明日メンテナンスのため 22:00-23:00 サービス停止します。',
    createdAt: '13:00',
  },
  {
    id: 'm-announcements-2',
    type: 'channel',
    parentId: 'announcements',
    userName: 'Admin',
    body: '【人事】来月から新メンバーが2名ジョインします🎉',
    createdAt: '15:30',
  },
  {
    id: 'm-announcements-3',
    type: 'channel',
    parentId: 'announcements',
    userName: 'Admin',
    body: '【リマインド】月末の勤怠提出を忘れずにお願いします。',
    createdAt: '17:00',
  },

  // DM 田中
  {
    id: 'm-dm-tanaka-1',
    type: 'dm',
    parentId: 'dm-tanaka',
    userName: '田中',
    body: 'お疲れさまです、来週のMTGの件ですが少し時間いただけますか？',
    createdAt: '10:05',
  },
  {
    id: 'm-dm-tanaka-2',
    type: 'dm',
    parentId: 'dm-tanaka',
    userName: 'You',
    body: '大丈夫です、火曜の午後ならいつでも空いてます。',
    createdAt: '10:12',
  },
  {
    id: 'm-dm-tanaka-3',
    type: 'dm',
    parentId: 'dm-tanaka',
    userName: '田中',
    body: 'ありがとうございます、ではカレンダー入れておきます🙏',
    createdAt: '10:14',
  },

  // DM 鈴木
  {
    id: 'm-dm-suzuki-1',
    type: 'dm',
    parentId: 'dm-suzuki',
    userName: '鈴木',
    body: '先日の議事録、共有フォルダにアップしました。',
    createdAt: '17:30',
  },
  {
    id: 'm-dm-suzuki-2',
    type: 'dm',
    parentId: 'dm-suzuki',
    userName: 'You',
    body: '確認しました！要点きれいにまとまっててありがたいです。',
    createdAt: '18:02',
  },
  {
    id: 'm-dm-suzuki-3',
    type: 'dm',
    parentId: 'dm-suzuki',
    userName: '鈴木',
    body: '今日はもう上がります、また明日！',
    createdAt: '18:45',
  },
  {
    id: 'm-dm-suzuki-4',
    type: 'dm',
    parentId: 'dm-suzuki',
    userName: 'You',
    body: 'お疲れさまでした〜',
    createdAt: '18:46',
  },

  // DM 佐藤
  {
    id: 'm-dm-sato-1',
    type: 'dm',
    parentId: 'dm-sato',
    userName: '佐藤',
    body: 'お昼ごはん、今日は外食しません？',
    createdAt: '11:50',
  },
  {
    id: 'm-dm-sato-2',
    type: 'dm',
    parentId: 'dm-sato',
    userName: 'You',
    body: 'いいですね、駅前の新しいラーメン屋気になってました🍜',
    createdAt: '11:52',
  },
  {
    id: 'm-dm-sato-3',
    type: 'dm',
    parentId: 'dm-sato',
    userName: '佐藤',
    body: 'では12時にエントランスで！',
    createdAt: '11:54',
  },
]
