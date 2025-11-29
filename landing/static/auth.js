// Simple client-side auth script: posts to /auth/login or /auth/signup, stores token in localStorage, and redirects to next
(function(){
  function qs(name){
    const params = new URLSearchParams(window.location.search);
    return params.get(name);
  }

  const form = document.getElementById('auth-form');
  const loginBtn = document.getElementById('login');
  const signupBtn = document.getElementById('signup');
  const msg = document.getElementById('msg');

  async function send(url, payload){
    try{
      const res = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      const data = await res.json();
      if (!res.ok){ msg.textContent = data.error || 'Auth failed'; return null; }
      return data;
    }catch(e){ msg.textContent = e.message; return null; }
  }

  function saveToken(token){
    try{ localStorage.setItem('qm_token', token); }catch(e){ console.warn('failed to persist token', e); }
  }

  function redirectAfter(){
    const next = qs('next') || '/';
    window.location.href = next;
  }

  loginBtn.addEventListener('click', async (ev)=>{
    ev.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const data = await send('/auth/login', { username, password });
    if (data && data.token){ saveToken(data.token); redirectAfter(); }
  });

  signupBtn.addEventListener('click', async (ev)=>{
    ev.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const data = await send('/auth/signup', { username, password });
    if (data && data.token){ saveToken(data.token); redirectAfter(); }
  });
})();
