// data/*.json dosyalarını birlikte tarar. Derslik çakışması = hata, hoca/sınıf çakışması = uyarı.
import {readFileSync,readdirSync} from "node:fs";
const D="data/",TT=/^(prof|doç|dr|öğr|üyesi|arş|gör|uzm|öğretim|elemanı)\.?$/;
const norm=s=>(s||"").toLocaleLowerCase("tr").replace(/\s+/g," ").trim();
const ny=s=>norm(s).replace(/[\s-]/g,"");
const hs=s=>norm(s).split(/\s*[·;,\/&+]\s*/).map(n=>n.split(/\s+/).filter(w=>w&&!TT.test(w)).join(" ")).filter(Boolean);
const dk=t=>{const[a,b]=t.split(":").map(Number);return a*60+b};
const C=[];
for(const f of readdirSync(D)){
  if(!f.endsWith(".json")||f==="donem.json"||f==="derslikler.json")continue;
  try{for(const c of JSON.parse(readFileSync(D+f,"utf8")).dersler||[])C.push({...c,bol:f.slice(0,-5)})}
  catch(e){console.log(`::error file=${D+f}::JSON okunamadı: ${e.message}`);process.exit(1)}
}
const lab=c=>`${c.kod} (${c.bol}/${c.prog}${c.sinif?"/"+c.sinif+". sınıf":""})`;
let hata=0,uyari=0;
for(let i=0;i<C.length;i++)for(let j=i+1;j<C.length;j++){
  const a=C[i],b=C[j];
  if(a.gun!==b.gun||!(dk(a.bas)<dk(b.bit)&&dk(b.bas)<dk(a.bit)))continue;
  const hb=hs(b.hoca),t=[];
  if(hs(a.hoca).some(x=>hb.includes(x)))t.push(["Hoca","warning"]);
  if(a.yer&&ny(a.yer)===ny(b.yer)&&!/uzem/i.test(a.yer))t.push(["Derslik","error"]);
  if(a.prog==="lisans"&&b.prog==="lisans"&&a.bol===b.bol&&a.sinif===b.sinif)t.push(["Sınıf","warning"]);
  for(const[n,lv]of t){
    console.log(`::${lv}::${n} çakışması · ${a.gun} ${a.bas}–${a.bit} · ${lab(a)} ↔ ${lab(b)}`);
    lv==="error"?hata++:uyari++;
  }
}
console.log(`${C.length} ders tarandı: ${hata} derslik çakışması, ${uyari} uyarı.`);
process.exit(hata?1:0);
