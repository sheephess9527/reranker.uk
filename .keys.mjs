import fs from "fs"; import path from "path"; import { parse } from "node-html-parser";
const R="public";
const SEL=["main h1","main h2","main h3","main h4","main p","main li","main blockquote","main td","main th","main .meta","main .btn"].join(", ");
const norm=s=>(s||"").replace(/\s+/g," ").trim();
for(const rel of process.argv.slice(2)){
  const en=parse(fs.readFileSync(path.join(R,rel),"utf8"));
  console.log("### "+rel);
  for(const el of en.querySelectorAll(SEL)){
    if(el.closest("pre")||el.querySelector("p, li, table, ol"))continue;
    const k=norm(el.innerHTML); if(!k||k.length<3)continue;
    console.log(JSON.stringify(k));
  }
  console.log();
}
