const FAVORITES_KEY = "nexbyte:favorites";
const read = (key: string): string[] => {
  try { return JSON.parse(localStorage.getItem(key) ?? "[]"); } catch { return []; }
};
const write = (key: string, value: string[]) => localStorage.setItem(key, JSON.stringify(value));
const toast = (message: string) => {
  const region = document.querySelector<HTMLElement>("[data-toast-region]");
  if (!region) return;
  const item = document.createElement("div"); item.className = "toast";
  item.innerHTML = `<span>${message}</span><button type="button" aria-label="Cerrar">×</button>`;
  item.querySelector("button")?.addEventListener("click", () => item.remove());
  region.append(item); while (region.children.length > 3) region.firstElementChild?.remove();
  setTimeout(() => item.remove(), 3600);
};
const update = () => {
  const favorites = read(FAVORITES_KEY);
  const favoriteCount = document.querySelector<HTMLElement>("[data-favorite-count]");
  if (favoriteCount) { favoriteCount.textContent=String(favorites.length); favoriteCount.hidden=!favorites.length; }
  document.querySelectorAll<HTMLElement>("[data-product]").forEach(card => {
    const slug=card.dataset.slug??""; const fav=card.querySelector<HTMLElement>("[data-favorite]");
    const active=favorites.includes(slug);fav?.setAttribute("aria-pressed",String(active));
    const icon=fav?.querySelector<HTMLElement>("[data-favorite-icon]");if(icon)icon.textContent=active?"♥":"♡";
    if(fav)fav.setAttribute("aria-label",`${active?"Quitar":"Añadir"} ${card.dataset.title??"producto"} ${active?"de":"a"} favoritos`);
  });
};
let favoriteAnimation: Animation | null = null;
let counterAnimation: Animation | null = null;
document.addEventListener("click",(event)=>{
  const button=(event.target as Element).closest<HTMLElement>("[data-favorite]");
  if(!button)return;
  const slug=button.closest<HTMLElement>("[data-product]")?.dataset.slug??"";
  let values=read(FAVORITES_KEY);
  const active=values.includes(slug);
  const counter=document.querySelector<HTMLElement>("[data-favorite-count]");
  values=active?values.filter(v=>v!==slug):[...values,slug];
  write(FAVORITES_KEY,values);
  update();
  if(!matchMedia("(prefers-reduced-motion: reduce)").matches){
    favoriteAnimation?.cancel();
    favoriteAnimation=button.animate(
      active?[{transform:"scale(1)"},{transform:"scale(.82)"},{transform:"scale(1)"}]:[{transform:"scale(1)"},{transform:"scale(.78)"},{transform:"scale(1.24)"},{transform:"scale(.96)"},{transform:"scale(1)"}],
      {duration:active?260:460,easing:"cubic-bezier(.22, 1, .36, 1)"}
    );
    button.classList.toggle("is-celebrating",!active);
    favoriteAnimation.finished.finally(()=>button.classList.remove("is-celebrating"));
    if(counter){
      counterAnimation?.cancel();
      counterAnimation=counter.animate(
        [{transform:"translateY(0)",opacity:1},{transform:"translateY(-7px)",opacity:0},{transform:"translateY(7px)",opacity:0},{transform:"translateY(0)",opacity:1}],
        {duration:360,easing:"ease-out"}
      );
    }
  }
  toast(active?"Eliminado de favoritos":"Añadido a favoritos");
});
update();
window.addEventListener("nexbyte:favorites-changed", update);
