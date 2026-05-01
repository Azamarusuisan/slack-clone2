-- 既存の channels / messages / channel_members には触れず、
-- 新しい *_simple テーブルを並行運用する

create table if not exists public.channels_simple (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.messages_simple (
  id uuid primary key default gen_random_uuid(),
  channel_id uuid not null references public.channels_simple(id) on delete cascade,
  user_name text not null,
  content text not null,
  created_at timestamptz not null default now()
);

-- 5 channels
insert into public.channels_simple (name) values
  ('general'),
  ('random'),
  ('project-a'),
  ('help'),
  ('design');

-- 各チャンネル 3 件ずつ messages
insert into public.messages_simple (channel_id, user_name, content)
select c.id, v.user_name, v.content
from public.channels_simple c
join (values
  ('general',  'Hiroshi', 'おはようございます！今日もよろしくお願いします。'),
  ('general',  'Aiko',    '10時から定例ミーティングです。'),
  ('general',  'Yuki',    '本日もお疲れさまでした。'),

  ('random',   'Kenji',   '近所にできた新しいカフェ、抹茶ラテが美味しかったです☕️'),
  ('random',   'Aiko',    '週末おすすめの小説ありますか？'),
  ('random',   'Hiroshi', '昨日のサッカー観た人〜⚽️'),

  ('project-a','Mika',    'API 仕様、PR にコメント残しました。'),
  ('project-a','Hiroshi', 'バックエンド修正マージ済みです。'),
  ('project-a','Yuki',    'スプリントレビュー資料の下書きを共有しました。'),

  ('help',     'Admin',   'FAQ を更新しました。まずはこちらをご確認ください。'),
  ('help',     'Mika',    '環境構築は wiki を参照してください。'),
  ('help',     'Ryo',     '質問はこのチャンネルで OK です。'),

  ('design',   'Ryo',     'ロゴの新パターンを Figma に上げました。'),
  ('design',   'Mika',    'カラーパレットは A 案がコントラスト良さそうです。'),
  ('design',   'Ryo',     'モバイル時のヘッダー高さは 56px に統一しましょう。')
) as v(channel_name, user_name, content)
  on v.channel_name = c.name;

-- RLS は OFF のまま（明示的に enable しないので Postgres デフォルトで無効）
