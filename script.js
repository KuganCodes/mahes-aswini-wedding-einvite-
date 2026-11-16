
/* ============================================================
   EDIT EVERYTHING HERE — no other code changes needed
   ============================================================ */
var CONFIG = {
coupleA: { name:"Aswini",     short:"Aswini" },
coupleB: { name:"Maheswaran", short:"Maheswaran" },
  monogram:"M & A",
  hashtag: "#MaheswaranWedsAswini",
  rsvpBy:  "10 November 2026",

  weddingDate: "2026-11-22",
  weddingStart:"09:15",
  weddingTimeText:"Muhurtham 06:00–07:30 am",
  venueName:"Anandha Kalyana Mandapam, Puducherry",
  venueAddress:" Puducherry",
  mapQuery:"Anandha Kalyana Mandapam Puducherry",

  mapLink:"",

  /* ↓↓↓ REPLACE THESE TWO WITH THE FAMILY'S REAL NUMBER ↓↓↓
     familyWhatsApp: country code + number, digits only (e.g. "919876543210")
     Leave blank and the RSVP button copies the message to the clipboard instead. */
  familyWhatsApp:"",
  familyPhone:"",

  musicSrc:"art/music.mp3"
};

/* line  = the short line on the timeline
   card  = the full illustrated invitation shown in the stack
   video = the animated version, opened from the card                   */
var SCHEDULE = [

{ key:'wedding', name:'Reception', date:'2026-11-23', start:'09:15', timeText:'Muhurtham 9:15 – 10:00 AM',
    ovTop:'56.8%',
    quote:'Where two hearts unite in love, tradition and forever',
    line:'Two souls, one sacred bond',
    card:'img/card_wedding.jpg', video:'media/5.mp4', poster:'img/poster5.jpg' },
  { key:'sangeet', name:'The Wedding', date:'2026-11-25', start:'19:00', timeText:'7:00 PM onwards',
    ovTop:'56.3%',
    quote:'An evening of music, dance and sparkling memories',
    line:'Music, dance and endless fun',
    card:'img/card_sangeet.jpg', video:'media/4.mp4', poster:'img/poster4.jpg' }
  
];

var REVEAL = {
  haldi:   {mode:'wipe', brush:.15, thresh:.44, hint:'Keep scratching',
            coach:'Scratch away the turmeric', sub:'Drag your finger across the card'},
  mehendi: {mode:'wipe', henna:true, brush:.13, thresh:.42, hint:'Keep scratching',
            coach:'Scratch away the henna', sub:'Drag your finger across the card'},
  sangeet: {mode:'tap', inst:'dhol', need:2, hint:'One more beat',
            coach:'Play the dhol', sub:'Tap the drum twice'},
  wedding: {mode:'butterfly', hint:'Let them carry it away',
            coach:'Set the butterflies free', sub:'Tap once and watch'}
};

var ART = {
  petals:["art/petal0.png","art/petal1.png","art/petal2.png","art/petal3.png","art/petal4.png","art/petal5.png"],
  bfly:["art/bfly0.png","art/bfly1.png","art/bfly2.png","art/bfly3.png","art/bfly4.png","art/bfly5.png","art/bfly6.png","art/bfly7.png"],
  dhol:"art/dhol_small.png",
  lotus:"art/lotus.png"
};
/* ============================================================ */

