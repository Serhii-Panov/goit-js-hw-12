import{S as f,a as y,i as l}from"./assets/vendor-_Lv9v3kx.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))e(t);new MutationObserver(t=>{for(const s of t)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&e(a)}).observe(document,{childList:!0,subtree:!0});function i(t){const s={};return t.integrity&&(s.integrity=t.integrity),t.referrerPolicy&&(s.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?s.credentials="include":t.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function e(t){if(t.ep)return;t.ep=!0;const s=i(t);fetch(t.href,s)}})();const m=new f(".gallery a",{captionsData:"alt",captionDelay:250});function d(r){const o=document.querySelector(".gallery");if(!o)return;const i=r.map(e=>`
      <li class="gallery-item">
        <a class="gallery-link" href="${e.largeImageURL}" title="${e.tags}">
          <img
            class="gallery-image"
            src="${e.webformatURL}"
            alt="${e.tags}"
            loading="lazy"
          />
        </a>
        <ul class="stats">
          <li class="stats-item"><b>Likes</b> ${e.likes}</li>
          <li class="stats-item"><b>Views</b> ${e.views}</li>
          <li class="stats-item"><b>Comments</b> ${e.comments}</li>
          <li class="stats-item"><b>Downloads</b> ${e.downloads}</li>
        </ul>
      </li>
    `).join("");o.insertAdjacentHTML("beforeend",i),m.refresh()}function c(){const r=document.querySelector(".gallery");r&&(r.innerHTML="")}function g(){const r=document.querySelector(".loader");r&&(r.style.display="block")}function h(){const r=document.querySelector(".loader");r&&(r.style.display="none")}const p="52790584-b8940124ef420833efbac5129";function b(r){return y.get("https://pixabay.com/api/",{params:{q:r,key:p,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:40}}).then(o=>o.data).catch(o=>{throw console.error("Error in getImagesByQuery:",o),o})}let u="";const n=document.querySelector(".form");document.querySelector(".gallery");n.addEventListener("submit",L);function L(r){r.preventDefault();const i=new FormData(n).get("search-text").trim();if(i===""){l.error({title:"Error",message:"Please enter a search query.",position:"topRight"});return}g(),b(i).then(e=>{if(!e||!Array.isArray(e.hits)||e.hits.length===0){l.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"}),c();return}i!==u&&(c(),u=i),d(e.hits)}).catch(e=>{l.error({title:"Error",message:"An error occurred while fetching images. Please try again later.",position:"topRight"}),console.error("Error fetching images:",e)}).finally(()=>{h(),n.reset()})}
//# sourceMappingURL=index.js.map
