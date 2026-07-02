/* ==========================================
   COMPTE À REBOURS
========================================== */

const targetDate = new Date("July 20, 2026 00:00:00").getTime();

const surprise = document.getElementById("surprise");

function updateCountdown() {

    const now = new Date().getTime();
    const distance = targetDate - now;

    if(distance <= 0){

        document.getElementById("days").textContent = "00";
        document.getElementById("hours").textContent = "00";
        document.getElementById("minutes").textContent = "00";
        document.getElementById("seconds").textContent = "00";

        surprise.classList.remove("hidden");

        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000*60*60*24)) / (1000*60*60));
    const minutes = Math.floor((distance % (1000*60*60)) / (1000*60));
    const seconds = Math.floor((distance % (1000*60)) / 1000);

    document.getElementById("days").textContent = String(days).padStart(2,"0");
    document.getElementById("hours").textContent = String(hours).padStart(2,"0");
    document.getElementById("minutes").textContent = String(minutes).padStart(2,"0");
    document.getElementById("seconds").textContent = String(seconds).padStart(2,"0");

}

updateCountdown();

setInterval(updateCountdown,1000);


/* ==========================================
   MUSIQUE
========================================== */

const music = document.getElementById("music");
const musicButton = document.getElementById("musicButton");

let playing = false;

musicButton.addEventListener("click",()=>{

    if(!playing){

        music.play();

        musicButton.innerHTML = "⏸ Pause";

        playing = true;

    }else{

        music.pause();

        musicButton.innerHTML = "🎵 Notre chanson";

        playing = false;

    }

});


/* ==========================================
   MODE NUIT
========================================== */

const themeButton = document.getElementById("themeToggle");

themeButton.addEventListener("click",()=>{

    document.body.classList.toggle("dark");

    if(document.body.classList.contains("dark")){

        themeButton.innerHTML="☀️";

    }else{

        themeButton.innerHTML="🌙";

    }

});


/* ==========================================
   LETTRE ANIMÉE FIXÉE (SANS BUG)
========================================== */

const envelope = document.getElementById("envelope");
const letter = document.getElementById("letter");
const typedText = document.getElementById("typedText");

let opened = false;
let isTyping = false;

const message = [
"Je ne sais pas vraiment comment commencer cette lettre…",
"Alors je vais simplement être sincère avec toi.",

"Depuis que tu es entrée dans ma vie, tout a changé.",
"Les jours sont plus doux, les moments plus beaux.",
"Et même l’attente devient supportable parce que c’est toi au bout.",

"Tu es devenue une évidence.",
"Quelque chose de rare, de précieux, que je ne veux pas perdre.",

"J’ai tellement hâte que le 20 juillet arrive.",
"Pas seulement pour le jour…",
"Mais pour enfin te voir, te retrouver, et arrêter de compter.",

"En attendant, je pense à toi plus que je ne l’avoue.",
"Et chaque petit détail me ramène à toi.",

"Merci d’être toi.",
"Merci pour ton sourire et tout ce que tu es."
];

function typeLine(text, callback) {

    const p = document.createElement("p");
    typedText.appendChild(p);

    let i = 0;

    const interval = setInterval(() => {

        p.textContent += text[i];
        i++;

        if(i >= text.length){
            clearInterval(interval);
            setTimeout(callback, 200);
        }

    }, 20);
}

function startTyping() {

    if(isTyping) return; // 🔥 empêche double lancement
    isTyping = true;

    typedText.innerHTML = "";

    let index = 0;

    function next() {

        if(index < message.length){
            typeLine(message[index], next);
            index++;
        } else {
            isTyping = false;
        }
    }

    next();
}

envelope.addEventListener("click", () => {

    if(!opened){

        letter.style.display = "block";
        envelope.innerHTML = "💌";
        opened = true;

        startTyping();

    } else {

        letter.style.display = "none";
        envelope.innerHTML = "📩";
        opened = false;
    }
});

/* ==========================================
   CITATIONS
========================================== */

const quotes=[

"Chaque jour loin de toi me paraît une éternité ❤️",

"J'ai hâte de te revoir mon amour 💕",

"Tu es mon plus beau bonheur 🌸",

"Chaque seconde me rapproche de toi ❤️",

"Tu illumines ma vie ✨",

"Le 20 juillet sera notre plus beau jour ❤️",

"Je pense à toi chaque jour 💖",

"Tu es mon endroit préféré ❤️"

];

const quote = document.getElementById("loveQuote");

let index = 0;

