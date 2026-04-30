-- channel_members テーブル
create table if not exists public.channel_members (
  id uuid primary key default gen_random_uuid(),
  channel_id uuid not null references public.channels(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  joined_at timestamptz not null default now(),
  unique (channel_id, user_id)
);

-- 自分のアカウントを general と random に参加させる
insert into public.channel_members (channel_id, user_id)
select c.id, u.id
from public.channels c
cross join auth.users u
where c.name in ('general', 'random')
  and u.email = 'immrka466@gmail.com'
on conflict (channel_id, user_id) do nothing;

-- RLS は次のプロンプトでまとめて有効化するため、ここでは OFF のまま
