/**
 * Minified by jsDelivr using Terser v5.19.0.
 * Original file: /npm/markmap-view@0.15.4/dist/browser/index.js
 *
 * Do NOT use SRI with dynamically generated files! More information: https://www.jsdelivr.com/using-sri-with-dynamic-files
 */
/*! markmap-view v0.15.4 | MIT License */
!function(t,e){"use strict";
    /*! markmap-common v0.15.3 | MIT License */function n(){return n=Object.assign?Object.assign.bind():function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t},n.apply(this,arguments)}const r={jsdelivr:t=>`https://cdn.jsdelivr.net/npm/${t}`,unpkg:t=>`https://unpkg.com/${t}`};new class{constructor(){this.providers=n({},r),this.provider="jsdelivr"}getFastestProvider(t=5e3,e="npm2url/dist/index.cjs"){return new Promise(((n,r)=>{Promise.all(Object.entries(this.providers).map((async([t,r])=>{try{const i=await fetch(r(e));if(!i.ok)throw i;await i.text(),n(t)}catch(t){}}))).then((()=>r(new Error("All providers failed")))),setTimeout(r,t,new Error("Timed out"))}))}async findFastestProvider(t){return this.provider=await this.getFastestProvider(t),this.provider}setProvider(t,e){e?this.providers[t]=e:delete this.providers[t]}getFullUrl(t,e=this.provider){if(t.includes("://"))return t;const n=this.providers[e];if(!n)throw new Error(`Provider ${e} not found`);return n(t)}};class i{constructor(){this.listeners=[]}tap(t){return this.listeners.push(t),()=>this.revoke(t)}revoke(t){const e=this.listeners.indexOf(t);e>=0&&this.listeners.splice(e,1)}revokeAll(){this.listeners.splice(0)}call(...t){for(const e of this.listeners)e(...t)}}const o=Math.random().toString(36).slice(2,8);let a=0;function s(){}function l(t,e){const n=(t,r)=>e(t,(()=>{var e;null==(e=t.children)||e.forEach((e=>{n(e,t)}))}),r);n(t)}function c(t){if("string"==typeof t){const e=t;t=t=>t.tagName===e}const e=t;return function(){let t=Array.from(this.childNodes);return e&&(t=t.filter((t=>e(t)))),t}}
    /*! @gera2ld/jsx-dom v2.2.2 | ISC License */
    const h=1,d=2,u="http://www.w3.org/2000/svg",p="http://www.w3.org/1999/xlink",f={show:p,actuate:p,href:p},m=t=>"string"==typeof t||"number"==typeof t,g=t=>(null==t?void 0:t.vtype)===h,y=t=>(null==t?void 0:t.vtype)===d;function v(t,e,...n){return function(t,e){let n;if("string"==typeof t)n=h;else{if("function"!=typeof t)throw new Error("Invalid VNode type");n=d}return{vtype:n,type:t,props:e}}(t,e=Object.assign({},e,{children:1===n.length?n[0]:n}))}function x(t){return t.children}const b={isSvg:!1};function k(t,e){Array.isArray(e)||(e=[e]),(e=e.filter(Boolean)).length&&t.append(...e)}const z={className:"class",labelFor:"for"};function S(t,e,n,r){if(e=z[e]||e,!0===n)t.setAttribute(e,"");else if(!1===n)t.removeAttribute(e);else{const i=r?f[e]:void 0;void 0!==i?t.setAttributeNS(i,e,n):t.setAttribute(e,n)}}function w(t,e){return Array.isArray(t)?t.map((t=>w(t,e))).reduce(((t,e)=>t.concat(e)),[]):E(t,e)}function E(t,e=b){if(null==t||"boolean"==typeof t)return null;if(t instanceof Node)return t;if(y(t)){const{type:n,props:r}=t;if(n===x){const t=document.createDocumentFragment();if(r.children){k(t,w(r.children,e))}return t}return E(n(r),e)}if(m(t))return document.createTextNode(`${t}`);if(g(t)){let n;const{type:r,props:i}=t;if(e.isSvg||"svg"!==r||(e=Object.assign({},e,{isSvg:!0})),n=e.isSvg?document.createElementNS(u,r):document.createElement(r),function(t,e,n){for(const r in e)if("key"!==r&&"children"!==r&&"ref"!==r)if("dangerouslySetInnerHTML"===r)t.innerHTML=e[r].__html;else if("innerHTML"===r||"textContent"===r||"innerText"===r||"value"===r&&["textarea","select"].includes(t.tagName)){const n=e[r];null!=n&&(t[r]=n)}else r.startsWith("on")?t[r.toLowerCase()]=e[r]:S(t,r,e[r],n.isSvg)}(n,i,e),i.children){let t=e;e.isSvg&&"foreignObject"===r&&(t=Object.assign({},t,{isSvg:!1}));const o=w(i.children,t);null!=o&&k(n,o)}const{ref:o}=i;return"function"==typeof o&&o(n),n}throw new Error("mount: Invalid Vnode!")}function j(...t){return E(v(...t))}const C=function(t){const e={};return function(...n){const r=`${n[0]}`;let i=e[r];return i||(i={value:t(...n)},e[r]=i),i.value}}((t=>{document.head.append(j("link",{rel:"preload",as:"script",href:t}))})),X={},O={};async function A(t,e){var r;const i="script"===t.type&&(null==(r=t.data)?void 0:r.src)||"";if(t.loaded||(t.loaded=X[i]),!t.loaded&&("script"===t.type&&(t.loaded=new Promise(((e,r)=>{document.head.append(j("script",n({},t.data,{onLoad:e,onError:r}))),i||e(void 0)})).then((()=>{t.loaded=!0})),i&&(X[i]=t.loaded)),"iife"===t.type)){const{fn:n,getParams:r}=t.data;n(...(null==r?void 0:r(e))||[]),t.loaded=!0}await t.loaded}function M(t){const e="stylesheet"===t.type&&t.data.href||"";t.loaded||(t.loaded=O[e]),t.loaded||(t.loaded=!0,e&&(O[e]=!0),"style"===t.type?document.head.append(j("style",{textContent:t.data})):"stylesheet"===t.type&&document.head.append(j("link",n({rel:"stylesheet"},t.data))))}function $(){return $=Object.assign?Object.assign.bind():function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t},$.apply(this,arguments)}function N(t){var e=0,n=t.children,r=n&&n.length;if(r)for(;--r>=0;)e+=n[r].value;else e=1;t.value=e}function T(t,e){var n,r,i,o,a,s=new H(t),l=+t.value&&(s.value=t.value),c=[s];for(null==e&&(e=R);n=c.pop();)if(l&&(n.value=+n.data.value),(i=e(n.data))&&(a=i.length))for(n.children=new Array(a),o=a-1;o>=0;--o)c.push(r=n.children[o]=new H(i[o])),r.parent=n,r.depth=n.depth+1;return s.eachBefore(L)}function R(t){return t.children}function B(t){t.data=t.data.data}function L(t){var e=0;do{t.height=e}while((t=t.parent)&&t.height<++e)}function H(t){this.data=t,this.depth=this.height=0,this.parent=null}H.prototype=T.prototype={constructor:H,count:function(){return this.eachAfter(N)},each:function(t){var e,n,r,i,o=this,a=[o];do{for(e=a.reverse(),a=[];o=e.pop();)if(t(o),n=o.children)for(r=0,i=n.length;r<i;++r)a.push(n[r])}while(a.length);return this},eachAfter:function(t){for(var e,n,r,i=this,o=[i],a=[];i=o.pop();)if(a.push(i),e=i.children)for(n=0,r=e.length;n<r;++n)o.push(e[n]);for(;i=a.pop();)t(i);return this},eachBefore:function(t){for(var e,n,r=this,i=[r];r=i.pop();)if(t(r),e=r.children)for(n=e.length-1;n>=0;--n)i.push(e[n]);return this},sum:function(t){return this.eachAfter((function(e){for(var n=+t(e.data)||0,r=e.children,i=r&&r.length;--i>=0;)n+=r[i].value;e.value=n}))},sort:function(t){return this.eachBefore((function(e){e.children&&e.children.sort(t)}))},path:function(t){for(var e=this,n=function(t,e){if(t===e)return t;var n=t.ancestors(),r=e.ancestors(),i=null;t=n.pop(),e=r.pop();for(;t===e;)i=t,t=n.pop(),e=r.pop();return i}(e,t),r=[e];e!==n;)e=e.parent,r.push(e);for(var i=r.length;t!==n;)r.splice(i,0,t),t=t.parent;return r},ancestors:function(){for(var t=this,e=[t];t=t.parent;)e.push(t);return e},descendants:function(){var t=[];return this.each((function(e){t.push(e)})),t},leaves:function(){var t=[];return this.eachBefore((function(e){e.children||t.push(e)})),t},links:function(){var t=this,e=[];return t.each((function(n){n!==t&&e.push({source:n.parent,target:n})})),e},copy:function(){return T(this).eachBefore(B)}};var P={name:"d3-flextree",version:"2.1.2",main:"build/d3-flextree.js",module:"index","jsnext:main":"index",author:{name:"Chris Maloney",url:"http://chrismaloney.org"},description:"Flexible tree layout algorithm that allows for variable node sizes.",keywords:["d3","d3-module","layout","tree","hierarchy","d3-hierarchy","plugin","d3-plugin","infovis","visualization","2d"],homepage:"https://github.com/klortho/d3-flextree",license:"WTFPL",repository:{type:"git",url:"https://github.com/klortho/d3-flextree.git"},scripts:{clean:"rm -rf build demo test","build:demo":"rollup -c --environment BUILD:demo","build:dev":"rollup -c --environment BUILD:dev","build:prod":"rollup -c --environment BUILD:prod","build:test":"rollup -c --environment BUILD:test",build:"rollup -c",lint:"eslint index.js src","test:main":"node test/bundle.js","test:browser":"node test/browser-tests.js",test:"npm-run-all test:*",prepare:"npm-run-all clean build lint test"},dependencies:{"d3-hierarchy":"^1.1.5"},devDependencies:{"babel-plugin-external-helpers":"^6.22.0","babel-preset-es2015-rollup":"^3.0.0",d3:"^4.13.0","d3-selection-multi":"^1.0.1",eslint:"^4.19.1",jsdom:"^11.6.2","npm-run-all":"^4.1.2",rollup:"^0.55.3","rollup-plugin-babel":"^2.7.1","rollup-plugin-commonjs":"^8.0.2","rollup-plugin-copy":"^0.2.3","rollup-plugin-json":"^2.3.0","rollup-plugin-node-resolve":"^3.0.2","rollup-plugin-uglify":"^3.0.0","uglify-es":"^3.3.9"}};const{version:D}=P,F=Object.freeze({children:t=>t.children,nodeSize:t=>t.data.size,spacing:0});function I(t){const e=Object.assign({},F,t);function n(t){const n=e[t];return"function"==typeof n?n:()=>n}function r(t){const e=o(function(){const t=i(),e=n("nodeSize"),r=n("spacing");return class extends t{constructor(t){super(t),Object.assign(this,{x:0,y:0,relX:0,prelim:0,shift:0,change:0,lExt:this,lExtRelX:0,lThr:null,rExt:this,rExtRelX:0,rThr:null})}get size(){return e(this.data)}spacing(t){return r(this.data,t.data)}get x(){return this.data.x}set x(t){this.data.x=t}get y(){return this.data.y}set y(t){this.data.y=t}update(){return Y(this),V(this),this}}}(),t,(t=>t.children));return e.update(),e.data}function i(){const t=n("nodeSize"),e=n("spacing");return class n extends T.prototype.constructor{constructor(t){super(t)}copy(){const t=o(this.constructor,this,(t=>t.children));return t.each((t=>t.data=t.data.data)),t}get size(){return t(this)}spacing(t){return e(this,t)}get nodes(){return this.descendants()}get xSize(){return this.size[0]}get ySize(){return this.size[1]}get top(){return this.y}get bottom(){return this.y+this.ySize}get left(){return this.x-this.xSize/2}get right(){return this.x+this.xSize/2}get root(){const t=this.ancestors();return t[t.length-1]}get numChildren(){return this.hasChildren?this.children.length:0}get hasChildren(){return!this.noChildren}get noChildren(){return null===this.children}get firstChild(){return this.hasChildren?this.children[0]:null}get lastChild(){return this.hasChildren?this.children[this.numChildren-1]:null}get extents(){return(this.children||[]).reduce(((t,e)=>n.maxExtents(t,e.extents)),this.nodeExtents)}get nodeExtents(){return{top:this.top,bottom:this.bottom,left:this.left,right:this.right}}static maxExtents(t,e){return{top:Math.min(t.top,e.top),bottom:Math.max(t.bottom,e.bottom),left:Math.min(t.left,e.left),right:Math.max(t.right,e.right)}}}}function o(t,e,n){const r=(e,i)=>{const o=new t(e);Object.assign(o,{parent:i,depth:null===i?0:i.depth+1,height:0,length:1});const a=n(e)||[];return o.children=0===a.length?null:a.map((t=>r(t,o))),o.children&&Object.assign(o,o.children.reduce(((t,e)=>({height:Math.max(t.height,e.height+1),length:t.length+e.length})),o)),o};return r(e,null)}return Object.assign(r,{nodeSize(t){return arguments.length?(e.nodeSize=t,r):e.nodeSize},spacing(t){return arguments.length?(e.spacing=t,r):e.spacing},children(t){return arguments.length?(e.children=t,r):e.children},hierarchy(t,n){const r=void 0===n?e.children:n;return o(i(),t,r)},dump(t){const e=n("nodeSize"),r=t=>n=>{const i=t+"  ",o=t+"    ",{x:a,y:s}=n,l=e(n),c=n.children||[],h=0===c.length?" ":`,${i}children: [${o}${c.map(r(o)).join(o)}${i}],${t}`;return`{ size: [${l.join(", ")}],${i}x: ${a}, y: ${s}${h}},`};return r("\n")(t)}}),r}I.version=D;const Y=(t,e=0)=>(t.y=e,(t.children||[]).reduce(((e,n)=>{const[r,i]=e;Y(n,t.y+t.ySize);const o=(0===r?n.lExt:n.rExt).bottom;0!==r&&_(t,r,i);return[r+1,tt(o,r,i)]}),[0,null]),W(t),Q(t),t),V=(t,e,n)=>{void 0===e&&(e=-t.relX-t.prelim,n=0);const r=e+t.relX;return t.relX=r+t.prelim-n,t.prelim=0,t.x=n+t.relX,(t.children||[]).forEach((e=>V(e,r,t.x))),t},W=t=>{(t.children||[]).reduce(((t,e)=>{const[n,r]=t,i=n+e.shift,o=r+i+e.change;return e.relX+=o,[i,o]}),[0,0])},_=(t,e,n)=>{const r=t.children[e-1],i=t.children[e];let o=r,a=r.relX,s=i,l=i.relX,c=!0;for(;o&&s;){o.bottom>n.lowY&&(n=n.next);const r=a+o.prelim-(l+s.prelim)+o.xSize/2+s.xSize/2+o.spacing(s);(r>0||r<0&&c)&&(l+=r,U(i,r),K(t,e,n.index,r)),c=!1;const h=o.bottom,d=s.bottom;h<=d&&(o=Z(o),o&&(a+=o.relX)),h>=d&&(s=G(s),s&&(l+=s.relX))}!o&&s?J(t,e,s,l):o&&!s&&q(t,e,o,a)},U=(t,e)=>{t.relX+=e,t.lExtRelX+=e,t.rExtRelX+=e},K=(t,e,n,r)=>{const i=t.children[e],o=e-n;if(o>1){const e=r/o;t.children[n+1].shift+=e,i.shift-=e,i.change-=r-e}},G=t=>t.hasChildren?t.firstChild:t.lThr,Z=t=>t.hasChildren?t.lastChild:t.rThr,J=(t,e,n,r)=>{const i=t.firstChild,o=i.lExt,a=t.children[e];o.lThr=n;const s=r-n.relX-i.lExtRelX;o.relX+=s,o.prelim-=s,i.lExt=a.lExt,i.lExtRelX=a.lExtRelX},q=(t,e,n,r)=>{const i=t.children[e],o=i.rExt,a=t.children[e-1];o.rThr=n;const s=r-n.relX-i.rExtRelX;o.relX+=s,o.prelim-=s,i.rExt=a.rExt,i.rExtRelX=a.rExtRelX},Q=t=>{if(t.hasChildren){const e=t.firstChild,n=t.lastChild,r=(e.prelim+e.relX-e.xSize/2+n.relX+n.prelim+n.xSize/2)/2;Object.assign(t,{prelim:r,lExt:e.lExt,lExtRelX:e.lExtRelX,rExt:n.rExt,rExtRelX:n.rExtRelX})}},tt=(t,e,n)=>{for(;null!==n&&t>=n.lowY;)n=n.next;return{lowY:t,index:e,next:n}},et="http://www.w3.org/2000/svg",nt="http://www.w3.org/1999/xlink",rt={show:nt,actuate:nt,href:nt},it=t=>"string"==typeof t||"number"==typeof t,ot=t=>1===(null==t?void 0:t.vtype),at=t=>2===(null==t?void 0:t.vtype);function st(t,e){let n;if("string"==typeof t)n=1;else{if("function"!=typeof t)throw new Error("Invalid VNode type");n=2}return{vtype:n,type:t,props:e}}function lt(t){return t.children}const ct={isSvg:!1};function ht(t,e){Array.isArray(e)||(e=[e]),(e=e.filter(Boolean)).length&&t.append(...e)}const dt={className:"class",labelFor:"for"};function ut(t,e,n,r){if(e=dt[e]||e,!0===n)t.setAttribute(e,"");else if(!1===n)t.removeAttribute(e);else{const i=r?rt[e]:void 0;void 0!==i?t.setAttributeNS(i,e,n):t.setAttribute(e,n)}}function pt(t,e){return Array.isArray(t)?t.map((t=>pt(t,e))).reduce(((t,e)=>t.concat(e)),[]):ft(t,e)}function ft(t,e=ct){if(null==t||"boolean"==typeof t)return null;if(t instanceof Node)return t;if(at(t)){const{type:n,props:r}=t;if(n===lt){const t=document.createDocumentFragment();if(r.children){ht(t,pt(r.children,e))}return t}return ft(n(r),e)}if(it(t))return document.createTextNode(`${t}`);if(ot(t)){let n;const{type:r,props:i}=t;if(e.isSvg||"svg"!==r||(e=Object.assign({},e,{isSvg:!0})),n=e.isSvg?document.createElementNS(et,r):document.createElement(r),function(t,e,n){for(const r in e)if("key"!==r&&"children"!==r&&"ref"!==r)if("dangerouslySetInnerHTML"===r)t.innerHTML=e[r].__html;else if("innerHTML"===r||"textContent"===r||"innerText"===r||"value"===r&&["textarea","select"].includes(t.tagName)){const n=e[r];null!=n&&(t[r]=n)}else r.startsWith("on")?t[r.toLowerCase()]=e[r]:ut(t,r,e[r],n.isSvg)}(n,i,e),i.children){let t=e;e.isSvg&&"foreignObject"===r&&(t=Object.assign({},t,{isSvg:!1}));const o=pt(i.children,t);null!=o&&ht(n,o)}const{ref:o}=i;return"function"==typeof o&&o(n),n}throw new Error("mount: Invalid Vnode!")}function mt(t){return ft(t)}var gt=".markmap{font:300 16px/20px sans-serif}.markmap-link{fill:none}.markmap-node>circle{cursor:pointer}.markmap-foreign{display:inline-block}.markmap-foreign a{color:#0097e6}.markmap-foreign a:hover{color:#00a8ff}.markmap-foreign code{background-color:#f0f0f0;border-radius:2px;color:#555;font-size:calc(1em - 2px);padding:.25em}.markmap-foreign pre{margin:0}.markmap-foreign pre>code{display:block}.markmap-foreign del{text-decoration:line-through}.markmap-foreign em{font-style:italic}.markmap-foreign strong{font-weight:700}.markmap-foreign mark{background:#ffeaa7}",yt=".markmap-container{height:0;left:-100px;overflow:hidden;position:absolute;top:-100px;width:0}.markmap-container>.markmap-foreign{display:inline-block}.markmap-container>.markmap-foreign>div:last-child,.markmap-container>.markmap-foreign>div:last-child *{white-space:nowrap}";const vt=gt;function xt(t){const e=t.data;return Math.max(4-2*e.depth,1.5)}function bt(t,n){return t[e.minIndex(t,n)]}function kt(t){t.stopPropagation()}const zt=new i,St=e.scaleOrdinal(e.schemeCategory10),wt="undefined"!=typeof navigator&&navigator.userAgent.includes("Macintosh");class Et{constructor(t,n){this.options=Et.defaultOptions,this.revokers=[],this.handleZoom=t=>{const{transform:e}=t;this.g.attr("transform",e)},this.handlePan=t=>{t.preventDefault();const n=e.zoomTransform(this.svg.node()),r=n.translate(-t.deltaX/n.k,-t.deltaY/n.k);this.svg.call(this.zoom.transform,r)},this.handleClick=(t,e)=>{let n=this.options.toggleRecursively;(wt?t.metaKey:t.ctrlKey)&&(n=!n),this.toggleNode(e.data,n)},this.viewHooks={transformHtml:new i},this.svg=t.datum?t:e.select(t),this.styleNode=this.svg.append("style"),this.zoom=e.zoom().filter((t=>this.options.scrollForPan&&"wheel"===t.type?t.ctrlKey&&!t.button:!(t.ctrlKey&&"wheel"!==t.type||t.button))).on("zoom",this.handleZoom),this.setOptions(n),this.state={id:this.options.id||this.svg.attr("id")||(a+=1,`mm-${o}-${a}`),minX:0,maxX:0,minY:0,maxY:0},this.g=this.svg.append("g"),this.revokers.push(zt.tap((()=>{this.setData()})))}getStyleContent(){const{style:t}=this.options,{id:e}=this.state,n="function"==typeof t?t(e):"";return[this.options.embedGlobalCSS&&gt,n].filter(Boolean).join("\n")}updateStyle(){this.svg.attr("class",function(t,...e){const n=(t||"").split(" ").filter(Boolean);return e.forEach((t=>{t&&n.indexOf(t)<0&&n.push(t)})),n.join(" ")}(this.svg.attr("class"),"markmap",this.state.id));const t=this.getStyleContent();this.styleNode.text(t)}toggleNode(t,e=!1){var n;const r=null!=(n=t.payload)&&n.fold?0:1;var i;e?l(t,((t,e)=>{t.payload=$({},t.payload,{fold:r}),e()})):t.payload=$({},t.payload,{fold:null!=(i=t.payload)&&i.fold?0:1});this.renderData(t)}initializeData(t){let e=0;const{color:n,nodeMinHeight:r,maxWidth:i,initialExpandLevel:o}=this.options,{id:a}=this.state,s=mt(st("div",{className:`markmap-container markmap ${a}-g`})),c=mt(st("style",{children:[this.getStyleContent(),yt].join("\n")}));document.body.append(s,c);const h=i?`max-width: ${i}px`:"";let d=0;l(t,((t,r,i)=>{var a,l,c;t.children=null==(a=t.children)?void 0:a.map((t=>$({},t))),e+=1;const u=mt(st("div",{className:"markmap-foreign",style:h,children:st("div",{dangerouslySetInnerHTML:{__html:t.content}})}));s.append(u),t.state=$({},t.state,{id:e,el:u.firstChild}),t.state.path=[null==i||null==(l=i.state)?void 0:l.path,t.state.id].filter(Boolean).join("."),n(t);const p=2===(null==(c=t.payload)?void 0:c.fold);p?d+=1:(d||o>=0&&t.depth>=o)&&(t.payload=$({},t.payload,{fold:1})),r(),p&&(d-=1)}));const u=Array.from(s.childNodes).map((t=>t.firstChild));this.viewHooks.transformHtml.call(this,u),u.forEach((t=>{var e;null==(e=t.parentNode)||e.append(t.cloneNode(!0))})),l(t,((t,e,n)=>{var i;const o=t.state,a=o.el.getBoundingClientRect();t.content=o.el.innerHTML,o.size=[Math.ceil(a.width)+1,Math.max(Math.ceil(a.height),r)],o.key=[null==n||null==(i=n.state)?void 0:i.id,o.id].filter(Boolean).join(".")+t.content,e()})),s.remove(),c.remove()}setOptions(t){this.options=$({},this.options,t),this.options.zoom?this.svg.call(this.zoom):this.svg.on(".zoom",null),this.options.pan?this.svg.on("wheel",this.handlePan):this.svg.on("wheel",null)}setData(t,e){e&&this.setOptions(e),t&&(this.state.data=t),this.state.data&&(this.initializeData(this.state.data),this.updateStyle(),this.renderData())}renderData(t){var n,r;if(!this.state.data)return;const{spacingHorizontal:i,paddingX:o,spacingVertical:a,autoFit:s,color:l}=this.options,h=I({}).children((t=>{var e;if(null==(e=t.payload)||!e.fold)return t.children})).nodeSize((t=>{const[e,n]=t.data.state.size;return[n,e+(e?2*o:0)+i]})).spacing(((t,e)=>t.parent===e.parent?a:2*a)),d=h.hierarchy(this.state.data);h(d);const u=d.descendants().reverse(),p=d.links(),f=e.linkHorizontal(),m=e.min(u,(t=>t.x-t.xSize/2)),g=e.max(u,(t=>t.x+t.xSize/2)),y=e.min(u,(t=>t.y)),v=e.max(u,(t=>t.y+t.ySize-i));Object.assign(this.state,{minX:m,maxX:g,minY:y,maxY:v}),s&&this.fit();const x=t&&u.find((e=>e.data===t))||d,b=null!=(n=x.data.state.x0)?n:x.x,k=null!=(r=x.data.state.y0)?r:x.y,z=this.g.selectAll(c("g")).data(u,(t=>t.data.state.key)),S=z.enter().append("g").attr("data-depth",(t=>t.data.depth)).attr("data-path",(t=>t.data.state.path)).attr("transform",(t=>`translate(${k+x.ySize-t.ySize},${b+x.xSize/2-t.xSize})`)),w=this.transition(z.exit());w.select("line").attr("x1",(t=>t.ySize-i)).attr("x2",(t=>t.ySize-i)),w.select("foreignObject").style("opacity",0),w.attr("transform",(t=>`translate(${x.y+x.ySize-t.ySize},${x.x+x.xSize/2-t.xSize})`)).remove();const E=z.merge(S).attr("class",(t=>{var e;return["markmap-node",(null==(e=t.data.payload)?void 0:e.fold)&&"markmap-fold"].filter(Boolean).join(" ")}));this.transition(E).attr("transform",(t=>`translate(${t.y},${t.x-t.xSize/2})`));const j=E.selectAll(c("line")).data((t=>[t]),(t=>t.data.state.key)).join((t=>t.append("line").attr("x1",(t=>t.ySize-i)).attr("x2",(t=>t.ySize-i))),(t=>t),(t=>t.remove()));this.transition(j).attr("x1",-1).attr("x2",(t=>t.ySize-i+2)).attr("y1",(t=>t.xSize)).attr("y2",(t=>t.xSize)).attr("stroke",(t=>l(t.data))).attr("stroke-width",xt);const C=E.selectAll(c("circle")).data((t=>{var e;return null!=(e=t.data.children)&&e.length?[t]:[]}),(t=>t.data.state.key)).join((t=>t.append("circle").attr("stroke-width","1.5").attr("cx",(t=>t.ySize-i)).attr("cy",(t=>t.xSize)).attr("r",0).on("click",((t,e)=>this.handleClick(t,e))).on("mousedown",kt)),(t=>t),(t=>t.remove()));this.transition(C).attr("r",6).attr("cx",(t=>t.ySize-i)).attr("cy",(t=>t.xSize)).attr("stroke",(t=>l(t.data))).attr("fill",(t=>{var e;return null!=(e=t.data.payload)&&e.fold&&t.data.children?l(t.data):"#fff"}));const X=E.selectAll(c("foreignObject")).data((t=>[t]),(t=>t.data.state.key)).join((t=>{const e=t.append("foreignObject").attr("class","markmap-foreign").attr("x",o).attr("y",0).style("opacity",0).on("mousedown",kt).on("dblclick",kt);return e.append("xhtml:div").select((function(t){const e=t.data.state.el.cloneNode(!0);return this.replaceWith(e),e})).attr("xmlns","http://www.w3.org/1999/xhtml"),e}),(t=>t),(t=>t.remove())).attr("width",(t=>Math.max(0,t.ySize-i-2*o))).attr("height",(t=>t.xSize));this.transition(X).style("opacity",1);const O=this.g.selectAll(c("path")).data(p,(t=>t.target.data.state.key)).join((t=>{const e=[k+x.ySize-i,b+x.xSize/2];return t.insert("path","g").attr("class","markmap-link").attr("data-depth",(t=>t.target.data.depth)).attr("data-path",(t=>t.target.data.state.path)).attr("d",f({source:e,target:e}))}),(t=>t),(t=>{const e=[x.y+x.ySize-i,x.x+x.xSize/2];return this.transition(t).attr("d",f({source:e,target:e})).remove()}));this.transition(O).attr("stroke",(t=>l(t.target.data))).attr("stroke-width",(t=>xt(t.target))).attr("d",(t=>{const e=t.source,n=t.target,r=[e.y+e.ySize-i,e.x+e.xSize/2],o=[n.y,n.x+n.xSize/2];return f({source:r,target:o})})),u.forEach((t=>{t.data.state.x0=t.x,t.data.state.y0=t.y}))}transition(t){const{duration:e}=this.options;return t.transition().duration(e)}async fit(){const t=this.svg.node(),{width:n,height:r}=t.getBoundingClientRect(),{fitRatio:i}=this.options,{minX:o,maxX:a,minY:l,maxY:c}=this.state,h=c-l,d=a-o,u=Math.min(n/h*i,r/d*i,2),p=e.zoomIdentity.translate((n-h*u)/2-l*u,(r-d*u)/2-o*u).scale(u);return this.transition(this.svg).call(this.zoom.transform,p).end().catch(s)}async ensureView(t,n){let r;if(this.g.selectAll(c("g")).each((function(e){e.data===t&&(r=e)})),!r)return;const i=this.svg.node(),{spacingHorizontal:o}=this.options,a=i.getBoundingClientRect(),l=e.zoomTransform(i),[h,d]=[r.y,r.y+r.ySize-o+2].map((t=>t*l.k+l.x)),[u,p]=[r.x-r.xSize/2,r.x+r.xSize/2].map((t=>t*l.k+l.y)),f=$({left:0,right:0,top:0,bottom:0},n),m=[f.left-h,a.width-f.right-d],g=[f.top-u,a.height-f.bottom-p],y=m[0]*m[1]>0?bt(m,Math.abs)/l.k:0,v=g[0]*g[1]>0?bt(g,Math.abs)/l.k:0;if(y||v){const t=l.translate(y,v);return this.transition(this.svg).call(this.zoom.transform,t).end().catch(s)}}async rescale(t){const n=this.svg.node(),{width:r,height:i}=n.getBoundingClientRect(),o=r/2,a=i/2,l=e.zoomTransform(n),c=l.translate((o-l.x)*(1-t)/l.k,(a-l.y)*(1-t)/l.k).scale(t);return this.transition(this.svg).call(this.zoom.transform,c).end().catch(s)}destroy(){this.svg.on(".zoom",null),this.svg.html(null),this.revokers.forEach((t=>{t()}))}static create(t,e,n=null){const r=new Et(t,e);return n&&(r.setData(n),r.fit()),r}}Et.defaultOptions={autoFit:!1,color:t=>{var e;return St(`${(null==(e=t.state)?void 0:e.path)||""}`)},duration:500,embedGlobalCSS:!0,fitRatio:.95,maxWidth:0,nodeMinHeight:16,paddingX:8,scrollForPan:wt,spacingHorizontal:80,spacingVertical:5,initialExpandLevel:-1,zoom:!0,pan:!0,toggleRecursively:!1},t.Markmap=Et,t.defaultColorFn=St,t.deriveOptions=function(t){const n={},r=$({},t),{color:i,colorFreezeLevel:o}=r;if(1===(null==i?void 0:i.length)){const t=i[0];n.color=()=>t}else if(null!=i&&i.length){const t=e.scaleOrdinal(i);n.color=e=>t(`${e.state.path}`)}if(o){const t=n.color||Et.defaultOptions.color;n.color=e=>(e=$({},e,{state:$({},e.state,{path:e.state.path.split(".").slice(0,o).join(".")})}),t(e))}return["duration","maxWidth","initialExpandLevel"].forEach((t=>{const e=r[t];"number"==typeof e&&(n[t]=e)})),["zoom","pan"].forEach((t=>{const e=r[t];null!=e&&(n[t]=!!e)})),n},t.globalCSS=vt,t.loadCSS=function(t){for(const e of t)M(e)},t.loadJS=async function(t,e){t.forEach((t=>{var e;"script"===t.type&&null!=(e=t.data)&&e.src&&C(t.data.src)})),e=n({getMarkmap:()=>window.markmap},e);for(const n of t)await A(n,e)},t.refreshHook=zt}(this.markmap=this.markmap||{},d3);
//# sourceMappingURL=/sm/0f554b33585fd35e66c0de27b9aa466199bf71ccff1ec351e576fecbd0d18f15.map