setInterval(()=>{

    index++;

    if(index>=quotes.length){

        index=0;

    }

    quote.style.opacity=0;

    setTimeout(()=>{

        quote.innerHTML=quotes[index];

        quote.style.opacity=1;

    },500);

},5000);


/* ==========================================
   EXPLOSION DE COEURS
========================================== */

document.addEventListener("click",(e)=>{

    for(let i=0;i<15;i++){

        createHeart(e.clientX,e.clientY);

    }

});


function createHeart(x,y){

    const heart=document.createElement("div");

    heart.innerHTML="❤️";

    heart.style.position="fixed";

    heart.style.left=x+"px";

    heart.style.top=y+"px";

    heart.style.fontSize=(15+Math.random()*20)+"px";

    heart.style.pointerEvents="none";

    heart.style.zIndex="99999";

    document.body.appendChild(heart);

    const angle=Math.random()*360;

    const distance=80+Math.random()*120;

    const destinationX=Math.cos(angle)*distance;

    const destinationY=Math.sin(angle)*distance;

    heart.animate([

        {

            transform:"translate(0,0) scale(1)",

            opacity:1

        },

        {

            transform:`translate(${destinationX}px,${destinationY}px) scale(0)`,

            opacity:0

        }

    ],{

        duration:1000,

        easing:"ease-out"

    });

    setTimeout(()=>{

        heart.remove();

    },1000);

      
    /* ==========================================
    APPARITION AU SCROLL
    ========================================== */

    const sections = document.querySelectorAll(".glass");

    const observer = new IntersectionObserver((entries)=>{

        entries.forEach(entry=>{

            if(entry.isIntersecting){

                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0px)";

            }

        });

    },{
        threshold:0.2
    });

    sections.forEach(section=>{

        section.style.opacity="0";
        section.style.transform="translateY(60px)";
        section.style.transition="1s";

        observer.observe(section);

    });


    /* ==========================================
    ZOOM DES PHOTOS
    ========================================== */

    const images = document.querySelectorAll(".gallery img");

    images.forEach(img=>{

        img.addEventListener("click",()=>{

            const overlay = document.createElement("div");

            overlay.style.position="fixed";
            overlay.style.left="0";
            overlay.style.top="0";
            overlay.style.width="100%";
            overlay.style.height="100%";
            overlay.style.background="rgba(0,0,0,.9)";
            overlay.style.display="flex";
            overlay.style.justifyContent="center";
            overlay.style.alignItems="center";
            overlay.style.cursor="pointer";
            overlay.style.zIndex="999999";

            const picture = document.createElement("img");

            picture.src = img.src;

            picture.style.maxWidth="90%";
            picture.style.maxHeight="90%";
            picture.style.borderRadius="20px";
            picture.style.boxShadow="0 0 40px rgba(255,255,255,.4)";
            picture.style.animation="zoomIn .4s";

            overlay.appendChild(picture);

            document.body.appendChild(overlay);

            overlay.addEventListener("click",()=>{

                overlay.remove();

            });

        });

    });


    /* ==========================================
    PARALLAXE
    ========================================== */

    const hero = document.querySelector(".hero");

    document.addEventListener("mousemove",(e)=>{

        const x = (window.innerWidth/2 - e.clientX)/40;
        const y = (window.innerHeight/2 - e.clientY)/40;

        hero.style.transform = `translate(${x}px,${y}px)`;

    });


    /* ==========================================
    CURSEUR MAGIQUE
    ========================================== */

    document.addEventListener("mousemove",(e)=>{

        const sparkle=document.createElement("div");

        sparkle.innerHTML="💖";

        sparkle.style.position="fixed";
        sparkle.style.left=e.clientX+"px";
        sparkle.style.top=e.clientY+"px";
        sparkle.style.pointerEvents="none";
        sparkle.style.fontSize="12px";
        sparkle.style.opacity=".8";
        sparkle.style.zIndex="99999";

        document.body.appendChild(sparkle);

        sparkle.animate([

            {
                transform:"translateY(0px) scale(1)",
                opacity:1
            },

            {
                transform:"translateY(-30px) scale(0)",
                opacity:0
            }

        ],{

            duration:700

        });

        setTimeout(()=>{

            sparkle.remove();

        },700);

    });


    /* ==========================================
    ANIMATION DES BOITES DU CHRONO
    ========================================== */

    const boxes = document.querySelectorAll(".box");

    setInterval(()=>{

        boxes.forEach(box=>{

            box.animate([

                {
                    transform:"scale(1)"
                },

                {
                    transform:"scale(1.06)"
                },

                {
                    transform:"scale(1)"
                }

            ],{

                duration:600

            });

        });

    },1000);

}