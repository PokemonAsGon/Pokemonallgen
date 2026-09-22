/*
 Pokémon: Seis Regiones — prototipo jugable
 Regiones: Kanto, Johto, Hoenn, Sinnoh, Unova y Kalos.
 48 gimnasios -> Alto Mando + Campeón -> legendarios.
 Mecánica de Megaevolución incluida.

 IMPORTANTE:
 Este proyecto usa figuras y texto generados por código como placeholders.
 Si vas a publicar un fangame, usa arte, música y otros recursos para los que
 tengas permiso/licencia. Los nombres y elementos de Pokémon pertenecen a sus
 respectivos titulares.
*/

const REGIONS = [
  {name:"Kanto", color:0x78c850, gyms:["Brock","Misty","Lt. Surge","Erika","Koga","Sabrina","Blaine","Giovanni"], legend:"Mewtwo"},
  {name:"Johto", color:0xf8d030, gyms:["Falkner","Bugsy","Whitney","Morty","Chuck","Jasmine","Pryce","Clair"], legend:"Lugia"},
  {name:"Hoenn", color:0x6890f0, gyms:["Roxanne","Brawly","Wattson","Flannery","Norman","Winona","Tate & Liza","Juan"], legend:"Rayquaza"},
  {name:"Sinnoh", color:0xc8c8d8, gyms:["Roark","Gardenia","Maylene","Wake","Fantina","Byron","Candice","Volkner"], legend:"Giratina"},
  {name:"Unova", color:0x303030, gyms:["Cilan","Lenora","Burgh","Elesa","Clay","Skyla","Brycen","Drayden"], legend:"Reshiram"},
  {name:"Kalos", color:0xf85888, gyms:["Viola","Grant","Korrina","Ramos","Clemont","Valerie","Olympia","Wulfric"], legend:"Zygarde"}
];

const STARTERS = [
  {name:"Bulbasaur", type:"Planta", hp:125, atk:31, def:30, color:0x78c850},
  {name:"Charmander", type:"Fuego", hp:115, atk:35, def:25, color:0xf08030},
  {name:"Squirtle", type:"Agua", hp:120, atk:30, def:31, color:0x6890f0},
  {name:"Chikorita", type:"Planta", hp:120, atk:30, def:32, color:0x78c850},
  {name:"Cyndaquil", type:"Fuego", hp:115, atk:35, def:26, color:0xf08030},
  {name:"Totodile", type:"Agua", hp:125, atk:32, def:29, color:0x6890f0},
  {name:"Treecko", type:"Planta", hp:118, atk:34, def:29, color:0x78c850},
  {name:"Torchic", type:"Fuego", hp:112, atk:36, def:25, color:0xf08030},
  {name:"Mudkip", type:"Agua", hp:128, atk:31, def:30, color:0x6890f0},
  {name:"Turtwig", type:"Planta", hp:130, atk:29, def:34, color:0x78c850},
  {name:"Chimchar", type:"Fuego", hp:112, atk:37, def:24, color:0xf08030},
  {name:"Piplup", type:"Agua", hp:118, atk:33, def:30, color:0x6890f0},
  {name:"Snivy", type:"Planta", hp:112, atk:35, def:27, color:0x78c850},
  {name:"Tepig", type:"Fuego", hp:125, atk:33, def:28, color:0xf08030},
  {name:"Oshawott", type:"Agua", hp:120, atk:34, def:29, color:0x6890f0},
  {name:"Chespin", type:"Planta", hp:128, atk:31, def:32, color:0x78c850},
  {name:"Fennekin", type:"Fuego", hp:112, atk:36, def:26, color:0xf08030},
  {name:"Froakie", type:"Agua", hp:116, atk:36, def:27, color:0x6890f0}
];

const MEGA = {
  Charizard:"Mega Charizard X", Blastoise:"Mega Blastoise", Venusaur:"Mega Venusaur",
  Lucario:"Mega Lucario", Gardevoir:"Mega Gardevoir", Garchomp:"Mega Garchomp",
  Sceptile:"Mega Sceptile", Swampert:"Mega Swampert", Blaziken:"Mega Blaziken"
};

const ELITE = [
  ["Lorelei","Agua/Hielo"],["Bruno","Lucha/Roca"],["Agatha","Fantasma/Veneno"],["Lance","Dragón"],
  ["Karen","Siniestro"],["Will","Psíquico"],["Koga","Veneno"],["Bruno","Lucha"],
  ["Sidney","Siniestro"],["Phoebe","Fantasma"],["Glacia","Hielo"],["Drake","Dragón"]
];

