import{S as m,i as h}from"./assets/vendor-46aac873.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))s(o);new MutationObserver(o=>{for(const n of o)if(n.type==="childList")for(const a of n.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&s(a)}).observe(document,{childList:!0,subtree:!0});function t(o){const n={};return o.integrity&&(n.integrity=o.integrity),o.referrerpolicy&&(n.referrerPolicy=o.referrerpolicy),o.crossorigin==="use-credentials"?n.credentials="include":o.crossorigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function s(o){if(o.ep)return;o.ep=!0;const n=t(o);fetch(o.href,n)}})();const g=new URL("/goit-js-hw-11/assets/octagon-eaf41606.svg",self.location).href,y=new URL("/goit-js-hw-11/assets/x-c55d42bc.svg",self.location).href,c={key:"41460845-2ab95350f4581127087fd5faf",q:"",image_type:"photo",orientation:"horizontal",safesearch:!0},p=document.querySelector(".search-form"),f=document.querySelector(".search-btn"),i=document.querySelector(".loading-message"),u=document.querySelector(".gallery"),d=p.elements.search;i.style.display="none";let b=new m(".gallery a",{captions:!0,captionSelector:"img",captionType:"attr",captionsData:"alt",captionPosition:"bottom"});p.addEventListener("submit",r=>{r.preventDefault();let e=d.value.trim();if(!e){l("Search must be filled!");return}d.value="",w(e).then(t=>L(t)).catch(t=>{console.log(t)}).finally(()=>{i.style.display="none",f.disabled=!1})});function w(r){i.style.display="block",f.disabled=!0,c.q=r;const e=new URLSearchParams(c);return fetch(`https://pixabay.com/api/?${e.toString()}`).then(t=>{if(!t.ok)throw new Error(t.status);return t.json()}).catch(t=>l(t))}function L(r){if(r.hits.length===0){l("Sorry, there are no images matching your search query. Please try again!");return}u.innerHTML="";const e=r.hits.reduce((t,s)=>t+=`
        <a class="gallery-link" href="${s.largeImageURL}">
          <img
              class="gallery-image"
              src="${s.webformatURL}"
              alt="${s.tags}"
          />
          <ul>
            <li>
                <span>Likes</span>
                <span>${s.likes}</span>
            </li>
            <li>
                <span>Views</span>
                <span>${s.views}</span>
            </li>
            <li>
                <span>Comments</span>
                <span>${s.comments}</span>
            </li>
            <li>
                <span>Downloads</span>
                <span>${s.downloads}</span>
            </li>
          </ul>  
          </a>`,"");u.insertAdjacentHTML("beforeend",e),b.refresh()}function l(r){h.show({titleColor:"#FFF",titleSize:"16px",message:r,messageColor:"#FFF",messageSize:"16px",maxWidth:"462px",position:"topRight",backgroundColor:"#EF4040",iconUrl:g,progressBarColor:"#FFBEBE",timeout:5e5,targetFirst:!1,close:!1,buttons:[[`<button type="button" id="izi-close-button">
                 <img src="${y}" alt="" width="16px" height="16px" />
              </button>`,function(t,s){t.hide({},s,"buttonName")}]]});let e=document.querySelector(".iziToast.fadeInUp");e.style.paddingTop="20px",e.style.paddingBottom="20px",e=document.querySelector(".iziToast>.iziToast-body .iziToast-texts"),e.style.maxWidth="322px"}
//# sourceMappingURL=commonHelpers.js.map
