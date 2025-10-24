import{S as h,a as p,i as n}from"./assets/vendor-NeYdtwFS.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))t(r);new MutationObserver(r=>{for(const i of r)if(i.type==="childList")for(const l of i.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&t(l)}).observe(document,{childList:!0,subtree:!0});function o(r){const i={};return r.integrity&&(i.integrity=r.integrity),r.referrerPolicy&&(i.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?i.credentials="include":r.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function t(r){if(r.ep)return;r.ep=!0;const i=o(r);fetch(r.href,i)}})();const b=new h(".gallery a",{captionsData:"alt",captionDelay:250});function f(e){const s=document.querySelector(".gallery");if(!s)return;const o=e.map(t=>`
      <li class="gallery-item">
        <a class="gallery-link" href="${t.largeImageURL}" title="${t.tags}">
          <img
            class="gallery-image"
            src="${t.webformatURL}"
            alt="${t.tags}"
            loading="lazy"
          />
        </a>
        <ul class="stats">
          <li class="stats-item"><b>Likes</b> ${t.likes}</li>
          <li class="stats-item"><b>Views</b> ${t.views}</li>
          <li class="stats-item"><b>Comments</b> ${t.comments}</li>
          <li class="stats-item"><b>Downloads</b> ${t.downloads}</li>
        </ul>
      </li>
    `).join("");s.insertAdjacentHTML("beforeend",o),b.refresh()}function d(){const e=document.querySelector(".gallery");e&&(e.innerHTML="")}function y(){const e=document.querySelector(".loader");e&&(e.style.display="block")}function m(){const e=document.querySelector(".loader");e&&(e.style.display="none")}function L(){const e=document.querySelector(".load-more");e&&(e.style.display="block")}function w(){const e=document.querySelector(".load-more");e&&(e.style.display="none")}const q="52790584-b8940124ef420833efbac5129";async function g(e,s){return await p.get("https://pixabay.com/api/",{params:{q:e,key:q,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:15,page:s}}).then(o=>o.data).catch(o=>{throw console.error("Error in getImagesByQuery:",o),o})}let c="",a=1;const u=document.querySelector(".form"),S=document.querySelector(".gallery"),E=document.querySelector(".load-more");E.addEventListener("click",()=>{y(),g(c,a).then(e=>{const s=Math.ceil(e.totalHits/15);if(a>s){n.info({title:"Info",message:"We're sorry, but you've reached the end of search results.",position:"topRight"}),w();return}f(e.hits),a+=1,window.scrollBy({top:S.firstElementChild.getBoundingClientRect().height*2,behavior:"smooth"})}).catch(e=>{n.error({title:"Error",message:"An error occurred while fetching images. Please try again later.",position:"topRight"})}).finally(()=>{m()})});u.addEventListener("submit",P);function P(e){e.preventDefault();const o=new FormData(u).get("search-text").trim();if(o===""){n.error({title:"Error",message:"Please enter a search query.",position:"topRight"});return}a=1,y(),g(o,a).then(t=>{if(!t||!Array.isArray(t.hits)||t.hits.length===0){n.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"}),d();return}o!==c&&(d(),c=o),f(t.hits),a+=1,L()}).catch(t=>{n.error({title:"Error",message:"An error occurred while fetching images. Please try again later.",position:"topRight"}),console.error("Error fetching images:",t)}).finally(()=>{m(),u.reset()})}
//# sourceMappingURL=index.js.map
