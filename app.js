// Supabase 프로젝트 URL과 anon/public key를 입력하세요.
const SUPABASE_URL="YOUR_SUPABASE_URL";
const SUPABASE_ANON_KEY="YOUR_SUPABASE_ANON_KEY";
const ready=SUPABASE_URL.startsWith("https://")&&!SUPABASE_URL.includes("YOUR_")&&!SUPABASE_ANON_KEY.includes("YOUR_");
const db=ready?window.supabase.createClient(SUPABASE_URL,SUPABASE_ANON_KEY):null;
const $=s=>document.querySelector(s);let rows=[];
const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
function render(){const q=$("#search").value.trim().toLowerCase();const data=rows.filter(p=>(p.title+" "+p.body+" "+p.nickname).toLowerCase().includes(q));$("#postCount").textContent=`게시글 ${rows.length}개`;$("#posts").innerHTML=data.length?data.map(p=>`<article class="post"><h3>${esc(p.title)}</h3><p>${esc(p.body)}</p><div class="meta">${esc(p.nickname||"익명")} · ${new Date(p.created_at).toLocaleString("ko-KR")}</div></article>`).join(""):'<div class="empty">게시글이 없습니다. 첫 글을 작성해 보세요.</div>';}
async function load(){if(!db){$("#posts").innerHTML='<div class="empty">Supabase 연결 설정을 완료하면 게시글이 표시됩니다. README를 확인하세요.</div>';return;}const {data,error}=await db.from("board_posts").select("id,nickname,title,body,created_at").order("created_at",{ascending:false}).limit(100);if(error){$("#posts").innerHTML='<div class="empty">게시글을 불러오지 못했습니다. Supabase 설정을 확인해 주세요.</div>';return;}rows=data||[];render();}
$("#search").addEventListener("input",render);$("#refresh").addEventListener("click",load);
$("#postForm").addEventListener("submit",async e=>{e.preventDefault();const msg=$("#message");if(!db){msg.textContent="Supabase 연결 전입니다. README 안내를 먼저 완료해 주세요.";return;}const f=new FormData(e.currentTarget);const payload={nickname:f.get("nickname").trim()||"익명",title:f.get("title").trim(),body:f.get("body").trim()};const {error}=await db.from("board_posts").insert(payload);if(error){msg.textContent="등록에 실패했습니다. 잠시 후 다시 시도해 주세요.";return;}e.currentTarget.reset();e.currentTarget.nickname.value="익명";msg.textContent="게시글이 등록됐습니다.";await load();});
load();