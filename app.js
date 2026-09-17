const AZ = [
  ["А","а","авион","slike/a.png"],["Б","б","бубамара","slike/b.png"],["В","в","воз","slike/v-voz.png"],
  ["Г","г","грожђе","slike/g.png"],["Д","д","дрво","slike/d.png"],["Ђ","ђ","ђак","slike/dj.png"],
  ["Е","е","ексер","slike/e.png"],["Ж","ж","жирафа","slike/zh.png"],["З","з","змија","slike/z.png"],
  ["И","и","игла","slike/i.png"],["Ј","ј","јабука","slike/j.png"],["К","к","кит","slike/k.png?v=2"],
  ["Л","л","лав","slike/l.png"],["Љ","љ","љуљашка","slike/lj.png"],["М","м","медвед","slike/m.png"],
  ["Н","н","ној","slike/nj.png"],["Њ","њ","њива","slike/njiva.png"],["О","о","овца","slike/o.png"],
  ["П","п","пас","slike/p.png"],["Р","р","рода","slike/r.png"],["С","с","слон","slike/s.png"],
  ["Т","т","трактор","slike/t.png"],["Ћ","ћ","ћурка","slike/ch2.png"],["У","у","усисивач","slike/u.png"],
  ["Ф","ф","фока","slike/f.png"],["Х","х","хлеб","slike/h.png"],["Ц","ц","цвет","slike/c.png?v=2"],
  ["Ч","ч","чамац","slike/ch.png?v=2"],["Џ","џ","џип","slike/dzh.png"],["Ш","ш","шаргарепа","slike/sh.png?v=2"]
];
const EXTRA = [
  ["сова","slike/sova.png"],["делфин","slike/delfin.png"],["жаба","slike/zaba.png"],["јеж","slike/jez.png"],
  ["мачка","slike/macka.png"],["сладолед","slike/sladoled.png"],["кишобран","slike/kisobran.png"],["сир","slike/sir.png"],
  ["сат","slike/sat.png"],["лептир","slike/leptir.png"],["лопта","slike/lopta.png"],["сунце","slike/sunce.png"],
  ["лабуд","slike/labud.png"],["једрилица","slike/jedrilica.png"],["ксилофон","slike/ksilofon.png"],["бик","slike/bik.png"],
  ["ауто","slike/auto.png"],["ковчег","slike/kovceg.png"],["пиле","slike/pile.png"],["шатор","slike/sator.png"],
  ["кућа","slike/kuca.png"],["скакавац","slike/skakavac.png"],
  ["ракета","slike/raketa.png"],["зец","slike/zec.png"],["књига","slike/knjiga.png"],["торта","slike/torta.png"],
  ["робот","slike/robot.png"],["гитара","slike/gitara.png"],["лисица","slike/lisica.png"],["корњача","slike/kornjaca.png"],
  ["патка","slike/patka.png"],["дуга","slike/duga.png"],
  ["панда","slike/panda.png"],["диносаурус","slike/dinosaurus.png"],["хеликоптер","slike/helikopter.png"],["коцке","slike/kocke.png"],
  ["коњ","slike/konj.png"],["чизма","slike/cizma.png"],["зебра","slike/zebra.png"],["добош","slike/dobos.png"],
  ["пингвин","slike/pingvin.png"],["аутобус","slike/autobus.png"],["пуж","slike/puz.png"],["бицикл","slike/bicikl.png"],
  ["риба","slike/riba.png"],["месец","slike/mesec.png"],["мајмун","slike/majmun.png"],["банана","slike/banana.png"],
  ["јагода","slike/jagoda.png"],["лимун","slike/limun.png"],["кључ","slike/kljuc.png"],
  ["кукуруз","slike/kukuruz.png"],["ананас","slike/ananas.png"],["вишња","slike/visnja.png"],["рак","slike/rak.png"],
  ["фламинго","slike/flamingo.png"],["крокодил","slike/krokodil.png"],["паун","slike/paun.png"],["кенгур","slike/kengur.png"],
  ["коала","slike/koala.png"],["јелен","slike/jelen.png"],
  ["палачинке","slike/palacinke.png"],["санке","slike/sanke.png"],["ролери","slike/roleri.png"],["перница","slike/pernica.png"],
  ["лењир","slike/lenjir.png"],["змај","slike/zmaj.png"],["семафор","slike/semafor.png"],["кактус","slike/kaktus.png"]
];
const POOL = AZ.map((l) => [l[2], l[3]]).concat(EXTRA);
const BIG = AZ.map((l) => l[0]);
const LOW = AZ.map((l) => l[1]);

