!function(e){function t(e){delete installedChunks[e]}function n(e){var t=document.getElementsByTagName("head")[0],n=document.createElement("script");n.type="text/javascript",n.charset="utf-8",n.src=p.p+""+e+"."+b+".hot-update.js",t.appendChild(n)}function r(e){return e=e||1e4,new Promise(function(t,n){if("undefined"==typeof XMLHttpRequest)return n(new Error("No browser support"));try{var r=new XMLHttpRequest,o=p.p+""+b+".hot-update.json";r.open("GET",o,!0),r.timeout=e,r.send(null)}catch(e){return n(e)}r.onreadystatechange=function(){if(4===r.readyState)if(0===r.status)n(new Error("Manifest request to "+o+" timed out."));else if(404===r.status)t();else if(200!==r.status&&304!==r.status)n(new Error("Manifest request to "+o+" failed."));else{try{var e=JSON.parse(r.responseText)}catch(e){return void n(e)}t(e)}}})}function o(e){var t=R[e];if(!t)return p;var n=function(n){return t.hot.active?(R[n]?R[n].parents.indexOf(e)<0&&R[n].parents.push(e):(j=[e],v=n),t.children.indexOf(n)<0&&t.children.push(n)):(console.warn("[HMR] unexpected require("+n+") from disposed module "+e),j=[]),p(n)};for(var r in p)Object.prototype.hasOwnProperty.call(p,r)&&"e"!==r&&Object.defineProperty(n,r,function(e){return{configurable:!0,enumerable:!0,get:function(){return p[e]},set:function(t){p[e]=t}}}(r));return n.e=function(e){function t(){M--,"prepare"===P&&(A[e]||l(e),0===M&&0===D&&u())}return"ready"===P&&c("prepare"),M++,p.e(e).then(t,function(e){throw t(),e})},n}function i(e){var t={_acceptedDependencies:{},_declinedDependencies:{},_selfAccepted:!1,_selfDeclined:!1,_disposeHandlers:[],_main:v!==e,active:!0,accept:function(e,n){if(void 0===e)t._selfAccepted=!0;else if("function"==typeof e)t._selfAccepted=e;else if("object"==typeof e)for(var r=0;r<e.length;r++)t._acceptedDependencies[e[r]]=n||function(){};else t._acceptedDependencies[e]=n||function(){}},decline:function(e){if(void 0===e)t._selfDeclined=!0;else if("object"==typeof e)for(var n=0;n<e.length;n++)t._declinedDependencies[e[n]]=!0;else t._declinedDependencies[e]=!0},dispose:function(e){t._disposeHandlers.push(e)},addDisposeHandler:function(e){t._disposeHandlers.push(e)},removeDisposeHandler:function(e){var n=t._disposeHandlers.indexOf(e);n>=0&&t._disposeHandlers.splice(n,1)},check:d,apply:f,status:function(e){if(!e)return P;_.push(e)},addStatusHandler:function(e){_.push(e)},removeStatusHandler:function(e){var t=_.indexOf(e);t>=0&&_.splice(t,1)},data:E[e]};return v=void 0,t}function c(e){P=e;for(var t=0;t<_.length;t++)_[t].call(null,e)}function a(e){return+e+""===e?+e:e}function d(e){if("idle"!==P)throw new Error("check() is only allowed in idle status");return m=e,c("check"),r(x).then(function(e){if(!e)return c("idle"),null;H={},A={},I=e.c,w=e.h,c("prepare");var t=new Promise(function(e,t){y={resolve:e,reject:t}});g={};return l(0),"prepare"===P&&0===M&&0===D&&u(),t})}function s(e,t){if(I[e]&&H[e]){H[e]=!1;for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(g[n]=t[n]);0==--D&&0===M&&u()}}function l(e){I[e]?(H[e]=!0,D++,n(e)):A[e]=!0}function u(){c("ready");var e=y;if(y=null,e)if(m)Promise.resolve().then(function(){return f(m)}).then(function(t){e.resolve(t)},function(t){e.reject(t)});else{var t=[];for(var n in g)Object.prototype.hasOwnProperty.call(g,n)&&t.push(a(n));e.resolve(t)}}function f(n){function r(e,t){for(var n=0;n<t.length;n++){var r=t[n];e.indexOf(r)<0&&e.push(r)}}if("ready"!==P)throw new Error("apply() is only allowed in ready status");n=n||{};var o,i,d,s,l,u={},f=[],h={},v=function(){console.warn("[HMR] unexpected require("+m.moduleId+") to disposed module")};for(var y in g)if(Object.prototype.hasOwnProperty.call(g,y)){l=a(y);var m;m=g[y]?function(e){for(var t=[e],n={},o=t.slice().map(function(e){return{chain:[e],id:e}});o.length>0;){var i=o.pop(),c=i.id,a=i.chain;if((s=R[c])&&!s.hot._selfAccepted){if(s.hot._selfDeclined)return{type:"self-declined",chain:a,moduleId:c};if(s.hot._main)return{type:"unaccepted",chain:a,moduleId:c};for(var d=0;d<s.parents.length;d++){var l=s.parents[d],u=R[l];if(u){if(u.hot._declinedDependencies[c])return{type:"declined",chain:a.concat([l]),moduleId:c,parentId:l};t.indexOf(l)>=0||(u.hot._acceptedDependencies[c]?(n[l]||(n[l]=[]),r(n[l],[c])):(delete n[l],t.push(l),o.push({chain:a.concat([l]),id:l})))}}}}return{type:"accepted",moduleId:e,outdatedModules:t,outdatedDependencies:n}}(l):{type:"disposed",moduleId:y};var x=!1,O=!1,_=!1,D="";switch(m.chain&&(D="\nUpdate propagation: "+m.chain.join(" -> ")),m.type){case"self-declined":n.onDeclined&&n.onDeclined(m),n.ignoreDeclined||(x=new Error("Aborted because of self decline: "+m.moduleId+D));break;case"declined":n.onDeclined&&n.onDeclined(m),n.ignoreDeclined||(x=new Error("Aborted because of declined dependency: "+m.moduleId+" in "+m.parentId+D));break;case"unaccepted":n.onUnaccepted&&n.onUnaccepted(m),n.ignoreUnaccepted||(x=new Error("Aborted because "+l+" is not accepted"+D));break;case"accepted":n.onAccepted&&n.onAccepted(m),O=!0;break;case"disposed":n.onDisposed&&n.onDisposed(m),_=!0;break;default:throw new Error("Unexception type "+m.type)}if(x)return c("abort"),Promise.reject(x);if(O){h[l]=g[l],r(f,m.outdatedModules);for(l in m.outdatedDependencies)Object.prototype.hasOwnProperty.call(m.outdatedDependencies,l)&&(u[l]||(u[l]=[]),r(u[l],m.outdatedDependencies[l]))}_&&(r(f,[m.moduleId]),h[l]=v)}var M=[];for(i=0;i<f.length;i++)l=f[i],R[l]&&R[l].hot._selfAccepted&&M.push({module:l,errorHandler:R[l].hot._selfAccepted});c("dispose"),Object.keys(I).forEach(function(e){!1===I[e]&&t(e)});for(var A,H=f.slice();H.length>0;)if(l=H.pop(),s=R[l]){var k={},S=s.hot._disposeHandlers;for(d=0;d<S.length;d++)(o=S[d])(k);for(E[l]=k,s.hot.active=!1,delete R[l],d=0;d<s.children.length;d++){var T=R[s.children[d]];T&&((A=T.parents.indexOf(l))>=0&&T.parents.splice(A,1))}}var U,q;for(l in u)if(Object.prototype.hasOwnProperty.call(u,l)&&(s=R[l]))for(q=u[l],d=0;d<q.length;d++)U=q[d],(A=s.children.indexOf(U))>=0&&s.children.splice(A,1);c("apply"),b=w;for(l in h)Object.prototype.hasOwnProperty.call(h,l)&&(e[l]=h[l]);var C=null;for(l in u)if(Object.prototype.hasOwnProperty.call(u,l)){s=R[l],q=u[l];var N=[];for(i=0;i<q.length;i++)U=q[i],o=s.hot._acceptedDependencies[U],N.indexOf(o)>=0||N.push(o);for(i=0;i<N.length;i++){o=N[i];try{o(q)}catch(e){n.onErrored&&n.onErrored({type:"accept-errored",moduleId:l,dependencyId:q[i],error:e}),n.ignoreErrored||C||(C=e)}}}for(i=0;i<M.length;i++){var L=M[i];l=L.module,j=[l];try{p(l)}catch(e){if("function"==typeof L.errorHandler)try{L.errorHandler(e)}catch(t){n.onErrored&&n.onErrored({type:"self-accept-error-handler-errored",moduleId:l,error:t,orginalError:e}),n.ignoreErrored||C||(C=t),C||(C=e)}else n.onErrored&&n.onErrored({type:"self-accept-errored",moduleId:l,error:e}),n.ignoreErrored||C||(C=e)}}return C?(c("fail"),Promise.reject(C)):(c("idle"),new Promise(function(e){e(f)}))}function p(t){if(R[t])return R[t].exports;var n=R[t]={i:t,l:!1,exports:{},hot:i(t),parents:(O=j,j=[],O),children:[]};return e[t].call(n.exports,n,n.exports,o(t)),n.l=!0,n.exports}var h=this.webpackHotUpdate;this.webpackHotUpdate=function(e,t){s(e,t),h&&h(e,t)};var v,y,g,w,m=!0,b="b251681f6660d32e9159",x=1e4,E={},j=[],O=[],_=[],P="idle",D=0,M=0,A={},H={},I={},R={};p.m=e,p.c=R,p.d=function(e,t,n){p.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:n})},p.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return p.d(t,"a",t),t},p.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},p.p="",p.h=function(){return b},o("./src/app.js")(p.s="./src/app.js")}({"./src/app.js":function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function o(){return Math.floor(9*Math.random()+0)}function i(){v=[],p.canvasResize(),m=o(),x=void 0,E=void 0,b=0;for(var e=u.width/9-u.width/200,t=u.height/18-u.height/400,n=0;n<9;n++){var r=new h(-Math.PI/8*n,e*(n+1),t*(n+1),4+2*n,2e3+2e3*n,{main:y[n],ui:"#644D52"},n);v.push(r)}}function c(e){f.clearRect(0,0,u.width,u.height),p.bg(),p.centerDot();for(var t=0;t<v.length;t++)v[t].draw(e);w?p.text("Pleas Click On "+g[m]):p.text("SOLAR"),p.score("Your Score: "+b),x&&p.floatText(x),requestAnimationFrame(c)}var a=n("./src/js/ui.js"),d=r(a),s=n("./src/js/planet.js"),l=r(s),u=document.querySelector("canvas"),f=u.getContext("2d"),p=(0,d.default)(u,f),h=(0,l.default)(u,f),v=[],y=["#f99777","#f77c52","#f55c29","#ea430b","#c33809","#9c2c07","#752106","#4e1604","#2c1204"],g=["MERCURY","VENUS","EARTH","MARS","CERES","JUPITER","SATURN","URANUS","NEPTUNE"],w=!1,m=void 0,b=0,x=void 0,E=void 0;addEventListener("resize",function(){p.canvasResize(),i()}),u.addEventListener("click",function(e){for(var t=e.clientX,n=e.clientY,r=!1,i=0;i<9;i++)v[i].onClikCheck(t,n)&&i===m&&(r=!0);r?(b++,x="Good! :)"):(b=0,x="Bad! :("),clearTimeout(E),E=setTimeout(function(){return x=void 0},1e3),m=o()}),i(),requestAnimationFrame(c),setTimeout(function(){return w=!0},1500)},"./src/js/planet.js":function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t){var n=function(e,t,n,r,o,i,c){this.startAngle=e,this.width=t,this.height=n,this.radius=r,this.speed=o,this.colorMain=i.main,this.colorUi=i.ui,this.x=null,this.y=null,this.i=c};return n.prototype.getElipe=function(t){t+=this.startAngle;var n=e.width/2+Math.cos(t)*this.width/2,r=e.height/2+Math.sin(t)*this.height/2;return this.x=n,this.y=r,{x:n,y:r}},n.prototype.drawElipe=function(){e.width,e.height;t.beginPath(),t.setLineDash([5,3]);for(var n=-5;n<360;n+=5){var r=this.getElipe(n*Math.PI/180);t.lineTo(r.x,r.y)}t.strokeStyle=this.colorUi,t.stroke(),t.closePath()},n.prototype.draw=function(e){this.drawElipe();var n=this.getElipe(2*Math.PI*e/this.speed);t.beginPath(),t.arc(n.x,n.y,this.radius,0,2*Math.PI),t.fillStyle=this.colorMain,t.fill(),t.closePath()},n.prototype.onClikCheck=function(e,t){return Math.sqrt(Math.pow(e-this.x,2)+Math.pow(t-this.y,2))<=this.radius+5},n}},"./src/js/ui.js":function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t){function n(){e.height=innerHeight,e.width=innerWidth}return{canvasResize:n,centerDot:function(){t.beginPath(),t.arc(e.width/2,e.height/2,8,0,2*Math.PI),t.fillStyle="#fff",t.fill(),t.closePath()},bg:function(){t.fillStyle="#332532",t.fillRect(0,0,e.width,e.height)},text:function(n){t.textAlign="center",t.font="42px Roboto",t.fillStyle="#e1d7c3",t.fillText(n,e.width/2,e.height/6)},score:function(n){t.textAlign="right",t.font="18px Roboto",t.fillStyle="#e1d7c3",t.fillText(n,e.width-e.width/16,e.height-e.height/16)},floatText:function(n){t.textAlign="left",t.font="18px Roboto",t.fillStyle="#e1d7c3",t.fillText(n,e.width/16,e.height-e.height/16)}}}}});