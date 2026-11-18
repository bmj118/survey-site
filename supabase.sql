-- Supabase SQL Editor에서 실행
create table if not exists public.board_posts (
 id bigint generated always as identity primary key,
 nickname text not null default '익명' check (char_length(nickname) between 1 and 20),
 title text not null check (char_length(title) between 1 and 100),
 body text not null check (char_length(body) between 1 and 10000),
 created_at timestamptz not null default now()
);
alter table public.board_posts enable row level security;
create policy "Anyone can read board posts"
on public.board_posts for select to anon, authenticated using (true);
create policy "Anyone can write board posts"
on public.board_posts for insert to anon, authenticated
with check (char_length(title) between 1 and 100 and char_length(body) between 1 and 10000 and char_length(nickname) between 1 and 20);