const $ = (id) => document.getElementById(id);
const el = { pic: $("pic"), strip: $("strip"), board: $("board"), party: $("party"), progress: $("progress"),
  jump: $("jump"), len: $("len"), status: $("status"), btnCase: $("btnCase"), btnBack: $("btnBack"),
  btnPrev: $("btnPrev"), btnNext: $("btnNext"), btnHint: $("btnHint") };

function shuffled(n) {
  const a = Array.from({ length: n }, (_, i) => i);
  for (let i = n - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); const t = a[i]; a[i] = a[j]; a[j] = t; }
  return a;
}

const S = { order: shuffled(POOL.length), pos: 0, typed: [], lower: false, solved: false, wrong: false, hints: 0, done: 0 };
let timer = null;
const target = () => POOL[S.order[S.pos]];
const norm = (ch) => { const i = BIG.indexOf(ch); return i >= 0 ? LOW[i] : ch.toLowerCase(); };
const later = (fn, ms) => { clearTimeout(timer); timer = setTimeout(fn, ms); };

function add(ch) {
  if (S.solved) return;
  const word = target()[0];
  if (S.typed.length >= word.length) return;
  const typed = S.typed.concat([ch]);
  const guess = typed.map(norm).join("");
  if (guess === word.slice(0, guess.length)) {
    S.typed = typed; S.wrong = false;
    S.solved = guess.length === word.length;
    if (S.solved) { S.done++; later(next, 2400); }
  } else {
    S.typed = typed; S.wrong = true;
    render();
    setTimeout(() => { S.typed = S.typed.slice(0, -1); S.wrong = false; render(); }, 480);
    return;
  }
  render();
}

function reset() { S.typed = []; S.solved = false; S.wrong = false; S.hints = 0; clearTimeout(timer); }

function next() {
  reset();
  S.pos++;
  if (S.pos >= S.order.length) { S.order = shuffled(POOL.length); S.pos = 0; }
  render();
}

function prev() { reset(); S.pos = (S.pos - 1 + S.order.length) % S.order.length; render(); }

/* превлачење слова прстом / мишем */
let drag = null, lastDragEnd = 0;
function overStrip(x, y) {
  const r = el.strip.getBoundingClientRect(), p = 40;
  return x > r.left - p && x < r.right + p && y > r.top - p && y < r.bottom + p;
}
function cleanupDrag() {
  if (drag && drag.ghost) drag.ghost.remove();
  window.removeEventListener("pointermove", onMove);
  window.removeEventListener("pointerup", onUp);
  window.removeEventListener("pointercancel", onUp);
  drag = null;
}
function onMove(e) {
  if (!drag) return;
  if (!drag.started && Math.abs(e.clientX - drag.x0) + Math.abs(e.clientY - drag.y0) < 8) return;
  if (!drag.started) {
    drag.started = true;
    const g = document.createElement("div");
    g.className = "drag-ghost";
    g.textContent = drag.ch;
    document.body.appendChild(g);
    drag.ghost = g;
  }
  drag.ghost.style.left = e.clientX + "px";
  drag.ghost.style.top = e.clientY + "px";
  drag.ghost.style.opacity = overStrip(e.clientX, e.clientY) ? "1" : ".45";
}
function onUp(e) {
  if (drag && drag.started) {
    if (overStrip(e.clientX, e.clientY)) add(drag.ch);
    lastDragEnd = Date.now();
  }
  cleanupDrag();
}

function buildBoard() {
  el.board.textContent = "";
  AZ.forEach((l) => {
    const k = document.createElement("div");
    k.className = "key";
    k.title = l[2];
    const ch = document.createElement("span");
    ch.className = "ch";
    const thumb = document.createElement("span");
    thumb.className = "thumb";
    const img = document.createElement("img");
    img.src = l[3]; img.alt = "";
    thumb.appendChild(img);
    k.append(ch, thumb);
    k.addEventListener("pointerdown", (e) => {
      cleanupDrag();
      drag = { ch: k.dataset.ch, x0: e.clientX, y0: e.clientY, started: false };
      window.addEventListener("pointermove", onMove);
      window.addEventListener("pointerup", onUp);
      window.addEventListener("pointercancel", onUp);
    });
    k.addEventListener("click", () => {
      if (Date.now() - lastDragEnd < 300) return;
      add(k.dataset.ch);
    });
    el.board.appendChild(k);
    k._ch = ch; k._row = l;
  });
}

function renderBoard() {
  Array.from(el.board.children).forEach((k) => {
    const c = S.lower ? k._row[1] : k._row[0];
    k.dataset.ch = c;
    k._ch.textContent = c;
  });
}

