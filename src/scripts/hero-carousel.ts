const carousel = document.querySelector<HTMLElement>("[data-hero-carousel]");

if (carousel) {
  const slides=[...carousel.querySelectorAll<HTMLElement>("[data-hero-slide]")];
  const dots=[...carousel.querySelectorAll<HTMLButtonElement>("[data-carousel-dot]")];
  const toggle=carousel.querySelector<HTMLButtonElement>("[data-carousel-toggle]");
  const previous=carousel.querySelector<HTMLButtonElement>("[data-carousel-previous]");
  const next=carousel.querySelector<HTMLButtonElement>("[data-carousel-next]");
  const reduceMotion=window.matchMedia("(prefers-reduced-motion: reduce)");
  const duration=5000;
  let index=0,timeout=0,touchStartX=0,touchStartY=0;
  let pausedByUser=false,transitioning=false;

  const stop=()=>{clearTimeout(timeout);timeout=0;};
  const schedule=()=>{
    stop();
    const canPlay=!pausedByUser&&!document.hidden&&slides.length>1;
    if(canPlay)timeout=window.setTimeout(()=>change(index+1),duration);
  };
  const renderState=()=>{
    slides.forEach((slide,slideIndex)=>{
      const active=slideIndex===index;
      slide.classList.toggle("is-active",active);
      slide.setAttribute("aria-hidden",String(!active));
      slide.inert=!active;
    });
    dots.forEach((dot,dotIndex)=>{
      const active=dotIndex===index;
      dot.classList.toggle("active",active);
      active?dot.setAttribute("aria-current","true"):dot.removeAttribute("aria-current");
    });
  };
  const change=(next:number)=>{
    const nextIndex=(next+slides.length)%slides.length;
    if(transitioning||nextIndex===index)return;
    transitioning=true;
    const outgoing=slides[index];
    outgoing?.classList.remove("is-active");
    outgoing?.classList.add("is-leaving");
    index=nextIndex;
    renderState();
    window.setTimeout(()=>{
      outgoing?.classList.remove("is-leaving");
      transitioning=false;
      schedule();
    },reduceMotion.matches?20:820);
  };
  const manual=(next:number)=>{stop();if(next===index)schedule();else change(next);};

  dots.forEach(dot=>dot.addEventListener("click",()=>manual(Number(dot.dataset.carouselDot))));
  previous?.addEventListener("click",()=>manual(index-1));
  next?.addEventListener("click",()=>manual(index+1));
  toggle?.addEventListener("click",()=>{
    pausedByUser=!pausedByUser;
    toggle.setAttribute("aria-pressed",String(pausedByUser));
    toggle.setAttribute("aria-label",pausedByUser?"Reanudar presentación":"Pausar presentación");
    schedule();
  });
  carousel.addEventListener("keydown",event=>{
    if(event.key==="ArrowLeft"){event.preventDefault();manual(index-1);}
    if(event.key==="ArrowRight"){event.preventDefault();manual(index+1);}
  });
  carousel.addEventListener("touchstart",event=>{touchStartX=event.touches[0]?.clientX??0;touchStartY=event.touches[0]?.clientY??0;},{passive:true});
  carousel.addEventListener("touchend",event=>{
    const touch=event.changedTouches[0];if(!touch)return;
    const dx=touch.clientX-touchStartX,dy=touch.clientY-touchStartY;
    if(Math.abs(dx)>48&&Math.abs(dx)>Math.abs(dy))manual(index+(dx<0?1:-1));
  },{passive:true});
  document.addEventListener("visibilitychange",schedule);
  reduceMotion.addEventListener("change",schedule);
  schedule();
}
