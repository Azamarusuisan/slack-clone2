# Slackクローン（ダミーデータ版）

## 目的
Slackの全画面をダミーデータで構築し、2カラムレイアウト + レスポンシブの基礎を習得する。

## 技術スタック
- Vite
- React
- TypeScript
- Tailwind CSS
- shadcn/ui
- react-router-dom

## 画面構成
- **サイドバー**: 幅260px、背景は Slack 紫 `#611f69`、チャンネル5つ（# general / # random / # project-a / # design / # announcements）
- **ヘッダー**: 選択中チャンネル名を `#` 付きで表示
- **メッセージ一覧**: ダミーメッセージ10件（Avatar + ユーザー名 + 時刻 + 本文）
- **入力欄**: 画面下部に固定、Input + 送信ボタン

## データ
全てダミーデータ。DB接続・認証はまだ行わない（**Stage 14以降**で導入予定）。
ダミーデータは `src/data/messages.ts` に集約する。

## レスポンシブ
375px幅でサイドバーをハンバーガーメニュー化する。