function renderSlots() {
  const word = target()[0];
  el.strip.textContent = "";
  el.strip.style.gridTemplateColumns = "repeat(" + word.length + ", minmax(0, 1fr))";
  el.strip.style.maxWidth = (word.length * 80) + "px";
  for (let i = 0; i < word.length; i++) {
    const has = i < S.typed.length;
    const raw = has ? S.typed[i] : "";
    const bad = S.wrong && i === S.typed.length - 1;
    const d = document.createElement("div");
    d.className = "slot" + (has ? " has" : "") + (bad ? " bad" : "");
    d.textContent = has ? (S.lower ? norm(raw) : (LOW.indexOf(raw) >= 0 ? BIG[LOW.indexOf(raw)] : raw)) : "";
    el.strip.appendChild(d);
  }
}

function renderParty() {
  el.party.textContent = "";
  if (!S.solved) { el.party.className = ""; return; }
  el.party.className = "party";
  const word = target()[0];
  const colors = ["#2b87b8", "#2f8f6a", "#c9411f", "#f0a63c", "#1c6690", "#7bc4a4"];
  const ring = document.createElement("span"); ring.className = "ring";
  const bits = document.createElement("span"); bits.className = "bits";
  for (let i = 0; i < 18; i++) {
    const a = (Math.PI * 2 * i) / 18 + 0.2;
    const dist = 90 + (i % 4) * 34;
    const s = document.createElement("span");
    s.style.position = "absolute"; s.style.left = "50%"; s.style.top = "50%";
    s.style.setProperty("--dx", Math.round(Math.cos(a) * dist) + "px");
    s.style.setProperty("--dy", Math.round(Math.sin(a) * dist * 0.75) + "px");
    s.style.animation = "burst 1.15s cubic-bezier(.2,.7,.3,1) " + ((i % 6) * 0.06) + "s infinite";
    if (i % 3 === 1) { s.style.fontSize = "22px"; s.style.lineHeight = "1"; s.textContent = "⭐"; }
    else {
      s.style.width = (i % 3 === 0 ? 14 : 9) + "px";
      s.style.height = (i % 2 === 0 ? 14 : 9) + "px";
      s.style.borderRadius = i % 4 === 0 ? "50%" : "3px";
      s.style.background = colors[i % colors.length];
    }
    bits.appendChild(s);
  }
  const badge = document.createElement("div"); badge.className = "badge";
  const star = document.createElement("span"); star.className = "star"; star.textContent = "⭐";
  const w = document.createElement("span"); w.className = "word";
  word.toUpperCase().split("").forEach((c, i) => {
    const sp = document.createElement("span");
    sp.textContent = c;
    sp.style.color = i % 2 ? "#1c6690" : "#2f8f6a";
    sp.style.animation = "bounceLetter 1.1s ease-in-out " + (i * 0.08) + "s infinite";
    w.appendChild(sp);
  });
  badge.append(star, w);
  el.party.append(ring, bits, badge);
}

function render() {
  const t = target(), word = t[0];
  if (el.pic.src.indexOf(t[1]) < 0) { el.pic.src = t[1]; }
  el.len.textContent = word.length + " слова";
  el.progress.textContent = (S.pos + 1) + " / " + POOL.length + " · решено: " + S.done;
  el.jump.max = POOL.length;
  el.jump.value = S.pos + 1;
  el.status.textContent = S.solved ? "ТАЧНО!" : (S.hints > 0 ? "Почетак: " + word.slice(0, S.hints).toUpperCase() : "");
  el.btnCase.textContent = S.lower ? "Велика слова" : "Мала слова";
  el.btnPrev.hidden = S.pos === 0;
  renderBoard();
  renderSlots();
  renderParty();
}

el.btnCase.addEventListener("click", () => { S.lower = !S.lower; render(); });
el.btnBack.addEventListener("click", () => { if (!S.solved) { S.typed = S.typed.slice(0, -1); S.wrong = false; render(); } });
el.btnPrev.addEventListener("click", prev);
el.btnNext.addEventListener("click", next);
el.btnHint.addEventListener("click", () => {
  if (S.solved) return;
  const word = target()[0];
  S.hints = Math.min(S.hints + 1, word.length);
  S.typed = word.slice(0, S.hints).split("").map((c) => (S.lower ? c : BIG[LOW.indexOf(c)] || c));
  S.wrong = false;
  S.solved = S.hints === word.length;
  if (S.solved) later(next, 2400);
  render();
});
el.jump.addEventListener("change", () => {
  const n = parseInt(el.jump.value, 10);
  if (!n || n < 1 || n > POOL.length) { render(); return; }
  reset(); S.pos = n - 1; render();
});

buildBoard();
render();