var REDUCED = window.matchMedia && window.matchMedia('(prefers-reduced-motion:reduce)').matches;
var MONTHS=['January','February','March','April','May','June','July','August','September','October','November','December'];
var MON3=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
var WD=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
var WD3=['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
function parseLocal(d,t){var p=d.split('-'),x=(t||'18:00').split(':');return new Date(+p[0],+p[1]-1,+p[2],+x[0],+x[1],0);}
function pretty(d){var x=parseLocal(d);return WD[x.getDay()]+', '+x.getDate()+' '+MONTHS[x.getMonth()]+' '+x.getFullYear();}
function mapUrl(){return CONFIG.mapLink||('https://www.google.com/maps/search/?api=1&query='+encodeURIComponent(CONFIG.mapQuery));}
function txt(id,v){var e=document.getElementById(id);if(e)e.textContent=v;}
function plain(h){var d=document.createElement('div');d.innerHTML=h;return d.textContent;}
function evByKey(k){for(var i=0;i<SCHEDULE.length;i++)if(SCHEDULE[i].key===k)return SCHEDULE[i];return null;}

document.title=CONFIG.coupleB.name+' & '+CONFIG.coupleA.name+' · '+pretty(CONFIG.weddingDate).replace(/^[A-Za-z]+, /,'');
txt('sealMono',CONFIG.monogram); txt('sealMono2',CONFIG.monogram);
txt('teamBName',CONFIG.coupleB.short); txt('teamGName',CONFIG.coupleA.short);
txt('vName',CONFIG.venueName); txt('vAddr',CONFIG.venueAddress);
txt('vDate',pretty(CONFIG.weddingDate)); txt('vTime',CONFIG.weddingTimeText);
document.getElementById('introNames').innerHTML=CONFIG.coupleB.short+' &amp; '+CONFIG.coupleA.short;
document.getElementById('footSig').innerHTML=CONFIG.coupleB.short+' &amp; '+CONFIG.coupleA.short;
txt('cplB',CONFIG.coupleB.name); txt('cplA',CONFIG.coupleA.name);
txt('cplDate',pretty(CONFIG.weddingDate).replace(/^[A-Za-z]+, /,''));
txt('cplTime',CONFIG.weddingTimeText.replace(/^Muhurtham\s*/,''));
txt('cplWhere',CONFIG.venueName.split(',').pop().trim()||CONFIG.venueName);
txt('cplTag',CONFIG.hashtag);
document.getElementById('vDir').href=mapUrl();

/* ===== ambient petals ===== */
var PETAL_IMGS=ART.petals.map(function(s){var i=new Image();i.src=s;return i;});
var petalBurst=function(){};
(function(){
  if(REDUCED) return;
  var c=document.getElementById('petals'),x=c.getContext('2d');
  var W,H,DPR=Math.min(window.devicePixelRatio||1,2);
  function resize(){W=c.width=Math.floor(innerWidth*DPR);H=c.height=Math.floor(innerHeight*DPR);
    c.style.width=innerWidth+'px';c.style.height=innerHeight+'px';}
  resize(); addEventListener('resize',resize);
  function mk(burst){
    var im=PETAL_IMGS[(Math.random()*PETAL_IMGS.length)|0];
    return {x:burst?W*(0.28+Math.random()*0.44):Math.random()*W,
      y:burst?-20*DPR:Math.random()*H, s:(4.5+Math.random()*5.5)*DPR,
      vy:(0.30+Math.random()*0.55)*DPR*(burst?2.4:1),
      sway:(18+Math.random()*38)*DPR, ph:Math.random()*6.28, vph:0.008+Math.random()*0.014,
      rot:Math.random()*6.28, vrot:(Math.random()-0.5)*0.04,
      img:im, op:0.30+Math.random()*0.24, burst:!!burst};
  }
  function draw(p){
    if(!p.img.complete||!p.img.naturalWidth) return;
    x.save(); x.translate(p.x+Math.sin(p.ph)*p.sway,p.y); x.rotate(p.rot); x.globalAlpha=p.op;
    var ar=p.img.naturalHeight/p.img.naturalWidth, w=p.s*2, h=w*ar;
    x.drawImage(p.img,-w/2,-h/2,w,h); x.restore();
  }
  var arr=[],BASE=innerWidth<520?4:7,raf;
  for(var i=0;i<BASE;i++) arr.push(mk(false));
  function frame(){
    x.clearRect(0,0,W,H);
    for(var i=arr.length-1;i>=0;i--){var p=arr[i];
      p.y+=p.vy; p.ph+=p.vph; p.rot+=p.vrot; draw(p);
      if(p.y>H+30*DPR){ if(p.burst){arr.splice(i,1);} else {p.y=-p.s*2;p.x=Math.random()*W;p.ph=Math.random()*6.28;} }
    }
    raf=requestAnimationFrame(frame);
  }
  raf=requestAnimationFrame(frame);
  document.addEventListener('visibilitychange',function(){
    if(document.hidden){cancelAnimationFrame(raf);} else {raf=requestAnimationFrame(frame);}});
  /* bursts are a sprinkle, not a shower — they must never curtain the page */
  petalBurst=function(n){
    n=Math.min(12,Math.max(3,Math.round((n||40)*0.18)));
    for(var k=0;k<n;k++) arr.push(mk(true));
  };
})();

/* ===== music =====
   Every film on the site is muted, so this track is the only sound. It is
   looped through the Web Audio API rather than <audio loop>,
   because mp3 decoding adds a few milliseconds of padding at each end and
   that shows up as a click every time the loop wraps. The file itself is
   also crossfaded end-to-start, so the wrap is inaudible either way. */
var musicOn=true;
var MCTX=null,MGAIN=null,MBUF=null,MSRC=null,mWant=false,mLoading=false,bgmEl=null;
var MVOL=0.5;
function mCtx(){
  if(MCTX!==null)return MCTX;
  try{
    MCTX=new (window.AudioContext||window.webkitAudioContext)();
    MGAIN=MCTX.createGain();MGAIN.gain.value=0;MGAIN.connect(MCTX.destination);
  }catch(e){MCTX=false;}
  return MCTX;
}
function mElement(){
  if(bgmEl||!CONFIG.musicSrc)return bgmEl;
  bgmEl=new Audio(CONFIG.musicSrc);bgmEl.loop=true;bgmEl.volume=0;bgmEl.preload='auto';
  try{bgmEl.load();}catch(e){}
  return bgmEl;
}
function mLoad(){
  if(mLoading||MBUF||!CONFIG.musicSrc||!mCtx())return;
  mLoading=true;
  fetch(CONFIG.musicSrc)
    .then(function(r){return r.arrayBuffer();})
    .then(function(b){
      return new Promise(function(res,rej){
        var pr=MCTX.decodeAudioData(b,res,rej);
        if(pr&&pr.then)pr.then(res,rej);
      });
    })
    .then(function(buf){MBUF=buf;if(mWant&&musicOn)mPlay();})
    .catch(function(){                       /* file:// or a codec refusal */
      mElement(); if(mWant&&musicOn)mPlayEl();
    });
}
function mPlay(){
  if(MSRC||!MBUF||!MCTX)return;
  if(MCTX.state==='suspended')MCTX.resume();
  MSRC=MCTX.createBufferSource();
  MSRC.buffer=MBUF;MSRC.loop=true;          /* sample-accurate, no gap */
  MSRC.connect(MGAIN);MSRC.start(0);
}
function mPlayEl(){
  var el=mElement(); if(!el)return;
  var pr=el.play();
  if(pr&&pr.catch)pr.catch(function(){
    var retry=function(){el.play().catch(function(){});
      document.removeEventListener('touchend',retry);document.removeEventListener('click',retry);};
    document.addEventListener('touchend',retry);document.addEventListener('click',retry);
  });
}
function mRamp(to,secs){
  to=Math.max(0,Math.min(1,to));
  if(MGAIN&&MCTX){
    var t=MCTX.currentTime;
    MGAIN.gain.cancelScheduledValues(t);
    MGAIN.gain.setValueAtTime(MGAIN.gain.value,t);
    MGAIN.gain.linearRampToValueAtTime(to,t+(secs||0.6));
  }
  if(bgmEl){
    var from=bgmEl.volume,steps=Math.max(1,Math.round((secs||0.6)*20)),k=0;
    var iv=setInterval(function(){
      k++;bgmEl.volume=Math.max(0,Math.min(1,from+(to-from)*k/steps));
      if(k>=steps)clearInterval(iv);
    },50);
  }
}
/* the first tap unlocks audio and starts fetching */
function musicClaim(){
  if(!CONFIG.musicSrc)return;
  var c=mCtx();
  if(c){ if(c.state==='suspended')c.resume(); mLoad(); }
  else { mElement(); }
}
/* the song enters as the doors open */
function musicBloom(){
  mWant=true;
  if(!musicOn)return;
  if(MBUF)mPlay(); else if(bgmEl)mPlayEl(); else mLoad();
  mRamp(MVOL,1.4);
}
/* the films are silent, so the music simply plays on */
function musicDuck(){}
(function(){
  var fb=document.createElement('button');fb.id='musicBtn';fb.type='button';
  fb.setAttribute('aria-label','Toggle sound');fb.textContent='\uD83C\uDFB5';
  fb.addEventListener('click',function(){
    musicOn=!musicOn;
    fb.textContent=musicOn?'\uD83C\uDFB5':'\uD83D\uDD07';
    fb.classList.toggle('off',!musicOn);
    var gv=document.getElementById('entryVid'); if(gv)gv.muted=!musicOn;
    if(!musicOn){ mRamp(0,0.4); }
    else {
      if(MBUF)mPlay(); else if(bgmEl)mPlayEl(); else {musicClaim();}
      mWant=true; mRamp(MVOL,0.6);
    }
  });
  document.body.appendChild(fb);
})();

/* ===== shared flourishes ===== */
function goldBloom(host){
  var b=document.createElement('div');b.className='gold-bloom';host.appendChild(b);
  requestAnimationFrame(function(){b.classList.add('on');});
  setTimeout(function(){b.classList.add('off');},1100);
  setTimeout(function(){b.remove();},2300);
}
function sparkleStage(host){
  for(var i=0;i<18;i++){
    var s=document.createElement('span');s.className='lb-spark';s.textContent='\u2726';
    s.style.left=(5+Math.random()*90)+'%';s.style.top=(5+Math.random()*88)+'%';
    s.style.fontSize=(9+Math.random()*16)+'px';s.style.animationDelay=(Math.random()*0.8)+'s';
    s.style.animationDuration=(0.7+Math.random()*0.7)+'s';host.appendChild(s);
    (function(el){setTimeout(function(){el.remove();},2300);})(s);}
}

/* ===== entry sequence: one tap on the seal, gold, then the invitation film ===== */
(function(){
  var stage=document.getElementById('stage'),
      box=document.getElementById('envbox'),
      seal=document.getElementById('envSeal'),
      ring=document.getElementById('sealRing'),
      gold=document.getElementById('goldFill'),
      v=document.getElementById('entryVid'),
      skip=document.getElementById('entrySkip'),
      cue=document.getElementById('cue');
  var opened=false, filmOn=false, finished=false;

  /* the celebrations, listed under the film so guests know what follows */
  (function(){
    var list=document.getElementById('efList');
    if(!list)return;
    SCHEDULE.forEach(function(ev){
      var s=document.createElement('span');
      s.textContent=plain(ev.name);
      list.appendChild(s);
    });
  })();

  /* the film does not disappear — it holds on its last frame and the guest scrolls on */
  function finish(){
    if(finished)return; finished=true;
    skip.classList.remove('show');
    try{v.pause();}catch(e){}
    musicBloom();                          /* the song takes over as the film bows out */
    petalBurst(70);
    cue.classList.add('show');
  }

  function playFilm(){
    if(filmOn||finished)return; filmOn=true;
    stage.classList.add('stage-film');
    v.muted=true;
    var p=v.play();
    if(p&&p.catch)p.catch(function(){
      v.muted=true;var q=v.play();if(q&&q.catch)q.catch(finish);});
    /* if it never actually advances, don't strand the guest on a still frame */
    setTimeout(function(){if(!finished&&v.currentTime<0.15)finish();},3200);
  }

  function open(){
    if(opened)return; opened=true;
    musicClaim();
     musicBloom();                            /* unlock audio while we still have the tap */
    ring.classList.add('go');
    box.classList.add('opened');
    sparkleStage(box);
    petalBurst(34);
    /* straight from the tap into gold, and out of the gold into the film */
    setTimeout(function(){ gold.classList.add('on'); },260);
    setTimeout(function(){ playFilm(); },1250);
    setTimeout(function(){ gold.classList.add('off'); },1550);
    setTimeout(function(){ gold.style.display='none'; skip.classList.add('show'); },2500);
  }

  v.addEventListener('ended',finish);
  v.addEventListener('error',finish);
  v.addEventListener('timeupdate',function(){
    if(v.duration&&v.currentTime>=v.duration-0.25)finish();});

  seal.addEventListener('click',function(e){e.stopPropagation();open();});
  box.addEventListener('click',open);
  skip.addEventListener('click',function(e){e.stopPropagation();
    if(!opened)open();
    finish();});
  document.getElementById('scrollBtn').addEventListener('click',function(){
    var t=document.getElementById('couple');
    if(t)t.scrollIntoView({behavior:'smooth',block:'start'});
  });
})();

/* ===== the timeline artwork: a lotus travels the swirl as you scroll ===== */
var TLPATH=[[0.5361, 0.232], [0.5387, 0.2347], [0.5414, 0.2375], [0.5441, 0.2402], [0.5469, 0.243], [0.5496, 0.2457], [0.5523, 0.2484], [0.5549, 0.2512], [0.5566, 0.2539], [0.5578, 0.2567], [0.5585, 0.2594], [0.5587, 0.2621], [0.5587, 0.2649], [0.5581, 0.2676], [0.557, 0.2704], [0.5555, 0.2731], [0.5533, 0.2758], [0.5505, 0.2786], [0.547, 0.2813], [0.5429, 0.2841], [0.538, 0.2868], [0.5323, 0.2895], [0.526, 0.2923], [0.5191, 0.295], [0.5117, 0.2978], [0.5038, 0.3005], [0.4957, 0.3032], [0.4876, 0.306], [0.4795, 0.3087], [0.4716, 0.3115], [0.4641, 0.3142], [0.457, 0.3169], [0.4505, 0.3197], [0.4445, 0.3224], [0.4393, 0.3252], [0.4348, 0.3279], [0.4309, 0.3306], [0.4276, 0.3334], [0.4249, 0.3361], [0.4228, 0.3388], [0.4211, 0.3416], [0.4198, 0.3443], [0.4189, 0.3471], [0.4182, 0.3498], [0.4177, 0.3525], [0.4175, 0.3553], [0.4175, 0.358], [0.4176, 0.3608], [0.4177, 0.3635], [0.418, 0.3662], [0.4182, 0.369], [0.4186, 0.3717], [0.4189, 0.3745], [0.4193, 0.3772], [0.4198, 0.3799], [0.4204, 0.3827], [0.4212, 0.3854], [0.4222, 0.3882], [0.4233, 0.3909], [0.4247, 0.3936], [0.4262, 0.3964], [0.4281, 0.3991], [0.4301, 0.4019], [0.4323, 0.4046], [0.4348, 0.4073], [0.4374, 0.4101], [0.4403, 0.4128], [0.4434, 0.4156], [0.4466, 0.4183], [0.4501, 0.421], [0.4538, 0.4238], [0.4577, 0.4265], [0.4619, 0.4293], [0.4663, 0.432], [0.4709, 0.4347], [0.4758, 0.4375], [0.4808, 0.4402], [0.4862, 0.443], [0.4918, 0.4457], [0.4975, 0.4484], [0.5034, 0.4512], [0.5095, 0.4539], [0.5156, 0.4567], [0.5218, 0.4594], [0.528, 0.4621], [0.5341, 0.4649], [0.5401, 0.4676], [0.546, 0.4704], [0.5516, 0.4731], [0.557, 0.4758], [0.562, 0.4786], [0.5667, 0.4813], [0.5712, 0.4841], [0.5754, 0.4868], [0.5793, 0.4895], [0.5829, 0.4923], [0.5862, 0.495], [0.5891, 0.4978], [0.5918, 0.5005], [0.5942, 0.5032], [0.5963, 0.506], [0.5981, 0.5087], [0.5997, 0.5115], [0.6011, 0.5142], [0.6022, 0.5169], [0.6031, 0.5197], [0.6036, 0.5224], [0.604, 0.5252], [0.6043, 0.5279], [0.6044, 0.5306], [0.6044, 0.5334], [0.6043, 0.5361], [0.6041, 0.5388], [0.6038, 0.5416], [0.6035, 0.5443], [0.6031, 0.5471], [0.6027, 0.5498], [0.6022, 0.5525], [0.6016, 0.5553], [0.6009, 0.558], [0.6, 0.5608], [0.599, 0.5635], [0.5978, 0.5662], [0.5964, 0.569], [0.5948, 0.5717], [0.593, 0.5745], [0.591, 0.5772], [0.5887, 0.5799], [0.5861, 0.5827], [0.5833, 0.5854], [0.5802, 0.5882], [0.5768, 0.5909], [0.5732, 0.5936], [0.5693, 0.5964], [0.565, 0.5991], [0.5604, 0.6019], [0.5555, 0.6046], [0.5501, 0.6073], [0.5443, 0.6101], [0.5379, 0.6128], [0.531, 0.6156], [0.5236, 0.6183], [0.5156, 0.621], [0.5071, 0.6238], [0.4982, 0.6265], [0.4891, 0.6293], [0.4798, 0.632], [0.4704, 0.6347], [0.4611, 0.6375], [0.452, 0.6402], [0.4432, 0.643], [0.4347, 0.6457], [0.4267, 0.6484], [0.4193, 0.6512], [0.4124, 0.6539], [0.4062, 0.6567], [0.4007, 0.6594], [0.3957, 0.6621], [0.3913, 0.6649], [0.3873, 0.6676], [0.3837, 0.6704], [0.3805, 0.6731], [0.3777, 0.6758], [0.3751, 0.6786], [0.3728, 0.6813], [0.3708, 0.6841], [0.3692, 0.6868], [0.3679, 0.6895], [0.3668, 0.6923], [0.366, 0.695], [0.3653, 0.6978], [0.3649, 0.7005], [0.3646, 0.7032], [0.3644, 0.706], [0.3643, 0.7087], [0.3644, 0.7115], [0.3645, 0.7142], [0.3646, 0.7169], [0.3649, 0.7197], [0.3651, 0.7224], [0.3653, 0.7252], [0.3654, 0.7279], [0.3657, 0.7306], [0.3659, 0.7334], [0.3662, 0.7361], [0.3664, 0.7388], [0.3667, 0.7416], [0.3671, 0.7443], [0.3676, 0.7471], [0.3681, 0.7498], [0.369, 0.7525], [0.3698, 0.7553], [0.3707, 0.758], [0.3719, 0.7608], [0.3733, 0.7635], [0.3748, 0.7662], [0.3765, 0.769], [0.3784, 0.7717], [0.3806, 0.7745], [0.3831, 0.7772], [0.3858, 0.7799], [0.3888, 0.7827], [0.3922, 0.7854], [0.396, 0.7882], [0.4002, 0.7909], [0.4051, 0.7936], [0.4105, 0.7964], [0.4168, 0.7991], [0.4238, 0.8019], [0.4312, 0.8046], [0.4389, 0.8073], [0.4466, 0.8101], [0.4542, 0.8128], [0.4614, 0.8156], [0.4682, 0.8183], [0.4745, 0.821], [0.4803, 0.8238], [0.4855, 0.8265], [0.4899, 0.8293], [0.4935, 0.832]];
(function(){
  var wrapEl=document.getElementById('tlImgWrap'), lotus=document.getElementById('tlLotus');
  if(!wrapEl||!lotus)return;
  function place(){
    var r=wrapEl.getBoundingClientRect();
    if(r.height<10)return;
    // 0 when the top of the artwork reaches mid-screen, 1 when the bottom does
    var mid=window.innerHeight*0.5;
    var p=(mid-r.top)/r.height;
    var on=p>-0.06&&p<1.06;
    lotus.classList.toggle('on',on);
    if(!on)return;
    p=Math.max(0,Math.min(1,p));
    var f=p*(TLPATH.length-1), i=Math.floor(f), t=f-i;
    var a=TLPATH[i], b=TLPATH[Math.min(i+1,TLPATH.length-1)];
    var x=a[0]+(b[0]-a[0])*t, y=a[1]+(b[1]-a[1])*t;
    var tilt=(b[0]-a[0])*260;
    lotus.style.left=(x*100)+'%';
    lotus.style.top=(y*100)+'%';
    lotus.style.transform='translate(-50%,-50%) rotate('+tilt.toFixed(1)+'deg)';
  }
  window.addEventListener('scroll',place,{passive:true});
  window.addEventListener('resize',place);
  var img=wrapEl.querySelector('img.art');
  if(img.complete)place(); else img.addEventListener('load',place);
  place();
})();

/* ===== the five invitation cards, one after another ===== */
var OVLOTUS='<svg viewBox="0 0 24 24" fill="none">'+
  '<path d="M12 5c1.7 1.9 2.5 3.8 2.5 5.7 0 1.8-.8 3.4-2.5 4.7-1.7-1.3-2.5-2.9-2.5-4.7C9.5 8.8 10.3 6.9 12 5Z" fill="#e6a6bd"/>'+
  '<path d="M12 15.4c-1.9-1-3.9-1.3-5.8-.8.6 1.9 2 3.2 4 3.9 1 .3 1.6.4 1.8.4Z" fill="#efc0ce"/>'+
  '<path d="M12 15.4c1.9-1 3.9-1.3 5.8-.8-.6 1.9-2 3.2-4 3.9-1 .3-1.6.4-1.8.4Z" fill="#efc0ce"/>'+
  '<circle cx="12" cy="16.6" r="1.4" fill="#d3a03e"/></svg>';
(function(){
  var stack=document.getElementById('cardStack');
  SCHEDULE.forEach(function(ev){
    var d=document.createElement('div');
    d.className='evcard reveal'; d.id='card-'+ev.key;
    d.setAttribute('data-film',ev.key);
    d.setAttribute('role','button');
    d.setAttribute('tabindex','0');
    d.setAttribute('aria-label','Open the '+plain(ev.name)+' invitation');
d.innerHTML='<img class="art" loading="lazy" src="'+ev.card+'" alt="'+plain(ev.name)+' invitation">'+
      '<div class="cardov" style="top:'+(ev.ovTop||'56%')+'">'+
        '<div class="ov-quote">“'+ev.quote+'”</div>'+
        '<span class="ov-cta"><span class="dot">✦</span> Tap to open the invite</span>'+
      '</div>';
    d.addEventListener('keydown',function(e){
      if(e.key==='Enter'||e.key===' '){e.preventDefault();openFilm(ev.key);}
    });
    stack.appendChild(d);
  });
  stack.addEventListener('click',function(e){
    var b=e.target.closest?e.target.closest('[data-film]'):null;
    if(b)openFilm(b.getAttribute('data-film'));
  });
})();

/* ===== the film lightbox ===== */
var lb=document.getElementById('lightbox'), lbVid=document.getElementById('lbVid'),
    cv=document.getElementById('lbCanvas'), cx=cv.getContext('2d',{willReadFrequently:true}),
    tapL=document.getElementById('lbTap'), hintL=document.getElementById('lbHint'),
    replay=document.getElementById('lbReplay'), lbSkipBtn=document.getElementById('lbSkip');
var current={done:true}, wipeOn=false, wipeCfg=null, tapCfg=null, tapCount=0, drawing=false, bflyRun=false;

var LAMP_SVG='<svg viewBox="0 0 160 200" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="br1" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#8a6118"/><stop offset=".2" stop-color="#e8c878"/><stop offset=".5" stop-color="#fbf1cf"/><stop offset=".8" stop-color="#c89a3a"/><stop offset="1" stop-color="#7d5613"/></linearGradient><radialGradient id="fl" cx="50%" cy="62%"><stop offset="0" stop-color="#fffbe8"/><stop offset=".35" stop-color="#ffd66b"/><stop offset=".75" stop-color="#f59a1e"/><stop offset="1" stop-color="rgba(226,110,20,0)"/></radialGradient><radialGradient id="gl" cx="50%" cy="50%"><stop offset="0" stop-color="rgba(255,206,110,.85)"/><stop offset="1" stop-color="rgba(255,180,60,0)"/></radialGradient></defs><circle class="glow" cx="80" cy="70" r="66" fill="url(#gl)"/><ellipse cx="80" cy="186" rx="52" ry="8" fill="#000" opacity=".28"/><g class="flame"><path d="M80 44c9 12 13 20 13 27 0 8-6 14-13 14s-13-6-13-14c0-7 4-15 13-27Z" fill="url(#fl)"/><path d="M80 62c4 6 6 10 6 13.5 0 4-2.7 6.5-6 6.5s-6-2.5-6-6.5c0-3.5 2-7.5 6-13.5Z" fill="#fffbe8" opacity=".9"/></g><path d="M28 96h104c0 20-16 34-52 34S28 116 28 96Z" fill="url(#br1)" stroke="#7d5613" stroke-width="2"/><path d="M28 96c14-7 34-10 52-10s38 3 52 10" fill="none" stroke="#fff3cf" stroke-width="2.5" opacity=".55"/><path d="M112 92c6-3 12-4 18-3-2 5-7 8-14 8Z" fill="url(#br1)" stroke="#7d5613" stroke-width="1.6"/><rect x="70" y="128" width="20" height="18" rx="4" fill="url(#br1)"/><path d="M46 150h68c0 12-14 20-34 20s-34-8-34-20Z" fill="url(#br1)" stroke="#7d5613" stroke-width="2"/><ellipse cx="80" cy="150" rx="34" ry="7" fill="url(#br1)" stroke="#7d5613" stroke-width="1.4"/><path d="M56 108c-2 8 0 14 6 18" fill="none" stroke="#fff" stroke-width="3.5" opacity=".3" stroke-linecap="round"/></svg>';

var actx;
function AC(){if(actx===undefined){try{actx=new (window.AudioContext||window.webkitAudioContext)();}catch(e){actx=null;}}return actx;}
function dholSound(){
  var c=AC();if(!c)return;if(c.state==='suspended')c.resume();var t=c.currentTime;
  var o=c.createOscillator(),g=c.createGain();o.type='sine';
  o.frequency.setValueAtTime(190,t);o.frequency.exponentialRampToValueAtTime(72,t+0.18);
  g.gain.setValueAtTime(0.0001,t);g.gain.exponentialRampToValueAtTime(0.5,t+0.005);
  g.gain.exponentialRampToValueAtTime(0.0001,t+0.26);
  o.connect(g).connect(c.destination);o.start(t);o.stop(t+0.3);
  var n=c.sampleRate*0.08,b=c.createBuffer(1,n,c.sampleRate),d=b.getChannelData(0);
  for(var i=0;i<n;i++)d[i]=(Math.random()*2-1)*Math.pow(1-i/n,2.2);
  var src=c.createBufferSource();src.buffer=b;var bp=c.createBiquadFilter();
  bp.type='bandpass';bp.frequency.value=1700;
  var ng=c.createGain();ng.gain.value=0.28;src.connect(bp).connect(ng).connect(c.destination);src.start(t);
}
/* a soft breath of flame rather than a bell */
function lampSound(){
  var c=AC();if(!c)return;if(c.state==='suspended')c.resume();var t=c.currentTime;
  var n=c.sampleRate*0.5,b=c.createBuffer(1,n,c.sampleRate),d=b.getChannelData(0);
  for(var i=0;i<n;i++){var e=i/n;d[i]=(Math.random()*2-1)*Math.pow(1-e,1.6)*Math.min(1,e*14);}
  var src=c.createBufferSource();src.buffer=b;
  var bp=c.createBiquadFilter();bp.type='bandpass';bp.frequency.value=780;bp.Q.value=0.9;
  var g=c.createGain();g.gain.value=0.28;
  src.connect(bp).connect(g).connect(c.destination);src.start(t);
  var o=c.createOscillator(),og=c.createGain();o.type='sine';
  o.frequency.setValueAtTime(420,t);o.frequency.exponentialRampToValueAtTime(660,t+0.28);
  og.gain.setValueAtTime(0.0001,t);og.gain.exponentialRampToValueAtTime(0.16,t+0.05);
  og.gain.exponentialRampToValueAtTime(0.0001,t+0.6);
  o.connect(og).connect(c.destination);o.start(t);o.stop(t+0.65);
}

var HAND_SVG='<svg class="hand" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 11V4.6a1.6 1.6 0 0 1 3.2 0V11"/><path d="M12.2 11V6.2a1.6 1.6 0 0 1 3.2 0V11"/><path d="M15.4 11.4V8.6a1.6 1.6 0 0 1 3.2 0V15c0 3.4-2.4 6-6 6h-1.2c-2 0-3.2-.8-4.2-2.4L4.4 14a1.6 1.6 0 0 1 2.6-1.8L9 14.4V11"/></svg>';
function showCoach(cfg){
  var c=document.getElementById('lbCoach');
  c.className='lb-coach';
  c.innerHTML='<span class="ring">'+HAND_SVG+'</span>'+
    '<div class="big">'+(cfg.coach||'Reveal the invitation')+'</div>'+
    '<div class="small">'+(cfg.sub||'')+'</div>';
}
function hideCoach(){
  var c=document.getElementById('lbCoach');
  if(c&&!c.classList.contains('gone')){
    c.classList.add('gone');
    setTimeout(function(){c.innerHTML='';},500);
  }
}
function openFilm(key){
  var ev=evByKey(key); if(!ev)return;
  var cfg=REVEAL[key]||{mode:'wipe',brush:.12,thresh:.5,hint:'Scratch to reveal'};
  current={ev:ev,cfg:cfg,done:false,finished:false};
  wipeOn=false;bflyRun=false;heartDone=false;heartDrag=false;
  cv.classList.remove('on');cv.style.opacity='';cv.style.transition='';
  tapL.className='lb-tap';tapL.innerHTML='';tapL.style.opacity='';tapL.style.transition='';
  replay.classList.remove('show'); lbSkipBtn.style.display='';
  hintL.textContent=cfg.hint||'';
  showCoach(cfg);
  document.querySelectorAll('.bfly').forEach(function(b){b.remove();});
  lbVid.poster=ev.poster; lbVid.src=ev.video; lbVid.muted=true;
  try{lbVid.load();}catch(e){}
  lb.classList.add('open');lb.setAttribute('aria-hidden','false');
  musicDuck(true);
  setTimeout(function(){setupLayer(cfg);},70);
}
function closeFilm(){
  lb.classList.remove('open');lb.setAttribute('aria-hidden','true');
  wipeOn=false;bflyRun=false;heartDone=false;heartDrag=false;current={done:true,finished:true};
  try{lbVid.pause();}catch(e){}
  lbVid.removeAttribute('src');lbVid.removeAttribute('poster');
  try{lbVid.load();}catch(e){}
  cv.classList.remove('on');cv.style.opacity='';
  tapL.className='lb-tap';tapL.innerHTML='';tapL.style.opacity='';
  replay.classList.remove('show');hideCoach();
  document.querySelectorAll('.bfly').forEach(function(b){b.remove();});
  musicDuck(false);
}
function setupLayer(cfg){
  if(cfg.mode==='tap')setupTap(cfg);
  else if(cfg.mode==='butterfly')setupButterfly(cfg);
  else if(cfg.mode==='heart')setupHeart(cfg);
  else setupWipe(cfg);
}
/* ---- heart trace reveal ----
   Sixty points are laid around a heart curve. As the finger passes each one it
   lights up; when most of the outline has been followed the heart completes. */
var heartPts=null, heartCv=null, heartCx=null, heartDone=false, heartDrag=false;
function heartPath(w,h){
  var pts=[],N=60;
  var sx=Math.min(w,h)*0.0265, sy=sx;
  for(var i=0;i<N;i++){
    var t=Math.PI/2 + (i/N)*Math.PI*2;      /* start at the top notch */
    var x=16*Math.pow(Math.sin(t),3);
    var y=13*Math.cos(t)-5*Math.cos(2*t)-2*Math.cos(3*t)-Math.cos(4*t);
    pts.push({x:w/2+x*sx, y:h*0.46-y*sy, hit:false});
  }
  return pts;
}
function setupHeart(cfg){
  var w=lbVid.clientWidth,h=lbVid.clientHeight;
  if(!w||!h)return setTimeout(function(){setupHeart(cfg);},50);
  cv.classList.remove('on');
  heartDone=false;heartDrag=false;
  tapL.className='lb-tap on heart';
  tapL.innerHTML='<canvas id="heartCv"></canvas>'+
    '<div class="heart-done" id="heartGlow">\u2665</div>'+
    '<div class="lb-itxt">Trace the heart to open our invitation</div>';
  heartCv=document.getElementById('heartCv');
  heartCv.width=w;heartCv.height=h;
  heartCx=heartCv.getContext('2d');
  heartPts=heartPath(w,h);
  drawHeart();
  heartCv.addEventListener('pointerdown',function(e){
    heartDrag=true;hideCoach();
    try{heartCv.setPointerCapture(e.pointerId);}catch(x){}
    heartMove(e);});
  heartCv.addEventListener('pointermove',heartMove);
  heartCv.addEventListener('pointerup',function(){heartDrag=false;});
  heartCv.addEventListener('pointercancel',function(){heartDrag=false;});
}
function drawHeart(){
  if(!heartCx)return;
  var w=heartCv.width,h=heartCv.height;
  heartCx.clearRect(0,0,w,h);
  /* the untraced outline */
  heartCx.lineWidth=Math.max(2,w*0.008);
  heartCx.lineCap='round';
  heartCx.setLineDash([w*0.02,w*0.022]);
  heartCx.strokeStyle='rgba(255,222,190,.42)';
  heartCx.beginPath();
  heartPts.forEach(function(p,i){i?heartCx.lineTo(p.x,p.y):heartCx.moveTo(p.x,p.y);});
  heartCx.closePath();heartCx.stroke();
  heartCx.setLineDash([]);
  /* the part already traced, drawn solid and glowing */
  heartCx.lineWidth=Math.max(3,w*0.013);
  heartCx.strokeStyle='#ffb6cf';
  heartCx.shadowColor='rgba(255,140,185,.95)';heartCx.shadowBlur=w*0.05;
  var run=null;
  for(var i=0;i<=heartPts.length;i++){
    var p=heartPts[i%heartPts.length];
    if(p.hit){ if(!run){run=true;heartCx.beginPath();heartCx.moveTo(p.x,p.y);} else heartCx.lineTo(p.x,p.y); }
    else if(run){heartCx.stroke();run=null;}
  }
  if(run)heartCx.stroke();
  heartCx.shadowBlur=0;
}
function heartMove(e){
  if(!heartDrag||heartDone||current.done)return;
  var r=heartCv.getBoundingClientRect();
  var x=(e.clientX-r.left)*(heartCv.width/r.width),
      y=(e.clientY-r.top)*(heartCv.height/r.height);
  var rad=heartCv.width*0.11, got=0, hit=0;
  for(var i=0;i<heartPts.length;i++){
    var p=heartPts[i];
    if(!p.hit&&Math.hypot(p.x-x,p.y-y)<rad){p.hit=true;hit++;}
    if(p.hit)got++;
  }
  if(hit)drawHeart();
  if(got>=heartPts.length*0.82)completeHeart();
  e.preventDefault();
}
function completeHeart(){
  if(heartDone)return; heartDone=true;
  heartPts.forEach(function(p){p.hit=true;});
  drawHeart();
  var g=document.getElementById('heartGlow');
  if(g)g.classList.add('on');
  petalBurst(10);
  setTimeout(function(){ if(!current.done)finishReveal(); },780);
}
/* ---- the cover the guest clears (scratch, tap, butterflies) ---- */
function coverSize(){
  var w=lbVid.clientWidth,h=lbVid.clientHeight;
  if(!w||!h)return null;
  cv.width=w;cv.height=h;return {w:w,h:h};
}
function setupWipe(cfg){
  var s=coverSize(); if(!s){return setTimeout(function(){setupWipe(cfg);},50);}
  cv.classList.add('on');
  cx.globalCompositeOperation='source-over';
  var g=cx.createLinearGradient(0,0,s.w,s.h);
  if(cfg.henna){g.addColorStop(0,'#6b4a22');g.addColorStop(.5,'#553617');g.addColorStop(1,'#42280f');}
  else{g.addColorStop(0,'#e7b53f');g.addColorStop(.5,'#d99b22');g.addColorStop(1,'#c98415');}
  cx.fillStyle=g;cx.fillRect(0,0,s.w,s.h);
  for(var i=0;i<s.w*s.h/500;i++){
    cx.fillStyle='rgba('+(120+Math.random()*80|0)+','+(80+Math.random()*50|0)+',20,'+(Math.random()*.3)+')';
    cx.fillRect(Math.random()*s.w,Math.random()*s.h,2,2);}
  wipeCfg=cfg;wipeOn=true;
}
function wpos(e){var r=cv.getBoundingClientRect();
  return {x:(e.clientX-r.left)*(cv.width/r.width),y:(e.clientY-r.top)*(cv.height/r.height)};}
var lastP=null;
function wstroke(e){
  if(!wipeOn||!drawing||current.done)return;
  var p=wpos(e), br=Math.max(14,cv.width*(wipeCfg.brush||0.12));
  cx.globalCompositeOperation='destination-out';
  cx.fillStyle='rgba(0,0,0,1)';cx.strokeStyle='rgba(0,0,0,1)';
  cx.beginPath();cx.arc(p.x,p.y,br,0,7);cx.fill();
  if(lastP){cx.lineWidth=br*2;cx.lineCap='round';cx.lineJoin='round';
    cx.beginPath();cx.moveTo(lastP.x,lastP.y);cx.lineTo(p.x,p.y);cx.stroke();}
  lastP=p;e.preventDefault();
}
function wcheck(){
  if(current.done||!wipeOn)return;
  var d=cx.getImageData(0,0,cv.width,cv.height).data,cleared=0,total=0;
  for(var i=3;i<d.length;i+=32){total++;if(d[i]<40)cleared++;}
  if(cleared/total>(wipeCfg.thresh||0.5))finishReveal();
}
cv.addEventListener('pointerdown',function(e){
  if(!wipeOn)return;hideCoach();drawing=true;lastP=null;
  try{cv.setPointerCapture(e.pointerId);}catch(x){}
  wstroke(e);});
cv.addEventListener('pointermove',wstroke);
cv.addEventListener('pointerup',function(){if(drawing){drawing=false;lastP=null;wcheck();}});
cv.addEventListener('pointercancel',function(){if(drawing){drawing=false;lastP=null;wcheck();}});

function setupTap(cfg){
  tapL.className='lb-tap on '+cfg.inst;
  var dots='';for(var i=0;i<cfg.need;i++)dots+='<i></i>';
  var label=cfg.inst==='dhol'?'Tap the dhol':'Tap to light the diya';
  var art=cfg.inst==='dhol'
    ? '<img class="dholimg" src="https://amayraadornsi.netlify.app/'+ART.dhol+'" alt="" draggable="false">' : LAMP_SVG;
  tapL.innerHTML='<button class="lb-inst'+(cfg.inst==='lamp'?' lamp0':'')+'" id="lbInst" type="button" aria-label="'+label+'">'+art+'</button>'+
    '<div class="lb-itxt">'+label+'</div><div class="lb-dots" id="lbDots">'+dots+'</div>';
  tapCfg=cfg;tapCount=0;
  document.getElementById('lbInst').addEventListener('click',tapHit);
}
function tapHit(){
  if(current.done)return;
  hideCoach();
  var inst=document.getElementById('lbInst');
  if(tapCfg.inst==='dhol'){inst.classList.remove('hit');void inst.offsetWidth;inst.classList.add('hit');dholSound();}
  else{tapCount<tapCfg.need&&lampSound();}
  tapCount++;
  if(tapCfg.inst==='lamp'){inst.className='lb-inst lamp'+Math.min(tapCount,3);}
  var dots=document.querySelectorAll('#lbDots i');
  if(dots[tapCount-1])dots[tapCount-1].classList.add('on');
  petalBurst(7);
  if(tapCount>=tapCfg.need)setTimeout(finishReveal,300);
}

function setupButterfly(cfg){
  var s=coverSize(); if(!s){return setTimeout(function(){setupButterfly(cfg);},50);}
  cv.classList.add('on');
  cx.globalCompositeOperation='source-over';
  var g=cx.createLinearGradient(0,0,s.w,s.h);
  g.addColorStop(0,'#f8ecef');g.addColorStop(.5,'#f2dbe1');g.addColorStop(1,'#eccdd6');
  cx.fillStyle=g;cx.fillRect(0,0,s.w,s.h);
  for(var i=0;i<s.w*s.h/650;i++){
    cx.fillStyle='rgba(255,255,255,'+(Math.random()*.5)+')';
    cx.fillRect(Math.random()*s.w,Math.random()*s.h,1.6,1.6);}
  wipeOn=false;
  tapL.className='lb-tap on butterfly';
  tapL.innerHTML='<button class="lb-inst bflybtn" id="lbInst" type="button" aria-label="Reveal the wedding film">'+
    '<img class="bflybtn-img" src="https://amayraadornsi.netlify.app/'+ART.bfly[2]+'" alt="" draggable="false"></button>'+
    '<div class="lb-itxt">Tap to flutter into our wedding</div>';
  document.getElementById('lbInst').addEventListener('click',butterflyFly);
}
function butterflyFly(){
  if(bflyRun||current.done)return; bflyRun=true;
  hideCoach();
  tapL.style.transition='opacity .5s ease';tapL.style.opacity='0';
  setTimeout(function(){tapL.className='lb-tap';tapL.style.opacity='';tapL.style.transition='';},520);
  var stage=document.getElementById('lbStage'),rect=cv.getBoundingClientRect();
  var sw=rect.width,sh=rect.height,scale=cv.width/sw;
  var N=16,flies=[],t0=performance.now();
  for(var i=0;i<N;i++){
    var el=document.createElement('div');el.className='bfly';
    var sz=(24+Math.random()*20);el.style.width=sz+'px';el.style.height=sz+'px';
    var im=document.createElement('img');im.className='bimg';im.draggable=false;
    im.src=ART.bfly[i%ART.bfly.length];
    im.style.animationDuration=(0.3+Math.random()*0.2)+'s';
    el.appendChild(im);stage.appendChild(el);
    var ltr=i%2===0, row=i/(N-1);
    flies.push({el:el,
      x:ltr?-sz-Math.random()*60:sw+Math.random()*60,
      y:sh*(0.04+row*0.88)+(Math.random()*14-7),
      vx:(ltr?1:-1)*(sw/2000)*(1.8+Math.random()*1.0),
      amp:8+Math.random()*18, ph:Math.random()*6.28, fr:0.004+Math.random()*0.003,
      delay:row*1400+Math.random()*180, sz:sz, ltr:ltr});
  }
  function frame(now){
    var t=now-t0, allGone=true;
    cx.globalCompositeOperation='destination-out';
    for(var i=0;i<flies.length;i++){
      var f=flies[i];
      if(t<f.delay){allGone=false;f.el.style.opacity='0';continue;}
      var lt=t-f.delay;
      var x=f.x+f.vx*lt, y=f.y+Math.sin(f.ph+lt*f.fr)*f.amp;
      f.el.style.opacity='1';
      f.el.style.transform='translate('+x+'px,'+y+'px) rotate('+(f.ltr?8:-8)+'deg)';
      var cxp=(x+f.sz/2)*scale, cyp=(y+f.sz*0.4)*scale, r=f.sz*1.7*scale;
      var rg=cx.createRadialGradient(cxp,cyp,0,cxp,cyp,r);
      rg.addColorStop(0,'rgba(0,0,0,1)');rg.addColorStop(.6,'rgba(0,0,0,.85)');rg.addColorStop(1,'rgba(0,0,0,0)');
      cx.fillStyle=rg;cx.beginPath();cx.arc(cxp,cyp,r,0,7);cx.fill();
      if(f.ltr?x<sw+f.sz+40:x>-f.sz-40)allGone=false;
    }
    if(!allGone&&t<5600&&!current.done)requestAnimationFrame(frame);
    else{flies.forEach(function(f){f.el.remove();});bflyRun=false;
      if(!current.done)finishReveal();}
  }
  requestAnimationFrame(frame);
}

function finishReveal(){
  if(current.finished)return; current.finished=true;current.done=true;
  cv.style.transition='opacity .6s ease';cv.style.opacity='0';
  tapL.style.transition='opacity .6s ease';tapL.style.opacity='0';
  setTimeout(function(){cv.classList.remove('on');tapL.className='lb-tap';tapL.innerHTML='';},640);
  hintL.textContent='';wipeOn=false;hideCoach();
  lbSkipBtn.style.display='none';
  sparkleStage(document.getElementById('lbStage'));
  petalBurst(36);
  setTimeout(function(){
    lbVid.muted=true;
    var p=lbVid.play();
    if(p&&p.catch)p.catch(function(){lbVid.play().catch(function(){});});
  },450);
}
lbVid.addEventListener('ended',function(){replay.classList.add('show');});
lbVid.addEventListener('play',function(){replay.classList.remove('show');});
replay.addEventListener('click',function(){
  replay.classList.remove('show');
  try{lbVid.currentTime=0;}catch(e){}
  lbVid.play().catch(function(){});});
lbSkipBtn.addEventListener('click',finishReveal);
document.getElementById('lbClose').addEventListener('click',closeFilm);
lb.addEventListener('click',function(e){if(e.target===lb)closeFilm();});
document.addEventListener('keydown',function(e){
  if(e.key==='Escape'&&lb.classList.contains('open'))closeFilm();});

/* ===== RSVP chips ===== */
var CHIPBOX={
  haldi:  {l:'13.15%',w:'16.90%', bg:'#fedfa8'},
  mehendi:{l:'31.80%',w:'17.20%', bg:'#d1cfa4'},
  sangeet:{l:'51.08%',w:'17.20%', bg:'#e3ccd7'},
  wedding:{l:'70.16%',w:'17.10%', bg:'#fad8c2'}
};
var CHIPIC={
  haldi:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 11h16c0 4.4-3.6 8-8 8s-8-3.6-8-8Z"/><path d="M9 8c0-1.4 1.3-1.6 1.3-3M14 8c0-1.4 1.3-1.6 1.3-3" stroke-linecap="round"/></svg>',
  mehendi:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M20 4C10 4 5 8 5 14c0 3 2 6 2 6s9-1 11-7c1.4-4.6 2-9 2-9Z"/><path d="M6 20c3-6 7-9 12-12" stroke-linecap="round"/></svg>',
  sangeet:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M9 18V6l10-2v12" stroke-linecap="round"/><circle cx="6.5" cy="18" r="2.6"/><circle cx="16.5" cy="16" r="2.6"/></svg>',
  wedding:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 5c1.8 2 2.6 3.9 2.6 5.9 0 1.9-.9 3.5-2.6 4.9-1.7-1.4-2.6-3-2.6-4.9C9.4 8.9 10.2 7 12 5Z"/><path d="M12 15.8c-2-1.1-4.1-1.4-6.1-.9.6 2 2.1 3.4 4.2 4.1M12 15.8c2-1.1 4.1-1.4 6.1-.9-.6 2-2.1 3.4-4.2 4.1" stroke-linecap="round"/></svg>'
};
(function(){
  var box=document.getElementById('chips');
  SCHEDULE.forEach(function(ev){
    var g=CHIPBOX[ev.key];
    if(!g)return;                 /* no drawn chip for it, so no live one either */
    var b=document.createElement('button');b.type='button';b.className='vchip';
    b.style.left=g.l;b.style.width=g.w;b.style.background=g.bg;
    b.innerHTML=(CHIPIC[ev.key]||'')+'<span>'+ev.name+'</span>';
    b.setAttribute('aria-pressed','true');b.dataset.name=plain(ev.name);
    b.addEventListener('click',function(){
      b.setAttribute('aria-pressed',b.getAttribute('aria-pressed')!=='true');});
    box.appendChild(b);});
})();



/* ===== countdown ===== */
var target=parseLocal(CONFIG.weddingDate,CONFIG.weddingStart).getTime();
function tick(){
  var t=target-Date.now();
  if(t<0){document.getElementById('cd').innerHTML=
    '<p style="font-family:var(--display);font-style:italic;font-size:22px;color:#fff">The day is here — celebrate with us!</p>';
    return;}
  txt('d',Math.floor(t/864e5));
  txt('h',('0'+Math.floor(t%864e5/36e5)).slice(-2));
  txt('m',('0'+Math.floor(t%36e5/6e4)).slice(-2));
  txt('s',('0'+Math.floor(t%6e4/1e3)).slice(-2));
}
tick();setInterval(tick,1000);



/* ===== scroll reveals ===== */
var io=new IntersectionObserver(function(es){
  es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}});
},{threshold:.12});
document.querySelectorAll('.reveal').forEach(function(el){io.observe(el);});
