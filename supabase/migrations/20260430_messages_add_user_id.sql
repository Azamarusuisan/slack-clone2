-- messages に投稿者識別カラムを追加
-- NULL 許容のまま（既存行は UPDATE しない / 後方互換）
-- ⚠️ RLS は次のプロンプトでまとめて有効化するため、ここでは触らない

alter table public.messages
  add column if not exists user_id uuid references auth.users(id);
