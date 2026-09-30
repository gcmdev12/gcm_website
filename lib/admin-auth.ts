const TOKEN_KEY = 'gcm_admin_access_token'
const ADMIN_KEY = 'gcm_admin_profile'
export type AdminProfile = { id:string; email:string; firstName:string; lastName:string; role:string; isActive:boolean }
export function saveAdminSession(accessToken:string, admin:AdminProfile, remember:boolean){ const storage=remember?localStorage:sessionStorage; const other=remember?sessionStorage:localStorage; other.removeItem(TOKEN_KEY); other.removeItem(ADMIN_KEY); storage.setItem(TOKEN_KEY,accessToken); storage.setItem(ADMIN_KEY,JSON.stringify(admin)) }
export function getAdminToken(){ if(typeof window==='undefined') return null; return localStorage.getItem(TOKEN_KEY)||sessionStorage.getItem(TOKEN_KEY) }
export function getAdminProfile():AdminProfile|null{ if(typeof window==='undefined') return null; const raw=localStorage.getItem(ADMIN_KEY)||sessionStorage.getItem(ADMIN_KEY); if(!raw)return null; try{return JSON.parse(raw) as AdminProfile}catch{return null} }
export function clearAdminSession(){ if(typeof window==='undefined')return; localStorage.removeItem(TOKEN_KEY);localStorage.removeItem(ADMIN_KEY);sessionStorage.removeItem(TOKEN_KEY);sessionStorage.removeItem(ADMIN_KEY) }
