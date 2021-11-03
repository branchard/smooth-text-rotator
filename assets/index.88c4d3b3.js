var p=Object.defineProperty;var h=Object.getOwnPropertySymbols;var m=Object.prototype.hasOwnProperty,c=Object.prototype.propertyIsEnumerable;var l=(r,t,e)=>t in r?p(r,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):r[t]=e,d=(r,t)=>{for(var e in t||(t={}))m.call(t,e)&&l(r,e,t[e]);if(h)for(var e of h(t))c.call(t,e)&&l(r,e,t[e]);return r};const u=function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const n of i)if(n.type==="childList")for(const o of n.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&s(o)}).observe(document,{childList:!0,subtree:!0});function e(i){const n={};return i.integrity&&(n.integrity=i.integrity),i.referrerpolicy&&(n.referrerPolicy=i.referrerpolicy),i.crossorigin==="use-credentials"?n.credentials="include":i.crossorigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function s(i){if(i.ep)return;i.ep=!0;const n=e(i);fetch(i.href,n)}};u();function f(r){return Array.isArray(r)&&r.every(t=>typeof t=="string")}class a{constructor(t){if(this.phraseElements=[],this.index=0,this.intervalID=null,this.started=!1,this.listeners={start:[],stop:[],rotation:[],widthUpdate:[]},this.options=d({interval:4e3,automaticPause:!0,fadeTransitionDuration:200,fadeTransitionTimingFunction:"ease",widthTransitionDuration:350,widthTransitionTimingFunction:"ease"},t),this.options.element.dataset.phrases===void 0)throw{error:new Error("The 'phrases' data attribute is not defined in the passed element"),element:this.options.element};const e=JSON.parse(this.options.element.dataset.phrases);if(!f(e))throw{error:new Error("The 'phrases' data attribute in the passed element is not a JSON that is an array of string"),element:this.options.element};this.options.element.innerHTML="",this.options.element.style.display="inline-block",this.options.element.style.position="relative",this.options.element.style.transitionProperty="width",this.options.element.style.transitionDuration=`${this.options.widthTransitionDuration}ms`,this.options.element.style.transitionTimingFunction=this.options.widthTransitionTimingFunction,e.forEach(s=>{this.append(s)});try{this.setupResizeObserver()}catch(s){console.error(s)}if(this.options.automaticPause)try{this.setupIntersectionObserver()}catch(s){console.error(s)}}start(){this.started&&this.stop(),this.started=!0,this.index=0,this.startInterval()}stop(){this.index!=0&&(this.setElementHidden(this.phraseElements[this.index]),this.setElementVisible(this.phraseElements[0]),this.updateWidth(this.phraseElements[0].offsetWidth)),this.started=!1,this.index=0,this.intervalID&&this.stopInterval()}pause(){this.stopInterval()}resume(){this.startInterval()}next(){this.select((this.index+1)%this.phraseElements.length)}previous(){this.select(this.index===0?this.phraseElements.length-1:this.index-1)}select(t){if(t<0||t>=this.phraseElements.length)throw new Error(`Selected index (${t}) is out of range (${this.phraseElements.length-1}).`);this.listeners.rotation.forEach(e=>e({previousIndex:this.index,previousPhraseElement:this.phraseElements[this.index],nextIndex:t,nextPhraseElement:this.phraseElements[t]})),this.setElementHidden(this.phraseElements[this.index]),this.setElementVisible(this.phraseElements[t]),this.updateWidth(this.phraseElements[t].offsetWidth),this.index=t}prepend(t){return this.insert(t,0)}append(t){return this.insert(t,this.phraseElements.length)}insert(t,e){if(e<0||e>this.phraseElements.length)throw new Error(`The index (${e}) to insert at is out of range (${this.phraseElements.length}).`);const s=document.createElement("span");return e>0?(s.style.position="absolute",s.style.top="0",s.style.left="0"):this.phraseElements.length>0&&(this.phraseElements[0].style.position="",this.phraseElements[0].style.top="",this.phraseElements[0].style.left=""),s.style.display="inline-block",s.style.whiteSpace="nowrap",s.style.transitionProperty="opacity",s.style.transitionDuration=`${this.options.fadeTransitionDuration}ms`,s.style.transitionTimingFunction=this.options.fadeTransitionTimingFunction,this.phraseElements.length>0?this.setElementHidden(s):(this.setElementVisible(s),this.updateWidth(s.offsetWidth)),s.innerText=t,e>=this.phraseElements.length?this.options.element.appendChild(s):this.options.element.insertBefore(s,this.phraseElements[e]),this.phraseElements.splice(e,0,s),e<=this.index&&this.index++,s}remove(t){if(t<0||t>=this.phraseElements.length)throw new Error(`The index (${t}) to remove is out of range (${this.phraseElements.length-1}).`);this.options.element.removeChild(this.phraseElements[t]),this.phraseElements.splice(t,1),t<this.index?this.index--:t===this.index&&this.select(this.index%this.phraseElements.length)}addEventListener(t,e){this.listeners[t].push(e)}removeEventListener(t,e){const s=this.listeners[t].indexOf(e);s!==-1&&this.listeners[t].splice(s,1)}setupResizeObserver(){const t=new ResizeObserver(e=>{e.forEach(s=>{s.target===this.phraseElements[this.index]&&this.updateWidth(s.borderBoxSize[0].inlineSize)})});this.phraseElements.forEach(e=>{t.observe(e)})}setupIntersectionObserver(){new IntersectionObserver(e=>{this.started&&(e[0].isIntersecting?this.intervalID===null&&this.resume():this.intervalID!==null&&this.pause())}).observe(this.options.element)}startInterval(){if(this.intervalID!==null)throw new Error(`Cannot start multiple ${window.setInterval.name} function`);this.listeners.start.forEach(t=>t({currentIndex:this.index,currentPhraseElement:this.phraseElements[this.index]})),this.intervalID=window.setInterval(()=>this.next(),this.options.interval)}stopInterval(){if(this.intervalID===null)throw new Error(`Cannot stop ${window.setInterval.name} that dont exists`);this.listeners.stop.forEach(t=>t({currentIndex:this.index,currentPhraseElement:this.phraseElements[this.index]})),window.clearInterval(this.intervalID),this.intervalID=null}setElementHidden(t){t.style.opacity="0",t.setAttribute("aria-hidden","true"),t.style.pointerEvents="none",t.style.userSelect="none"}setElementVisible(t){t.style.opacity="1",t.removeAttribute("aria-hidden"),t.style.pointerEvents="",t.style.userSelect=""}updateWidth(t){this.listeners.widthUpdate.forEach(e=>e({currentIndex:this.index,currentPhraseElement:this.phraseElements[this.index],previousWidth:this.options.element.offsetWidth,nextWidth:t})),this.options.element.style.width=`${t}px`}}window.addEventListener("DOMContentLoaded",()=>{const r=document.getElementById("text-rotator-first");r&&new a({element:r,interval:2e3}).start();const t=document.getElementById("text-rotator-second");t&&new a({element:t,interval:2e3,widthTransitionDuration:450,widthTransitionTimingFunction:"cubic-bezier(0.43,-0.6, 0.29, 1.71)",fadeTransitionDuration:250,fadeTransitionTimingFunction:"ease-in-out"}).start();const e=document.getElementById("text-rotator-third");if(e){const i=new a({element:e,interval:2e3});i.addEventListener("start",()=>{var n;(n=e.closest(".demo"))==null||n.classList.remove("paused")}),i.addEventListener("stop",()=>{var n;(n=e.closest(".demo"))==null||n.classList.add("paused")}),i.start()}const s=document.getElementById("text-rotator-fourth");if(s){const i=["Roboto","Open Sans","Bitter"],n=["24px","18px","32px","45px"];new a({element:s,interval:2e3}).start(),window.setInterval(()=>{s.parentElement&&(s.parentElement.style.fontFamily=i[Math.floor(Math.random()*i.length)])},2652),window.setInterval(()=>{s.parentElement&&(s.parentElement.style.fontSize=n[Math.floor(Math.random()*n.length)])},1525)}});