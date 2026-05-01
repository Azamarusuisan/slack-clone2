-- messages テーブルを supabase_realtime publication に追加
alter publication supabase_realtime add table public.messages;