const LEGENDARY_POOL = [
  "Articuno","Zapdos","Moltres","Raikou","Entei","Suicune","Regirock","Regice","Registeel",
  "Latias","Latios","Uxie","Mesprit","Azelf","Cobalion","Terrakion","Virizion","Xerneas","Yveltal"
];

let state = {
  region: 0,
  gym: 0,
  badges: 0,
  money: 3000,
  party: [],
  caught: [],
  megaUsed: false,
  eliteIndex: 0,
  champion: false,
  legendaryUnlocked: false,
  legendary: null
};

let scene, playerGraphic, enemyGraphic;
let mode = "world";
let battle = null;

function save() {
  localStorage.setItem("sixRegionsSave", JSON.stringify(state));
}
function load() {
  try {
    const x = JSON.parse(localStorage.getItem("sixRegionsSave"));
    if (x) state = x;
  } catch(e) {}
}

class MainScene extends Phaser.Scene {
  constructor(){ super("MainScene"); }

  create() {
    scene = this;
    load();
    this.cameras.main.setBackgroundColor(0x18212a);
    this.drawWorld();
    updateUI();
  }

  drawWorld() {
    this.children.removeAll();
    const w = this.scale.width, h = this.scale.height;
    const r = REGIONS[state.region];

    // Simple 2D procedural map.
    for(let y=0;y<h;y+=48) {
      for(let x=0;x<w;x+=48) {
        const n = Math.abs(Math.sin(x*0.021+y*0.017+state.region));
        const color = n > .55 ? r.color : Phaser.Display.Color.IntegerToColor(r.color).brighten(18).color;
        this.add.rectangle(x+24,y+24,48,48,color).setStrokeStyle(1,0x000000,0.12);
      }
    }

    this.add.rectangle(w/2,h/2,420,230,0x7b5b3a,0.75).setStrokeStyle(4,0xffffff,0.8);
    this.add.text(w/2,h/2-80,`${r.name}`,{
      fontSize:"42px",fontStyle:"bold",color:"#ffffff",stroke:"#000000",strokeThickness:6
    }).setOrigin(.5);

    this.add.text(w/2,h/2-20,
      `Gimnasio ${state.gym+1}/8\n${r.gyms[state.gym] || "Completado"}`,
      {fontSize:"22px",align:"center",color:"#fff",stroke:"#000",strokeThickness:4}
    ).setOrigin(.5);

    this.add.text(w/2,h/2+55,
      state.badges < 48 ? "Pulsa GIMNASIO para combatir" : "¡Alto Mando desbloqueado!",
      {fontSize:"18px",color:"#fff",stroke:"#000",strokeThickness:3,align:"center"}
    ).setOrigin(.5);

    playerGraphic = this.add.circle(w/2,h-90,22,0xffffff).setStrokeStyle(4,0x000000);
    this.add.text(w/2,h-50,"Entrenador",{fontSize:"14px",color:"#fff"}).setOrigin(.5);
  }
}

function startGame() {
  if (state.party.length === 0) {
    chooseStarter();
  } else {
    updateUI();
  }
}

function chooseStarter() {
  mode = "starter";
  setMessage("Elige tu Pokémon inicial. Puedes empezar una aventura por las seis regiones.");
  renderButtons(STARTERS.map((p,i)=>({
    label:p.name,
    fn:()=> {
      state.party=[makeMon(p)];
      save();
      mode="world";
      scene.drawWorld();
      updateUI();
      setMessage(`¡${p.name} se une a tu equipo!`);
    }
  })));
}

function makeMon(template, level=5) {
  return {
    name:template.name, type:template.type, level,
    maxHp:template.hp + level*4, hp:template.hp + level*4,
    atk:template.atk + level*2, def:template.def + level,
    color:template.color, mega:false
  };
}

function getTemplate(name) {
  return STARTERS.find(x=>x.name===name) || STARTERS[0];
}

function createOpponent(label, level) {
  const types = ["Planta","Fuego","Agua","Eléctrico","Roca","Fantasma","Dragón","Hielo"];
  const t = types[(state.badges + level) % types.length];
  const colors = {Planta:0x78c850,Fuego:0xf08030,Agua:0x6890f0,Eléctrico:0xf8d030,Roca:0xb8a038,Fantasma:0x705898,Dragón:0x7038f8,Hielo:0x98d8d8};
  return {
    name: label, type:t, level,
    maxHp:105+level*8, hp:105+level*8, atk:28+level*3, def:25+level*2,
    color:colors[t] || 0xaaaaaa, mega:false
  };
}

