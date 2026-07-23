const FAVORITES_KEY = "nexbyte:favorites";
const COMPARE_KEY = "nexbyte:comparison";
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
  const favorites = read(FAVORITES_KEY), comparison = read(COMPARE_KEY);
  const favoriteCount = document.querySelector<HTMLElement>("[data-favorite-count]");
  const compareCount = document.querySelector<HTMLElement>("[data-compare-count]");
  if (favoriteCount) { favoriteCount.textContent=String(favorites.length); favoriteCount.hidden=!favorites.length; }
  if (compareCount) { compareCount.textContent=String(comparison.length); compareCount.hidden=!comparison.length; }
  document.querySelectorAll<HTMLElement>("[data-product]").forEach(card => {
    const asin=card.dataset.asin??""; const fav=card.querySelector<HTMLElement>("[data-favorite]"); const compare=card.querySelector<HTMLInputElement>("[data-compare]");
    fav?.setAttribute("aria-pressed",String(favorites.includes(asin))); if(fav)fav.textContent=favorites.includes(asin)?"♥":"♡"; if(compare)compare.checked=comparison.includes(asin);
  });
  const dock=document.querySelector<HTMLElement>("[data-comparison-dock]"); const slots=document.querySelector<HTMLElement>("[data-dock-slots]"); const link=document.querySelector<HTMLAnchorElement>("[data-compare-link]");
  if(dock)dock.hidden=!comparison.length;if(link)link.href=`/comparar?productos=${comparison.join(",")}`;
  if(slots){slots.innerHTML="";for(let i=0;i<4;i++){const asin=comparison[i];const card=asin?document.querySelector<HTMLElement>(`[data-asin="${asin}"]`):null;const slot=document.createElement("div");slot.className="dock-slot";slot.innerHTML=card?`<img src="${card.querySelector("img")?.getAttribute("src")}" alt=""><span>${card.dataset.title}</span><button type="button" data-remove="${asin}" aria-label="Eliminar ${card.dataset.title}">×</button>`:`<span>+ Añadir producto</span>`;slots.append(slot);}}
};
document.querySelectorAll<HTMLElement>("[data-favorite]").forEach(button=>button.addEventListener("click",()=>{
  const asin=button.closest<HTMLElement>("[data-product]")?.dataset.asin??"";let values=read(FAVORITES_KEY);const active=values.includes(asin);values=active?values.filter(v=>v!==asin):[...values,asin];write(FAVORITES_KEY,values);toast(active?"Eliminado de favoritos":"Añadido a favoritos");update();
}));
document.querySelectorAll<HTMLInputElement>("[data-compare]").forEach(input=>input.addEventListener("change",()=>{
  const asin=input.closest<HTMLElement>("[data-product]")?.dataset.asin??"";let values=read(COMPARE_KEY);if(input.checked){if(values.length>=4){input.checked=false;toast("Puedes comparar hasta 4 productos");return;}values=[...values,asin];toast("Producto añadido a la comparación");}else values=values.filter(v=>v!==asin);write(COMPARE_KEY,values);update();
}));
document.querySelector("[data-dock-slots]")?.addEventListener("click",event=>{const button=(event.target as Element).closest<HTMLElement>("[data-remove]");if(!button)return;write(COMPARE_KEY,read(COMPARE_KEY).filter(v=>v!==button.dataset.remove));update();});
update();
