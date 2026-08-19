import{jsx as _jsx,jsxs as _jsxs}from"react/jsx-runtime";import*as React from"react";import{addPropertyControls,ControlType,useIsStaticRenderer}from"framer";import*as THREE from"three";import*as GsapModule from"gsap";const gsap=GsapModule.gsap??GsapModule.default??GsapModule;function toPlainText(value){if(value==null)return"";return String(value).replace(/<[^>]*>/g,"").replace(/&nbsp;/gi," ").replace(/&amp;/gi,"&").replace(/&lt;/gi,"<").replace(/&gt;/gi,">").replace(/&quot;/gi,'"').replace(/&#39;/g,"'").trim();}const fragmentShader=`
    #define PI 3.14159265
    precision highp float;
    varying vec2 vUv;
    uniform sampler2D uTex;
    uniform vec2  uRes;
    uniform vec2  uCenter;
    uniform float uSizeX;
    uniform float uSizeY;
    uniform float uAspect;
    uniform float uZoom;
    uniform float uDispersion;
    uniform float uBlur;
    uniform float uGlow;
    uniform float uWhiteGlow;
    uniform float uNovaSize;
    uniform float uBlueRing;
    uniform float uRingRadius;
    uniform float uRingWidth;
    uniform float uShimmer;
    uniform float uShimmerFreq;
    uniform float uShimmerSpeed;
    uniform float uShimmerDepth;
    uniform float uTime;
    uniform float uRimStart;
    uniform float uRimTangential;
    uniform float uRimInward;
    uniform float uRimFreq1;
    uniform float uRimFreq2;
    uniform vec3  uBlueColor;
    uniform float uRimLine;
    uniform float uRimLinePos;
    uniform float uRimLineWidth;
    uniform float uShape;
    uniform float uSquareRound;
    uniform float uRotation;
    uniform int   uSamples;

    const int MAX_SAMPLES = 16;

    float sdRoundBox(vec2 p, vec2 b, float r) {
        vec2 q = abs(p) - b + r;
        return min(max(q.x, q.y), 0.0) + length(max(q, 0.0)) - r;
    }

    vec3 glassLens(vec2 center, float aspectCorrect, out float outA) {
        vec2 p = vUv - center;
        p.x *= aspectCorrect;
        float ca = cos(uRotation), sa = sin(uRotation);
        p = mat2(ca, -sa, sa, ca) * p;
        vec2 halfSize = vec2(uSizeX, uSizeY);
        float dist = length(p / halfSize);
        outA = 0.0;

        float maskND;
        if (uShape > 0.5) {
            float corner = min(uSizeX, uSizeY) * clamp(uSquareRound, 0.0, 1.0);
            float sd = sdRoundBox(p, halfSize, corner);
            maskND = 1.0 + sd / min(uSizeX, uSizeY);
        } else {
            maskND = dist;
        }

        if (maskND > 1.0) return vec3(0.0);

        float shapeND = clamp(maskND, 0.0, 1.0);
        float nd = clamp(dist, 0.0, 1.0);
        vec2 offset = vUv - center;
        vec2 radialDir = normalize(offset + 1e-6);
        vec2 tangentDir = vec2(-radialDir.y, radialDir.x);
        float angle = atan(p.y, p.x);

        float pull = uZoom * 0.30 * nd * nd;
        float rimStrength = smoothstep(uRimStart, 1.0, nd);
        float fluidWave = sin(angle * uRimFreq1) * 0.55 +
                          sin(angle * uRimFreq2) * 0.25;
        float rScreen = (uSizeX + uSizeY) * 0.5;

        vec2 rimOff = tangentDir * fluidWave * rimStrength *
                      rScreen * uRimTangential;
        vec2 rimPull = -radialDir * rimStrength * rScreen * uRimInward;
        vec2 baseUV = center + offset * (1.0 - pull) + rimOff + rimPull;

        float rimMask = smoothstep(0.55, 1.0, nd);
        vec2 dispDir = offset * uDispersion * 0.004 * rimMask;

        int count = uSamples;
        if (count < 2) count = 2;
        if (count > MAX_SAMPLES) count = MAX_SAMPLES;

        vec3 col = vec3(0.0);
        vec3 caW = vec3(0.0);

        for (int i = 0; i < MAX_SAMPLES; i++) {
            if (i >= count) break;

            float t = float(i) / float(count - 1);
            vec2 sUV = baseUV + dispDir * (t - 0.5);
            vec3 sampleColor = texture2D(uTex, sUV).rgb;

            vec3 weight = vec3(
                exp(-pow((t - 0.00) / 0.38, 2.0)),
                exp(-pow((t - 0.50) / 0.38, 2.0)),
                exp(-pow((t - 1.00) / 0.38, 2.0))
            );

            col += sampleColor * weight;
            caW += weight;
        }

        col /= max(caW, vec3(0.001));

        float blurFade = 1.0 - smoothstep(0.72, 0.98, nd);

        if (uBlur > 0.01 && blurFade > 0.01) {
            vec2 blurRad = vec2(uBlur) / uRes * blurFade;
            vec3 bcol = vec3(0.0);
            float totalWeight = 0.0;

            for (float a = 0.0; a < PI * 2.0; a += PI * 2.0 / 6.0) {
                for (float rr = 0.4; rr <= 1.001; rr += 0.3) {
                    vec2 o = vec2(cos(a), sin(a)) * blurRad * rr;
                    float weight = 1.0 - rr * 0.38;
                    bcol += texture2D(uTex, baseUV + o).rgb * weight;
                    totalWeight += weight;
                }
            }

            col = mix(bcol / totalWeight, col, rimMask);
        }

        col *= mix(0.91, 1.0, smoothstep(0.0, 0.38, shapeND));

        float r2 = shapeND * shapeND * 0.25;
        float gs = max(uNovaSize * uGlow * 0.003, 0.004);
        float nova = exp(-r2 / gs) + exp(-r2 / (gs * 7.0)) * 0.18;

        nova *= uWhiteGlow * (uGlow / 17.0) * 1.15;
        col += vec3(nova);

        float dC = shapeND * 0.5;
        float tR = clamp(uRingRadius, 0.1, 0.49);
        float rW = max(uRingWidth, 0.003);

        float ring = exp(-pow((dC - tR) / rW, 2.0));
        ring *= uBlueRing * (uGlow / 17.0) * 1.8;

        if (uShimmer > 0.5) {
            ring *= sin(angle * uShimmerFreq + uTime * uShimmerSpeed) *
                    uShimmerDepth + (1.0 - uShimmerDepth);
        }

        float aura = exp(-pow((dC - tR) / (rW * 6.0), 2.0)) *
                     0.28 * uBlueRing * (uGlow / 17.0);

        col += uBlueColor * (ring + aura);

        col += vec3(
            exp(
                -pow(
                    (dC - uRimLinePos) /
                    max(uRimLineWidth, 0.0001),
                    2.0
                )
            ) * uRimLine
        );

        outA = smoothstep(1.0, 0.93, maskND);

        return col;
    }

    void main() {
        vec3 outputColor = texture2D(uTex, vUv).rgb;
        float alpha = 0.0;
        vec3 lensColor = glassLens(uCenter, uAspect, alpha);
        outputColor = mix(outputColor, lensColor, alpha);
        gl_FragColor = vec4(outputColor, 1.0);
    }
`;function makePlaceholderTexture(index,label){const canvas=document.createElement("canvas");canvas.width=1200;canvas.height=800;const ctx=canvas.getContext("2d");const hue=(index*47+210)%360;const gradient=ctx.createLinearGradient(0,0,1200,800);gradient.addColorStop(0,`hsl(${hue}, 72%, 58%)`);gradient.addColorStop(1,`hsl(${(hue+80)%360}, 70%, 22%)`);ctx.fillStyle=gradient;ctx.fillRect(0,0,canvas.width,canvas.height);ctx.fillStyle="rgba(255,255,255,.92)";ctx.font="600 66px Arial, sans-serif";ctx.textAlign="center";ctx.textBaseline="middle";ctx.fillText(toPlainText(label)||`Project ${index+1}`,600,400);const texture=new THREE.CanvasTexture(canvas);texture.colorSpace=THREE.SRGBColorSpace;texture.needsUpdate=true;return texture;}function createCarousel(mount,options){const{projects,propsRef,cursorElement,staticMode,onActiveChange,onFocusChange,onEntryDone}=options;const cfg=()=>propsRef.current;const sourceProjects=projects.length?projects:[{brand:"Project One",description:"Add your own image"},{brand:"Project Two",description:"Add your own image"},{brand:"Project Three",description:"Add your own image"}];let W=Math.max(1,mount.clientWidth);let H=Math.max(1,mount.clientHeight);const renderer=new THREE.WebGLRenderer({antialias:true,alpha:true});const dpr=Math.min(window.devicePixelRatio||1,cfg().pixelRatio);renderer.setPixelRatio(dpr);renderer.setSize(W,H);renderer.setClearColor(new THREE.Color(cfg().background),1);renderer.domElement.style.width="100%";renderer.domElement.style.height="100%";renderer.domElement.style.display="block";renderer.domElement.style.touchAction="none";mount.style.touchAction="none";mount.appendChild(renderer.domElement);/** Fit panel size to the current container (mobile + desktop). */const panelHeightPx=()=>{const base=cfg().panelHeight;const byHeight=H*.48;const byWidth=W*.78;return Math.max(110,Math.min(base,byHeight,byWidth));};const gapPx=()=>{const scale=panelHeightPx()/Math.max(1,cfg().panelHeight);return Math.max(6,cfg().gap*Math.min(1,scale));};const scene=new THREE.Scene;const camera=new THREE.OrthographicCamera(-W/2,W/2,H/2,-H/2,-100,100);camera.position.z=10;const textureLoader=new THREE.TextureLoader;textureLoader.setCrossOrigin("anonymous");let userInteracted=false;const sources=sourceProjects.map((project,index)=>{const source={texture:null,aspect:1.5,bound:false};const imageUrl=project.image?.src;if(imageUrl){textureLoader.load(imageUrl,texture=>{texture.minFilter=THREE.LinearMipmapLinearFilter;texture.generateMipmaps=true;texture.anisotropy=renderer.capabilities.getMaxAnisotropy();texture.colorSpace=THREE.SRGBColorSpace;source.aspect=texture.image.width/texture.image.height;source.texture=texture;recomputeTotal();if(!userInteracted){scroll=centerForIndex(0);target=scroll;}if(staticMode)renderFrame();},undefined,()=>{source.texture=makePlaceholderTexture(index,project.brand);if(staticMode)renderFrame();});}else{source.texture=makePlaceholderTexture(index,project.brand);}return source;});const slotWidth=i=>sources[i].aspect*panelHeightPx()+gapPx();let offsets=[];let totalWidth=0;function recomputeTotal(){offsets=[];let sum=0;sources.forEach((_,index)=>{offsets.push(sum);sum+=slotWidth(index);});totalWidth=Math.max(sum,1);}recomputeTotal();function centerForIndex(index){const count=sources.length;const loop=Math.floor(index/count);const sourceIndex=(index%count+count)%count;return offsets[sourceIndex]+slotWidth(sourceIndex)/2-gapPx()/2+loop*totalWidth;}function nearestIndex(value){let best=0;let bestDistance=Infinity;for(let i=0;i<sources.length;i++){const center=offsets[i]+slotWidth(i)/2-gapPx()/2;const loop=Math.round((value-center)/totalWidth);const distance=Math.abs(center+loop*totalWidth-value);if(distance<bestDistance){bestDistance=distance;best=i+loop*sources.length;}}return best;}function centerSourceIndex(value){let best=0;let bestDistance=Infinity;for(let i=0;i<sources.length;i++){const center=offsets[i]+slotWidth(i)/2-gapPx()/2;const loop=Math.round((value-center)/totalWidth);const distance=Math.abs(center+loop*totalWidth-value);if(distance<bestDistance){bestDistance=distance;best=i;}}return best;}const REPEATS=4;const pool=[];for(let repeat=0;repeat<REPEATS;repeat++){for(let i=0;i<sources.length;i++){const material=new THREE.MeshBasicMaterial({color:14540253,transparent:true});const mesh=new THREE.Mesh(new THREE.PlaneGeometry(1,1),material);mesh.visible=false;scene.add(mesh);pool.push({mesh,material,sourceIndex:i});}}let scroll=centerForIndex(0);let target=scroll;let previousScroll=scroll;let scrollEnergy=0;let pendingFocus=null;let lastWheelAt=0;let snapArmed=false;let lastCenter=-1;let rt=new THREE.WebGLRenderTarget(W*dpr,H*dpr);const lensScene=new THREE.Scene;const lensCamera=new THREE.OrthographicCamera(-1,1,1,-1,0,1);const lensUniforms={uTex:{value:rt.texture},uRes:{value:new THREE.Vector2(W*dpr,H*dpr)},uCenter:{value:new THREE.Vector2(cfg().lensX,cfg().lensY)},uSizeX:{value:cfg().lensWidth},uSizeY:{value:cfg().lensHeight},uShape:{value:cfg().lensShape==="square"?1:0},uSquareRound:{value:0},uRotation:{value:0},uAspect:{value:W/H},uZoom:{value:cfg().zoom},uDispersion:{value:cfg().dispersion},uBlur:{value:cfg().blur},uGlow:{value:cfg().glow},uWhiteGlow:{value:.24},uNovaSize:{value:12},uBlueRing:{value:cfg().blueRing},uRingRadius:{value:.49},uRingWidth:{value:.014},uShimmer:{value:cfg().shimmer?1:0},uShimmerFreq:{value:12},uShimmerSpeed:{value:3.5},uShimmerDepth:{value:.12},uTime:{value:0},uRimStart:{value:.578},uRimTangential:{value:cfg().rimWave},uRimInward:{value:0},uRimFreq1:{value:2},uRimFreq2:{value:1},uBlueColor:{value:new THREE.Color(cfg().blueColor)},uRimLine:{value:1.4},uRimLinePos:{value:.488},uRimLineWidth:{value:.003},uSamples:{value:16}};const lensMaterial=new THREE.ShaderMaterial({uniforms:lensUniforms,vertexShader:`
            varying vec2 vUv;

            void main() {
                vUv = uv;
                gl_Position = vec4(position.xy, 0.0, 1.0);
            }
        `,fragmentShader});const lensQuad=new THREE.Mesh(new THREE.PlaneGeometry(2,2),lensMaterial);lensScene.add(lensQuad);const entryEnabled=cfg().entryAnimation&&!staticMode;const focusState={active:false,sourceIndex:-1,poolIndex:-1,lensFx:entryEnabled?0:1,animation:null};const drop=new Array(pool.length).fill(0);const entry=new Array(pool.length).fill(entryEnabled?0:1);const grow=new Array(pool.length).fill(entryEnabled?0:1);const lastCenterX=new Array(pool.length);let focusScale=1;let entryActive=entryEnabled;let entrySettled=false;let entryTimeline=null;let panelRects=[];let centeredPanel=null;function layout(){panelRects=[];centeredPanel=null;let centeredDistance=Infinity;const half=W/2;const currentPanelHeight=panelHeightPx();const currentGap=gapPx();const buffer=currentPanelHeight;pool.forEach((item,poolIndex)=>{const repeat=Math.floor(poolIndex/sources.length);const sourceIndex=item.sourceIndex;const source=sources[sourceIndex];const centerInLoop=offsets[sourceIndex]+slotWidth(sourceIndex)/2-currentGap/2;let x=centerInLoop-scroll;x=(x%totalWidth+totalWidth)%totalWidth;x+=(repeat-Math.floor(REPEATS/2))*totalWidth;if(x>half+totalWidth){x-=totalWidth*REPEATS;}const centerX=x;const inEntry=entryActive||entrySettled;if(!inEntry&&(centerX<-half-buffer||centerX>half+buffer)){item.mesh.visible=false;lastCenterX[poolIndex]=undefined;return;}lastCenterX[poolIndex]=centerX;const shrink=1-.25*scrollEnergy;const height=currentPanelHeight*shrink;const width=source.aspect*currentPanelHeight*shrink;if(source.texture&&!item.bound){item.material.map=source.texture;item.material.color.set(16777215);item.material.needsUpdate=true;item.bound=true;}let y=0;let drawWidth=width;let drawHeight=height;const isFocused=focusState.active&&focusState.poolIndex===poolIndex;if(isFocused){drawWidth*=focusScale;drawHeight*=focusScale;}else if(drop[poolIndex]>0){y=-drop[poolIndex]*H*1.4;}let finalX=centerX;let finalY=y;let finalWidth=drawWidth;let finalHeight=drawHeight;if(inEntry){const p=entry[poolIndex];const g=grow[poolIndex];const entryMin=Math.min(80,currentPanelHeight*.35);const currentHeight=entryMin+(drawHeight-entryMin)*g;finalHeight=currentHeight;finalWidth=currentHeight*source.aspect;const centeredSource=centerSourceIndex(scroll);let distanceIndex=sourceIndex-centeredSource;if(distanceIndex>sources.length/2){distanceIndex-=sources.length;}if(distanceIndex<-sources.length/2){distanceIndex+=sources.length;}const middleRepeat=Math.floor(REPEATS/2);if(repeat!==middleRepeat){item.mesh.visible=false;lastCenterX[poolIndex]=undefined;return;}const currentSlotHeight=s=>entryMin+(currentPanelHeight-entryMin)*grow[middleRepeat*sources.length+s];let offset=0;if(distanceIndex>0){for(let k=0;k<distanceIndex;k++){const a=(centeredSource+k)%sources.length;const b=(centeredSource+k+1)%sources.length;offset+=(sources[a].aspect*currentSlotHeight(a)+sources[b].aspect*currentSlotHeight(b))/2+currentGap;}}else if(distanceIndex<0){for(let k=0;k<-distanceIndex;k++){const a=((centeredSource-k)%sources.length+sources.length)%sources.length;const b=((centeredSource-k-1)%sources.length+sources.length)%sources.length;offset-=(sources[a].aspect*currentSlotHeight(a)+sources[b].aspect*currentSlotHeight(b))/2+currentGap;}}finalX=offset;const below=-H*.9;finalY=below+(y-below)*p;}item.mesh.visible=true;item.mesh.position.set(finalX,finalY,0);item.mesh.scale.set(finalWidth,finalHeight,1);const screenX=centerX+W/2;const screenY=H/2-y;panelRects.push({left:screenX-drawWidth/2,right:screenX+drawWidth/2,top:screenY-drawHeight/2,bottom:screenY+drawHeight/2,poolIndex,sourceIndex,centerX});if(Math.abs(centerX)<centeredDistance){centeredDistance=Math.abs(centerX);centeredPanel={sourceIndex,poolIndex,centerX};}});}function panelAt(x,y){return panelRects.find(rect=>x>=rect.left&&x<=rect.right&&y>=rect.top&&y<=rect.bottom)||null;}const canvas=renderer.domElement;if(cursorElement){gsap.set(cursorElement,{xPercent:20,yPercent:30,scale:0,autoAlpha:0});}const moveX=cursorElement?gsap.quickTo(cursorElement,"x",{duration:.5,ease:"power3.out"}):null;const moveY=cursorElement?gsap.quickTo(cursorElement,"y",{duration:.5,ease:"power3.out"}):null;let overPanel=false;function setView(visible){if(entryActive||entrySettled){visible=false;}canvas.style.cursor=visible?"pointer":"";if(visible===overPanel||!cursorElement){return;}overPanel=visible;gsap.to(cursorElement,{scale:visible?1:0,autoAlpha:visible?1:0,duration:visible?.35:.25,ease:visible?"power3.out":"power3.in"});}function localPointer(event){const rect=canvas.getBoundingClientRect();return{x:event.clientX-rect.left,y:event.clientY-rect.top};}let dragPointerId=null;let dragOriginX=0;let dragOriginTarget=0;let dragMoved=false;let suppressClick=false;function onWheel(event){event.preventDefault();if(focusState.active||entryActive||entrySettled){return;}userInteracted=true;pendingFocus=null;target+=(event.deltaY||event.deltaX)*cfg().wheelSensitivity;lastWheelAt=performance.now();snapArmed=true;}function onPointerDown(event){if(focusState.active||entryActive||entrySettled){return;}if(event.pointerType==="mouse"&&event.button!==0){return;}dragPointerId=event.pointerId;dragOriginX=event.clientX;dragOriginTarget=target;dragMoved=false;userInteracted=true;pendingFocus=null;canvas.setPointerCapture?.(event.pointerId);}function onPointerMove(event){const point=localPointer(event);if(moveX)moveX(point.x);if(moveY)moveY(point.y);if(dragPointerId===event.pointerId){const dx=event.clientX-dragOriginX;if(Math.abs(dx)>6){dragMoved=true;}target=dragOriginTarget-dx*cfg().wheelSensitivity;lastWheelAt=performance.now();snapArmed=true;setView(false);return;}if(focusState.active){return setView(false);}if(event.pointerType==="mouse"){setView(panelAt(point.x,point.y)!==null);}}function onPointerUp(event){if(dragPointerId!==event.pointerId)return;canvas.releasePointerCapture?.(event.pointerId);dragPointerId=null;if(dragMoved){suppressClick=true;lastWheelAt=performance.now();snapArmed=true;}}function onPointerLeave(){if(dragPointerId!==null)return;setView(false);}function onClick(event){if(suppressClick){suppressClick=false;return;}if(focusState.active||entryActive||entrySettled){return;}const point=localPointer(event);const hit=panelAt(point.x,point.y);if(!hit)return;if(centeredPanel&&hit.poolIndex===centeredPanel.poolIndex){openFocus();return;}userInteracted=true;target=centerForIndex(nearestIndex(scroll+hit.centerX));pendingFocus={sourceIndex:hit.sourceIndex};setView(false);}function openFocus(){if(focusState.active||!centeredPanel){return;}focusState.active=true;focusState.sourceIndex=centeredPanel.sourceIndex;focusState.poolIndex=centeredPanel.poolIndex;target=centerForIndex(nearestIndex(scroll));const focusX=lastCenterX[focusState.poolIndex]||0;const others=pool.map((_,index)=>({index,x:lastCenterX[index]})).filter(item=>item.index!==focusState.poolIndex&&item.x!==undefined).map(item=>({...item,distance:Math.abs(item.x-focusX)})).sort((a,b)=>a.distance-b.distance);let rank=0;let previousDistance=-1;const ranked=others.map(item=>{if(previousDistance>=0&&item.distance-previousDistance>1){rank++;}previousDistance=item.distance;return{index:item.index,rank};});focusState.animation?.kill();const timeline=gsap.timeline();timeline.to(focusState,{lensFx:0,duration:.85,ease:"power3.out"},0);const scaleState={value:focusScale};timeline.to(scaleState,{value:cfg().focusScale,duration:.9,ease:"power3.out",onUpdate:()=>focusScale=scaleState.value},0);ranked.forEach(item=>{timeline.to(drop,{[item.index]:1,duration:.7,ease:"power4.out"},item.rank*.06);});focusState.animation=timeline;setView(false);onFocusChange(true);}function closeFocus(){if(!focusState.active)return;focusState.animation?.kill();onFocusChange(false);const focusX=lastCenterX[focusState.poolIndex]||0;const others=pool.map((_,index)=>({index,x:lastCenterX[index]})).filter(item=>item.x!==undefined&&(drop[item.index]||0)>0).map(item=>({...item,distance:Math.abs(item.x-focusX)})).sort((a,b)=>b.distance-a.distance);const timeline=gsap.timeline({onComplete:()=>{focusState.active=false;focusState.sourceIndex=-1;}});timeline.to(focusState,{lensFx:1,duration:.68,ease:"power3.inOut"},0);const scaleState={value:focusScale};timeline.to(scaleState,{value:1,duration:.76,ease:"power3.out",onUpdate:()=>focusScale=scaleState.value},0);others.forEach((item,index)=>{timeline.to(drop,{[item.index]:0,duration:.6,ease:"power4.out"},index*.035);});focusState.animation=timeline;}function playEntry(){if(!entryEnabled){onEntryDone(true);return;}entryTimeline?.kill();entry.fill(0);grow.fill(0);entryActive=true;entrySettled=false;focusState.lensFx=0;onEntryDone(false);target=centerForIndex(nearestIndex(scroll));scroll=target;layout();const visible=lastCenterX.map((x,index)=>x===undefined?-1:index).filter(index=>index>=0);const timeline=gsap.timeline({delay:.5});const spread=.07*Math.max(visible.length-1,1);let lastRiseEnd=0;visible.forEach(index=>{const at=Math.random()*spread;lastRiseEnd=Math.max(lastRiseEnd,at+1);timeline.to(entry,{[index]:1,duration:1,ease:"power3.out"},at);});timeline.call(()=>{entryActive=false;entrySettled=true;},undefined,lastRiseEnd);const center=centerSourceIndex(scroll);const middleRepeat=Math.floor(REPEATS/2);const growList=[];let maxRank=0;for(let i=0;i<sources.length;i++){let distance=i-center;if(distance>sources.length/2){distance-=sources.length;}if(distance<-sources.length/2){distance+=sources.length;}const distanceRank=Math.abs(distance);maxRank=Math.max(maxRank,distanceRank);growList.push({index:middleRepeat*sources.length+i,distanceRank});}const growStart=lastRiseEnd+.25;let growEnd=growStart;timeline.to(focusState,{lensFx:1,duration:1.4,ease:"power2.inOut"},growStart);growList.forEach(item=>{const rank=maxRank-item.distanceRank;const at=growStart+rank*.085;growEnd=Math.max(growEnd,at+2.15);timeline.to(grow,{[item.index]:1,duration:2.15,ease:"expo.inOut"},at);});timeline.call(()=>{entrySettled=false;grow.fill(1);onEntryDone(true);},undefined,growEnd);entryTimeline=timeline;}canvas.addEventListener("wheel",onWheel,{passive:false});canvas.addEventListener("pointerdown",onPointerDown);canvas.addEventListener("pointermove",onPointerMove);canvas.addEventListener("pointerup",onPointerUp);canvas.addEventListener("pointercancel",onPointerUp);canvas.addEventListener("pointerleave",onPointerLeave);canvas.addEventListener("click",onClick);let raf=0;function renderFrame(){const values=cfg();renderer.setClearColor(new THREE.Color(values.background),1);if(values.snap&&snapArmed&&!focusState.active&&Math.abs(target-scroll)<values.snapDistance&&performance.now()-lastWheelAt>values.snapDelay){target=centerForIndex(nearestIndex(target));snapArmed=false;}scroll+=(target-scroll)*values.glide;const centerIndex=centerSourceIndex(scroll);if(centerIndex!==lastCenter){lastCenter=centerIndex;onActiveChange(centerIndex);}const speed=scroll-previousScroll;previousScroll=scroll;const normalized=Math.min(1,Math.abs(speed)/Math.max(1,values.speedShrink));const energyEase=normalized>scrollEnergy?.25:.06;scrollEnergy+=(normalized-scrollEnergy)*energyEase;layout();if(pendingFocus&&!focusState.active&&Math.abs(target-scroll)<.5){const pending=pendingFocus;pendingFocus=null;if(centeredPanel&&centeredPanel.sourceIndex===pending.sourceIndex){openFocus();}}lensUniforms.uCenter.value.set(values.lensX,values.lensY);lensUniforms.uSizeX.value=values.lensWidth;lensUniforms.uSizeY.value=values.lensHeight;lensUniforms.uShape.value=values.lensShape==="square"?1:0;lensUniforms.uRotation.value=values.lensRotation*Math.PI/180;lensUniforms.uAspect.value=W/H;lensUniforms.uTime.value=performance.now()*.001;lensUniforms.uBlur.value=values.blur;lensUniforms.uGlow.value=values.glow;lensUniforms.uShimmer.value=values.shimmer?1:0;lensUniforms.uBlueColor.value.set(values.blueColor);const fx=focusState.lensFx;lensUniforms.uDispersion.value=values.dispersion*fx;lensUniforms.uBlueRing.value=values.blueRing*fx;lensUniforms.uRimLine.value=1.4*fx;lensUniforms.uZoom.value=values.zoom*fx;lensUniforms.uRimTangential.value=values.rimWave*fx;renderer.setRenderTarget(rt);renderer.render(scene,camera);renderer.setRenderTarget(null);renderer.render(lensScene,lensCamera);}function tick(){renderFrame();raf=requestAnimationFrame(tick);}if(staticMode){renderFrame();}else{tick();}playEntry();function onResize(){W=Math.max(1,mount.clientWidth);H=Math.max(1,mount.clientHeight);renderer.setSize(W,H);camera.left=-W/2;camera.right=W/2;camera.top=H/2;camera.bottom=-H/2;camera.updateProjectionMatrix();rt.setSize(W*dpr,H*dpr);lensUniforms.uRes.value.set(W*dpr,H*dpr);recomputeTotal();if(staticMode){renderFrame();}}const resizeObserver=new ResizeObserver(onResize);resizeObserver.observe(mount);function destroy(){try{cancelAnimationFrame(raf);resizeObserver.disconnect();canvas.removeEventListener("wheel",onWheel);canvas.removeEventListener("pointerdown",onPointerDown);canvas.removeEventListener("pointermove",onPointerMove);canvas.removeEventListener("pointerup",onPointerUp);canvas.removeEventListener("pointercancel",onPointerUp);canvas.removeEventListener("pointerleave",onPointerLeave);canvas.removeEventListener("click",onClick);focusState.animation?.kill();entryTimeline?.kill();if(cursorElement){gsap.killTweensOf(cursorElement);}renderer.dispose();rt.dispose();lensQuad.geometry.dispose();lensMaterial.dispose();pool.forEach(item=>{item.mesh.geometry.dispose();item.material.dispose();});sources.forEach(source=>source.texture?.dispose());renderer.domElement.remove();}catch(error){console.error("LiquidGlassCarousel cleanup failed",error);}}return{closeFocus,destroy};}export default function LiquidGlassCarousel(props){const{projects,background,foreground,showLabels,showCursor,font,style}=props;const mountRef=React.useRef(null);const cursorRef=React.useRef(null);const engineRef=React.useRef(null);const propsRef=React.useRef(props);propsRef.current=props;const staticMode=useIsStaticRenderer();const[active,setActive]=React.useState(0);const[focused,setFocused]=React.useState(false);const[entryDone,setEntryDone]=React.useState(!props.entryAnimation);const[canHover,setCanHover]=React.useState(()=>{if(typeof window==="undefined"||!window.matchMedia){return true;}return window.matchMedia("(hover: hover) and (pointer: fine)").matches;});const projectKey=React.useMemo(()=>projects.map(project=>`${project.image?.src||""}|${project.brand}|${project.description}`).join("::"),[projects]);React.useEffect(()=>{if(typeof window==="undefined"||!window.matchMedia){return;}const media=window.matchMedia("(hover: hover) and (pointer: fine)");const update=()=>setCanHover(media.matches);update();media.addEventListener?.("change",update);return()=>media.removeEventListener?.("change",update);},[]);const[initializationError,setInitializationError]=React.useState(null);const cursorEnabled=showCursor&&canHover;React.useEffect(()=>{if(!mountRef.current)return;setInitializationError(null);try{engineRef.current=createCarousel(mountRef.current,{projects,propsRef,cursorElement:cursorEnabled?cursorRef.current:null,staticMode,onActiveChange:setActive,onFocusChange:setFocused,onEntryDone:setEntryDone});}catch(error){console.error("LiquidGlassCarousel failed to initialize",error);engineRef.current=null;setFocused(false);setEntryDone(true);setInitializationError("The carousel could not initialize its graphics engine.");}return()=>{try{engineRef.current?.destroy();}catch(error){console.error("LiquidGlassCarousel destroy failed",error);}engineRef.current=null;};},[projectKey,cursorEnabled,staticMode,props.panelHeight,props.gap,props.entryAnimation,props.pixelRatio]);const current=projects[active]||{brand:`Project ${active+1}`,description:"Add your project image and copy"};if(initializationError){return /*#__PURE__*/_jsx("div",{role:"status",style:{...style,width:"100%",height:"100%",display:"flex",alignItems:"center",justifyContent:"center",padding:32,boxSizing:"border-box",textAlign:"center",color:foreground,background,...font},children:initializationError});}return /*#__PURE__*/_jsxs("div",{style:{...style,position:"relative",width:"100%",height:"100%",overflow:"hidden",background,color:foreground,touchAction:"none",...font},children:[/*#__PURE__*/_jsx("div",{ref:mountRef,style:{position:"absolute",inset:0,touchAction:"none"}}),showLabels&&/*#__PURE__*/_jsxs("div",{style:{position:"absolute",top:"10%",left:"50%",width:"min(92vw, 520px)",transform:`translate(-50%, ${focused?"-4vh":"0"})`,opacity:entryDone?1:0,transition:"opacity .5s, transform .4s",textAlign:"center",pointerEvents:"none",mixBlendMode:"exclusion",color:"white",whiteSpace:"normal",wordBreak:"break-word",padding:"0 12px",boxSizing:"border-box"},children:[/*#__PURE__*/_jsx("div",{children:toPlainText(current.brand)}),/*#__PURE__*/_jsx("div",{children:toPlainText(current.description)})]}),showLabels&&/*#__PURE__*/_jsxs("div",{style:{position:"absolute",bottom:"10%",left:"50%",transform:"translateX(-50%)",opacity:entryDone&&!focused?1:0,transition:"opacity .4s",pointerEvents:"none"},children:[String(active+1).padStart(2,"0"),"/",String(Math.max(projects.length,3)).padStart(2,"0")]}),cursorEnabled&&/*#__PURE__*/_jsx("div",{ref:cursorRef,style:{position:"absolute",top:0,left:0,zIndex:4,pointerEvents:"none",whiteSpace:"nowrap",mixBlendMode:"exclusion",color:"white",willChange:"transform"},children:"View"}),/*#__PURE__*/_jsx("button",{type:"button","aria-label":"Close focused project",onClick:()=>engineRef.current?.closeFocus(),style:{position:"absolute",top:"2vh",right:"4vw",zIndex:5,padding:0,border:0,background:"transparent",color:"white",cursor:"pointer",opacity:focused?1:0,pointerEvents:focused?"auto":"none",mixBlendMode:"exclusion",transition:"opacity .3s",...font},children:"Close"})]});}LiquidGlassCarousel.defaultProps={projects:[{brand:"Project One",description:"Digital experience"},{brand:"Project Two",description:"Interactive campaign"},{brand:"Project Three",description:"Brand platform"},{brand:"Project Four",description:"Product launch"},{brand:"Project Five",description:"Editorial story"}],panelHeight:450,gap:12,glide:.075,wheelSensitivity:1,snap:true,snapDistance:60,snapDelay:120,speedShrink:60,lensShape:"circle",lensRotation:65,lensWidth:.565,lensHeight:1,lensX:.5,lensY:.5,dispersion:11,zoom:0,blur:0,glow:4.2,blueRing:6,blueColor:"#009dff",shimmer:true,rimWave:.6,entryAnimation:true,focusScale:1.18,background:"#ffffff",foreground:"#000000",showLabels:true,showCursor:true,font:{fontFamily:"Inter, sans-serif",fontSize:16,fontWeight:400,lineHeight:"1.25em"},pixelRatio:2};addPropertyControls(LiquidGlassCarousel,{projects:{type:ControlType.Array,title:"Projects",maxCount:20,control:{type:ControlType.Object,controls:{image:{type:ControlType.ResponsiveImage,title:"Image"},brand:{type:ControlType.String,title:"Brand",defaultValue:"Project"},description:{type:ControlType.String,title:"Description",defaultValue:"Digital experience"}}}},panelHeight:{type:ControlType.Number,title:"Panel Height",min:80,max:700,step:1,unit:"px"},gap:{type:ControlType.Number,title:"Gap",min:0,max:120,step:1,unit:"px"},glide:{type:ControlType.Number,title:"Glide",min:.02,max:.2,step:.005},wheelSensitivity:{type:ControlType.Number,title:"Wheel",min:.2,max:3,step:.05},snap:{type:ControlType.Boolean,title:"Snap"},snapDistance:{type:ControlType.Number,title:"Snap Distance",min:10,max:200,step:5,hidden:props=>!props.snap},snapDelay:{type:ControlType.Number,title:"Snap Delay",min:0,max:500,step:10,unit:"ms",hidden:props=>!props.snap},speedShrink:{type:ControlType.Number,title:"Speed Shrink",min:10,max:160,step:1},lensShape:{type:ControlType.Enum,title:"Lens Shape",options:["circle","square"],optionTitles:["Circle","Rectangle"],displaySegmentedControl:true},lensRotation:{type:ControlType.Number,title:"Lens Rotation",min:-180,max:180,step:1,unit:"\xb0"},lensWidth:{type:ControlType.Number,title:"Lens Width",min:.03,max:1.2,step:.005},lensHeight:{type:ControlType.Number,title:"Lens Height",min:.03,max:1.2,step:.005},lensX:{type:ControlType.Number,title:"Lens X",min:0,max:1,step:.005},lensY:{type:ControlType.Number,title:"Lens Y",min:0,max:1,step:.005},dispersion:{type:ControlType.Number,title:"Dispersion",min:0,max:120,step:1},zoom:{type:ControlType.Number,title:"Refraction",min:0,max:2,step:.01},blur:{type:ControlType.Number,title:"Lens Blur",min:0,max:20,step:.1},glow:{type:ControlType.Number,title:"Glow",min:0,max:40,step:.1},blueRing:{type:ControlType.Number,title:"Blue Ring",min:0,max:12,step:.05},blueColor:{type:ControlType.Color,title:"Blue Color"},shimmer:{type:ControlType.Boolean,title:"Shimmer"},rimWave:{type:ControlType.Number,title:"Rim Wave",min:0,max:.8,step:.001},entryAnimation:{type:ControlType.Boolean,title:"Entry"},focusScale:{type:ControlType.Number,title:"Focus Scale",min:1,max:1.8,step:.01},background:{type:ControlType.Color,title:"Background"},foreground:{type:ControlType.Color,title:"Text"},showLabels:{type:ControlType.Boolean,title:"Labels"},showCursor:{type:ControlType.Boolean,title:"View Cursor"},font:{type:ControlType.Font,title:"Typography",controls:"extended",defaultFontType:"sans-serif",displayTextAlignment:false},pixelRatio:{type:ControlType.Number,title:"Pixel Ratio",min:1,max:100,step:.25,description:"Made by [@luxarma](https://luxarma.fr)"}});
export const __FramerMetadata__ = {"exports":{"default":{"type":"reactComponent","name":"LiquidGlassCarousel","slots":[],"annotations":{"framerContractVersion":"1"}},"__FramerMetadata__":{"type":"variable"}}}
//# sourceMappingURL=./liquid_glass_carousel.map