function beginBattle(kind) {
  if (state.party.length === 0) return chooseStarter();
  mode = "battle";
  const label = kind==="gym" ? REGIONS[state.region].gyms[state.gym] : kind==="elite" ? ELITE[state.eliteIndex][0] : state.legendary;
  const level = kind==="gym" ? 8 + state.badges*2 : kind==="elite" ? 110 + state.eliteIndex*4 : 150;
  battle = {
    kind,
    player: state.party[0],
    enemy: createOpponent(label, level),
    canMega: state.badges >= 8,
    turn: "player"
  };
  drawBattle();
  setMessage(`¡Combate contra ${label}!`);
}

function drawBattle() {
  scene.children.removeAll();
  const w=scene.scale.width,h=scene.scale.height;
  scene.add.rectangle(w/2,h/2,w,h,0x243447);
  scene.add.ellipse(w*0.72,h*0.42,250,100,0x1d2530);
  scene.add.ellipse(w*0.28,h*0.70,280,110,0x1d2530);
  enemyGraphic=scene.add.circle(w*0.72,h*0.34,62,battle.enemy.color).setStrokeStyle(6,0xffffff);
  playerGraphic=scene.add.circle(w*0.28,h*0.62,70,battle.player.color).setStrokeStyle(6,0xffffff);

  scene.add.text(w*0.72,h*0.22,battle.enemy.name,{fontSize:"25px",fontStyle:"bold",color:"#fff",stroke:"#000",strokeThickness:4}).setOrigin(.5);
  scene.add.text(w*0.28,h*0.80,battle.player.name+(battle.player.mega?" ★":""),{fontSize:"25px",fontStyle:"bold",color:"#fff",stroke:"#000",strokeThickness:4}).setOrigin(.5);
  updateUI();
}

function attack() {
  if (!battle || battle.turn!=="player") return;
  const p=battle.player,e=battle.enemy;
  const dmg=Math.max(5, Math.floor(p.atk * (0.75+Math.random()*0.5) - e.def*0.35));
  e.hp=Math.max(0,e.hp-dmg);
  battle.turn="enemy";
  drawBattle();
  setMessage(`${p.name} hace ${dmg} de daño.`);
  if(e.hp<=0) return winBattle();
  setTimeout(enemyAttack,550);
}

function enemyAttack() {
  if(!battle) return;
  const p=battle.player,e=battle.enemy;
  const dmg=Math.max(4,Math.floor(e.atk*(0.75+Math.random()*0.5)-p.def*0.3));
  p.hp=Math.max(0,p.hp-dmg);
  battle.turn="player";
  drawBattle();
  setMessage(`${e.name} hace ${dmg} de daño.`);
  if(p.hp<=0) loseBattle();
}

function megaEvolve() {
  if(!battle || !battle.canMega || state.megaUsed || battle.player.mega) return;
  const name = MEGA[battle.player.name];
  if(!name) {
    setMessage("Este Pokémon no tiene una Mega Evolución implementada en este prototipo.");
    return;
  }
  battle.player.mega=true;
  battle.player.name=name;
  battle.player.atk+=22;
  battle.player.def+=15;
  battle.player.maxHp+=25;
  battle.player.hp+=25;
  state.megaUsed=true;
  save();
  drawBattle();
  setMessage(`¡Megaevolución! ${name} entra en combate.`);
}

function winBattle() {
  const kind=battle.kind;
  state.money += kind==="gym" ? 1200 : kind==="elite" ? 2500 : 5000;
  battle=null;
  if(kind==="gym") {
    state.badges++;
    state.gym++;
    if(state.gym>=8) {
      state.gym=0;
      state.region++;
      if(state.region>=REGIONS.length) {
        state.region=REGIONS.length-1;
        state.gym=8;
      }
    }
    state.party[0].level += 2;
    state.party[0].maxHp += 8;
    state.party[0].hp = state.party[0].maxHp;
    state.megaUsed=false;
    if(state.badges>=48) {
      mode="world";
      scene.drawWorld();
      setMessage("¡48 medallas! El Alto Mando está desbloqueado.");
    } else {
      mode="world";
      scene.drawWorld();
      setMessage(`¡Medalla conseguida! Llevas ${state.badges}/48.`);
    }
  } else if(kind==="elite") {
    state.eliteIndex++;
    if(state.eliteIndex>=ELITE.length) {
      state.champion=true;
      state.legendaryUnlocked=true;
      state.legendary=LEGENDARY_POOL[Math.floor(Math.random()*LEGENDARY_POOL.length)];
      mode="world";
      scene.drawWorld();
      setMessage(`¡Has superado el Alto Mando y al Campeón! Ahora puedes buscar a ${state.legendary}.`);
    } else {
      beginBattle("elite");
    }
  } else {
    state.caught.push(state.legendary);
    const caught=state.legendary;
    state.legendary=null;
    mode="world";
    scene.drawWorld();
    setMessage(`¡Has atrapado a ${caught}! Ya forma parte de tu colección.`);
  }
  save();
  updateUI();
}

