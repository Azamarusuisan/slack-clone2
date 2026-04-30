-- 3テーブル全てで RLS を有効化
-- ⚠️ この時点ではポリシー未作成のため、アプリからは何も見えなくなる
-- （鍵をかけたが誰にも鍵を渡していない状態。データは残っている）
-- この後のプロンプト③④⑤でポリシーを全て作り終わるまで、ブラウザをリロードしないこと

alter table public.channels enable row level security;
alter table public.messages enable row level security;
alter table public.channel_members enable row level security;
