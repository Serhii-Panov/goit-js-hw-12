import{S as g,a as p,i as l}from"./assets/vendor-NeYdtwFS.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))s(t);new MutationObserver(t=>{for(const i of t)if(i.type==="childList")for(const c of i.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&s(c)}).observe(document,{childList:!0,subtree:!0});function r(t){const i={};return t.integrity&&(i.integrity=t.integrity),t.referrerPolicy&&(i.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?i.credentials="include":t.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function s(t){if(t.ep)return;t.ep=!0;const i=r(t);fetch(t.href,i)}})();const b=new g(".gallery a",{captionsData:"alt",captionDelay:250});function d(e){const o=document.querySelector(".gallery");if(!o)return;const r=e.map(s=>`
      <li class="gallery-item">
        <a class="gallery-link" href="${s.largeImageURL}" title="${s.tags}">
          <img
            class="gallery-image"
            src="${s.webformatURL}"
            alt="${s.tags}"
            loading="lazy"
          />
        </a>
        <ul class="stats">
          <li class="stats-item"><b>Likes</b> ${s.likes}</li>
          <li class="stats-item"><b>Views</b> ${s.views}</li>
          <li class="stats-item"><b>Comments</b> ${s.comments}</li>
          <li class="stats-item"><b>Downloads</b> ${s.downloads}</li>
        </ul>
      </li>
    `).join("");o.insertAdjacentHTML("beforeend",r),b.refresh()}function f(){const e=document.querySelector(".gallery");e&&(e.innerHTML="")}function y(){const e=document.querySelector(".loader");e&&(e.style.display="block")}function m(){const e=document.querySelector(".loader");e&&(e.style.display="none")}function L(){const e=document.querySelector(".load-more");e&&(e.style.display="block")}function w(){const e=document.querySelector(".load-more");e&&(e.style.display="none")}const S="52790584-b8940124ef420833efbac5129";async function h(e,o){try{return(await p.get("https://pixabay.com/api/",{params:{q:e,key:S,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:15,page:o}})).data}catch{throw err}}let n="",a=1;const u=document.querySelector(".form"),q=document.querySelector(".gallery"),E=document.querySelector(".load-more");E.addEventListener("click",()=>{y(),h(n,a).then(e=>{const o=Math.ceil(e.totalHits/15);if(a>o){l.info({title:"Info",message:"We're sorry, but you've reached the end of search results.",position:"topRight"}),w();return}d(e.hits),a+=1,window.scrollBy({top:q.firstElementChild.getBoundingClientRect().height*2,behavior:"smooth"})}).catch(e=>{l.error({title:"Error",message:"An error occurred while fetching images. Please try again later.",position:"topRight"})}).finally(()=>{m()})});u.addEventListener("submit",M);function M(e){if(e.preventDefault(),n=new FormData(u).get("search-text").trim(),n===""){l.error({title:"Error",message:"Please enter a search query.",position:"topRight"});return}a=1,y(),f(),h(n,a).then(r=>{if(!r||!Array.isArray(r.hits)||r.hits.length===0){l.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"}),f();return}d(r.hits),a+=1,a<Math.ceil(r.totalHits/15)&&L()}).catch(r=>{l.error({title:"Error",message:"An error occurred while fetching images. Please try again later.",position:"topRight"}),console.error("Error fetching images:",r)}).finally(()=>{m(),u.reset()})}
//# sourceMappingURL=index.js.map