function loseBattle() {
  const name=battle.enemy.name;
  battle=null;
  mode="world";
  state.party.forEach(p=>p.hp=p.maxHp);
  scene.drawWorld();
  setMessage(`Has perdido contra ${name}. Tu equipo ha sido curado.`);
  save();
}

function challengeGym() {
  if(state.badges>=48) return setMessage("Ya has completado todos los gimnasios.");
  beginBattle("gym");
}

function challengeElite() {
  if(state.badges<48) return setMessage("Necesitas las 48 medallas antes de entrar al Alto Mando.");
  if(state.champion) return setMessage("Ya has superado el Alto Mando y al Campeón.");
  beginBattle("elite");
}

function huntLegendary() {
  if(!state.legendaryUnlocked || !state.legendary) return setMessage("Primero supera el Alto Mando y al Campeón.");
  beginBattle("legendary");
}

function changeRegion(dir) {
  state.region=Math.max(0,Math.min(REGIONS.length-1,state.region+dir));
  state.gym=state.region===REGIONS.length-1 && state.badges>=48 ? 8 : Math.min(state.gym,7);
  scene.drawWorld(); updateUI(); save();
}

function resetGame() {
  if(confirm("¿Borrar la partida?")) {
    localStorage.removeItem("sixRegionsSave");
    location.reload();
  }
}

function updateUI() {
  const p=state.party[0];
  document.getElementById("status").innerHTML =
    `<b>Región:</b> ${REGIONS[state.region].name} | `+
    `<b>Medallas:</b> ${state.badges}/48 | `+
    `<b>Dinero:</b> ${state.money} | `+
    (p ? `<b>Equipo:</b> ${p.name} Nv.${p.level} HP ${p.hp}/${p.maxHp}` : `<b>Equipo:</b> sin Pokémon`);
  const b=document.getElementById("buttons");
  b.innerHTML="";
  const add=(label,fn,disabled=false)=>{
    const x=document.createElement("button"); x.textContent=label; x.disabled=disabled; x.onclick=fn; b.appendChild(x);
  };
  if(mode==="world" || mode==="starter") {
    add("GIMNASIO",challengeGym,state.badges>=48 || mode==="starter");
    add("ALTO MANDO",challengeElite,state.badges<48 || state.champion || mode==="starter");
    add("LEGENDARIO",huntLegendary,!state.legendaryUnlocked || !state.legendary || mode==="starter");
    add("← Región",()=>changeRegion(-1),state.region===0 || mode==="starter");
    add("Región →",()=>changeRegion(1),state.region===REGIONS.length-1 || mode==="starter");
    add("Nuevo juego",resetGame);
  }
  if(mode==="battle") {
    add("ATACAR",attack,battle.turn!=="player");
    add("MEGAEVOLUCIÓN",megaEvolve,!battle.canMega || state.megaUsed || battle.player.mega || !MEGA[battle.player.name]);
  }
  if(mode==="starter") {
    // Buttons are populated by chooseStarter.
  }
}

function setMessage(msg) {
  document.getElementById("message").textContent=msg;
  updateUI();
}

function renderButtons(items) {
  const b=document.getElementById("buttons");
  b.innerHTML="";
  for(const item of items) {
    const x=document.createElement("button");
    x.textContent=item.label; x.onclick=item.fn; b.appendChild(x);
  }
}

new Phaser.Game({
  type: Phaser.AUTO,
  width: Math.min(window.innerWidth, 1200),
  height: Math.min(window.innerHeight, 760),
  parent:"game",
  backgroundColor:"#18212a",
  scene:[MainScene],
  scale:{mode:Phaser.Scale.RESIZE,autoCenter:Phaser.Scale.CENTER_BOTH}
});

setTimeout(startGame,100);
