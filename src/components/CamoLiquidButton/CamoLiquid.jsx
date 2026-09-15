"use client";
import{jsx as _jsx}from"react/jsx-runtime";import{addPropertyControls,ControlType,RenderTarget,useIsStaticRenderer}from"framer";import{startTransition,useEffect,useLayoutEffect,useMemo,useRef,useState}from"react";const MAX_STOPS=8;const useIsomorphicLayoutEffect=typeof window!=="undefined"?useLayoutEffect:useEffect;function parseRoundingRadiusPx(rounding,widthPx,heightPx){const minHalf=Math.min(widthPx,heightPx)*.5;if(typeof rounding!=="string")return minHalf;const match=rounding.match(/(-?\d*\.?\d+)\s*(%|px)?/i);if(!match)return minHalf;const value=Number.parseFloat(match[1]);const unit=(match[2]||"px").toLowerCase();if(!Number.isFinite(value))return minHalf;const resolved=unit==="%"?Math.max(0,value)/100*minHalf:Math.max(0,value);return Math.min(Math.max(0,resolved),minHalf);}function hexToRgb(color){if(typeof color!=="string")return[NaN,NaN,NaN];const safe=color.trim();if(safe.startsWith("#")){const hex=safe.slice(1);if(hex.length===3){const r=parseInt(hex[0]+hex[0],16)/255;const g=parseInt(hex[1]+hex[1],16)/255;const b=parseInt(hex[2]+hex[2],16)/255;return[r,g,b];}if(hex.length>=6){const r=parseInt(hex.slice(0,2),16)/255;const g=parseInt(hex.slice(2,4),16)/255;const b=parseInt(hex.slice(4,6),16)/255;return[r,g,b];}}const rgbMatch=safe.match(/rgba?\(([^)]+)\)/i);if(rgbMatch){const[r="0",g="0",b="0"]=rgbMatch[1].split(",");return[Math.max(0,Math.min(255,Number.parseFloat(r)))/255,Math.max(0,Math.min(255,Number.parseFloat(g)))/255,Math.max(0,Math.min(255,Number.parseFloat(b)))/255];}return[NaN,NaN,NaN];}const defaultGradient=["#060606","#FFFFFF","#080808","#7BE8FF","#FFE76B","#FFFFFF","#030303"];const defaultPaletteOrder="1,2,3,1,2,3,1";function buildPaletteGradient(order,palette){const fallbackIndexes=[1,2,3,1,2,3,1];const source=typeof order==="string"?order:defaultPaletteOrder;const parsed=source.split(",").map(token=>Number.parseInt(token.trim(),10)).filter(value=>Number.isFinite(value)).map(value=>Math.min(3,Math.max(1,value))).slice(0,MAX_STOPS);const indexes=parsed.length>=2?parsed:fallbackIndexes;return indexes.slice(0,MAX_STOPS).map(index=>palette[index-1]);}function buildStops(gradient){const resolved=Array.isArray(gradient)&&gradient.length>0?gradient:defaultGradient;const filled=new Float32Array(MAX_STOPS*3);let previousValid=hexToRgb(defaultGradient[0]);for(let i=0;i<MAX_STOPS;i++){const color=resolved[Math.min(i,resolved.length-1)];const fallbackColor=defaultGradient[Math.min(i,defaultGradient.length-1)];let[r,g,b]=hexToRgb(color);if(!Number.isFinite(r)||!Number.isFinite(g)||!Number.isFinite(b)){[r,g,b]=hexToRgb(fallbackColor);}if(!Number.isFinite(r)||!Number.isFinite(g)||!Number.isFinite(b)){[r,g,b]=previousValid;}else{previousValid=[r,g,b];}filled[i*3+0]=r;filled[i*3+1]=g;filled[i*3+2]=b;}return filled;}/**
 * @framerSupportedLayoutWidth any-prefer-fixed
 * @framerSupportedLayoutHeight any-prefer-fixed
 * @framerIntrinsicWidth 76
 * @framerIntrinsicHeight 76
 */export default function CamoLiquid(props){const{rounding="999px",depth=.65,roughness=.34,rgbSplit=.45,scale=3.2,stretch=.35,angle=18,gradient=defaultGradient,paletteA,paletteB,paletteC,paletteOrder=defaultPaletteOrder,repeats=5,offset=.12,phase=.2,evolution=.22}=props;const rootRef=useRef(null);const canvasRef=useRef(null);const runtimeControlsRef=useRef(null);const isStaticRenderer=useIsStaticRenderer();const isCanvasRenderTarget=useMemo(()=>RenderTarget.current()===RenderTarget.canvas,[]);const[prefersReducedMotion,setPrefersReducedMotion]=useState(()=>{if(typeof window==="undefined"||typeof window.matchMedia!=="function")return false;return window.matchMedia("(prefers-reduced-motion: reduce)").matches;});const safeRounding=typeof rounding==="string"?rounding:"999px";const safeDepth=Number.isFinite(depth)?depth:.65;const safeRoughness=Number.isFinite(roughness)?roughness:.34;const safeRgbSplit=Number.isFinite(rgbSplit)?rgbSplit:.45;const safeScale=Number.isFinite(scale)?scale:3.2;const safeStretch=Number.isFinite(stretch)?stretch:.35;const safeAngle=Number.isFinite(angle)?angle:18;const safeGradient=Array.isArray(gradient)?gradient:defaultGradient;const safePaletteA=typeof paletteA==="string"?paletteA.trim():"";const safePaletteB=typeof paletteB==="string"?paletteB.trim():"";const safePaletteC=typeof paletteC==="string"?paletteC.trim():"";const safePaletteOrder=typeof paletteOrder==="string"?paletteOrder:defaultPaletteOrder;const safeRepeats=Number.isFinite(repeats)?repeats:5;const safeOffset=Number.isFinite(offset)?offset:.12;const safePhase=Number.isFinite(phase)?phase:.2;const safeEvolution=Number.isFinite(evolution)?evolution:.22;const hasPaletteTriplet=safePaletteA.length>0&&safePaletteB.length>0&&safePaletteC.length>0;const paletteGradient=useMemo(()=>{if(!hasPaletteTriplet)return null;return buildPaletteGradient(safePaletteOrder,[safePaletteA,safePaletteB,safePaletteC]);},[hasPaletteTriplet,safePaletteA,safePaletteB,safePaletteC,safePaletteOrder]);const activeGradient=paletteGradient??safeGradient;const gradientKey=useMemo(()=>activeGradient.map(entry=>typeof entry==="string"?entry:"__invalid__").join("|"),[activeGradient]);const gradientStops=useMemo(()=>buildStops(activeGradient),[gradientKey]);const stopCount=Math.min(MAX_STOPS,Math.max(2,activeGradient.length||3));const propsRef=useRef({depth:safeDepth,roughness:safeRoughness,rgbSplit:safeRgbSplit,scale:safeScale,stretch:safeStretch,angle:safeAngle,repeats:safeRepeats,offset:safeOffset,phase:safePhase,evolution:safeEvolution,rounding:safeRounding,gradientStops,stopCount});propsRef.current={depth:safeDepth,roughness:safeRoughness,rgbSplit:safeRgbSplit,scale:safeScale,stretch:safeStretch,angle:safeAngle,repeats:safeRepeats,offset:safeOffset,phase:safePhase,evolution:safeEvolution,rounding:safeRounding,gradientStops,stopCount};const environmentRef=useRef({isStaticRenderer,isCanvasRenderTarget,prefersReducedMotion});environmentRef.current={isStaticRenderer,isCanvasRenderTarget,prefersReducedMotion};useEffect(()=>{if(typeof window==="undefined"||typeof window.matchMedia!=="function")return;const mediaQuery=window.matchMedia("(prefers-reduced-motion: reduce)");const handleChange=()=>{startTransition(()=>setPrefersReducedMotion(mediaQuery.matches));};handleChange();if(typeof mediaQuery.addEventListener==="function"){mediaQuery.addEventListener("change",handleChange);return()=>mediaQuery.removeEventListener("change",handleChange);}mediaQuery.addListener(handleChange);return()=>mediaQuery.removeListener(handleChange);},[]);useEffect(()=>{runtimeControlsRef.current?.reevaluateLoop();runtimeControlsRef.current?.requestRedraw();},[safeRounding,safeDepth,safeRoughness,safeRgbSplit,safeScale,safeStretch,safeAngle,gradientKey,safePaletteA,safePaletteB,safePaletteC,safePaletteOrder,safeRepeats,safeOffset,safePhase,safeEvolution,stopCount,isStaticRenderer,isCanvasRenderTarget,prefersReducedMotion]);useIsomorphicLayoutEffect(()=>{const canvas=canvasRef.current;const root=rootRef.current;if(!canvas||!root)return;if(typeof window==="undefined")return;const gl=canvas.getContext("webgl",{alpha:true,antialias:true,premultipliedAlpha:true});if(!gl)return;const vertexSource=`
attribute vec2 aPosition;
varying vec2 vUv;
void main() {
    vUv = aPosition * 0.5 + 0.5;
    gl_Position = vec4(aPosition, 0.0, 1.0);
}`;const fragmentSource=`
precision highp float;
varying vec2 vUv;
uniform vec2 uResolution;
uniform float uTime;
uniform float uDepth;
uniform float uRoughness;
uniform float uRgbSplit;
uniform float uScale;
uniform float uStretch;
uniform float uAngle;
uniform float uRepeats;
uniform float uOffset;
uniform float uPhase;
uniform float uEvolution;
uniform float uStopCount;
uniform float uRadius;
uniform vec3 uStops[${MAX_STOPS}];

float hash(vec2 p) {
    p = fract(p * vec2(123.34, 345.45));
    p += dot(p, p + 34.345);
    return fract(p.x * p.y);
}

float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
}

vec3 sampleRamp(float t) {
    float segments = max(1.0, uStopCount - 1.0);
    float x = fract(t) * segments;
    vec3 color = vec3(0.0);
    for (int i = 0; i < ${MAX_STOPS-1}; i++) {
        float fi = float(i);
        float w = clamp(1.0 - abs(x - fi), 0.0, 1.0);
        vec3 c = mix(uStops[i], uStops[i + 1], clamp(x - fi, 0.0, 1.0));
        color += c * w;
    }
    return color;
}

void main() {
    float tau = 6.28318530718;

    vec2 uv = vUv;
    vec2 p = uv - 0.5;
    p.x *= uResolution.x / max(1.0, uResolution.y);

    float a = radians(uAngle);
    mat2 rot = mat2(cos(a), -sin(a), sin(a), cos(a));
    vec2 rp = rot * p;

    float t = uTime * uEvolution;
    float phaseLoop = sin(tau * (t + uPhase)) * 0.5 + cos(tau * (t * 0.73 + uPhase * 1.37)) * 0.5;
    float fine = noise(rp * (36.0 + uScale * 4.0) + vec2(cos(t * tau), sin(t * tau)));
    float coarse = noise(rp * (8.0 + uScale) - vec2(sin(t * tau * 0.5), cos(t * tau * 0.5)));
    float warp = (fine * 2.0 - 1.0) * (0.14 * uRoughness) + (coarse * 2.0 - 1.0) * (0.18 * uRoughness);

    float coord = rp.x * uScale * max(1.0, uRepeats)
        + rp.y * uStretch * 0.8
        + uOffset
        + phaseLoop * 0.15
        + warp;

    float band = fract(coord);
    float edgeDist = min(band, 1.0 - band);
    float edge = 1.0 - smoothstep(0.0, 0.18, edgeDist);
    float split = (0.001 + uRgbSplit * 0.06) * edge;

    vec3 cR = sampleRamp(coord + split);
    vec3 cG = sampleRamp(coord);
    vec3 cB = sampleRamp(coord - split);
    vec3 color = vec3(cR.r, cG.g, cB.b);

    float shade = 0.62 + 0.38 * cos((coord + warp * 0.7) * tau);
    color *= mix(1.0, shade, uDepth * 0.9);
    color = (color - 0.5) * (1.0 + uDepth * 1.6) + 0.5;
    color = clamp(color, 0.0, 1.0);

    vec2 pixel = vUv * uResolution;
    vec2 halfSize = uResolution * 0.5;
    vec2 d = abs(pixel - halfSize) - (halfSize - vec2(uRadius));
    float dist = length(max(d, 0.0)) + min(max(d.x, d.y), 0.0) - uRadius;
    float alphaMask = 1.0 - smoothstep(-1.5, 0.5, dist);

    gl_FragColor = vec4(color * alphaMask, alphaMask);
}`;const compileShader=(type,source)=>{const shader=gl.createShader(type);if(!shader)return null;gl.shaderSource(shader,source);gl.compileShader(shader);if(!gl.getShaderParameter(shader,gl.COMPILE_STATUS)){console.error(gl.getShaderInfoLog(shader)||"Shader compile error");gl.deleteShader(shader);return null;}return shader;};const vertexShader=compileShader(gl.VERTEX_SHADER,vertexSource);const fragmentShader=compileShader(gl.FRAGMENT_SHADER,fragmentSource);if(!vertexShader||!fragmentShader)return;const program=gl.createProgram();if(!program)return;gl.attachShader(program,vertexShader);gl.attachShader(program,fragmentShader);gl.linkProgram(program);if(!gl.getProgramParameter(program,gl.LINK_STATUS)){console.error(gl.getProgramInfoLog(program)||"Program link error");gl.deleteProgram(program);return;}gl.useProgram(program);const buffer=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,buffer);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,1,1]),gl.STATIC_DRAW);const posLoc=gl.getAttribLocation(program,"aPosition");gl.enableVertexAttribArray(posLoc);gl.vertexAttribPointer(posLoc,2,gl.FLOAT,false,0,0);const uResolution=gl.getUniformLocation(program,"uResolution");const uTime=gl.getUniformLocation(program,"uTime");const uDepth=gl.getUniformLocation(program,"uDepth");const uRoughness=gl.getUniformLocation(program,"uRoughness");const uRgbSplit=gl.getUniformLocation(program,"uRgbSplit");const uScale=gl.getUniformLocation(program,"uScale");const uStretch=gl.getUniformLocation(program,"uStretch");const uAngle=gl.getUniformLocation(program,"uAngle");const uRepeats=gl.getUniformLocation(program,"uRepeats");const uOffset=gl.getUniformLocation(program,"uOffset");const uPhase=gl.getUniformLocation(program,"uPhase");const uEvolution=gl.getUniformLocation(program,"uEvolution");const uStopCount=gl.getUniformLocation(program,"uStopCount");const uRadius=gl.getUniformLocation(program,"uRadius");const uStops=gl.getUniformLocation(program,"uStops");let rafId=0;let width=1;let height=1;let cssWidth=1;let cssHeight=1;let dpr=1;let isVisible=false;let isRunning=false;let intersectionObserver=null;let resizeObserver=null;let unmounted=false;const resize=()=>{const rect=root.getBoundingClientRect();dpr=Math.min(2,Math.max(1,window.devicePixelRatio||1));cssWidth=Math.max(1,rect.width||1);cssHeight=Math.max(1,rect.height||1);width=Math.max(1,Math.round(cssWidth*dpr));height=Math.max(1,Math.round(cssHeight*dpr));if(canvas.width!==width)canvas.width=width;if(canvas.height!==height)canvas.height=height;gl.viewport(0,0,width,height);};const getSingleFrameTime=()=>0;const canAnimateContinuously=()=>{const environment=environmentRef.current;const currentProps=propsRef.current;return!environment.isStaticRenderer&&!environment.isCanvasRenderTarget&&!environment.prefersReducedMotion&&currentProps.evolution>0&&isVisible;};const draw=now=>{const currentProps=propsRef.current;const elapsed=now/1e3;const radiusCssPx=parseRoundingRadiusPx(currentProps.rounding,cssWidth,cssHeight);const radiusPxDevice=Math.min(Math.min(width,height)*.5,radiusCssPx*dpr);gl.viewport(0,0,width,height);gl.clearColor(0,0,0,0);gl.clear(gl.COLOR_BUFFER_BIT);gl.useProgram(program);if(uResolution)gl.uniform2f(uResolution,width,height);if(uTime)gl.uniform1f(uTime,elapsed);if(uDepth)gl.uniform1f(uDepth,currentProps.depth);if(uRoughness)gl.uniform1f(uRoughness,currentProps.roughness);if(uRgbSplit)gl.uniform1f(uRgbSplit,currentProps.rgbSplit);if(uScale)gl.uniform1f(uScale,currentProps.scale);if(uStretch)gl.uniform1f(uStretch,currentProps.stretch);if(uAngle)gl.uniform1f(uAngle,currentProps.angle);if(uRepeats)gl.uniform1f(uRepeats,Math.max(1,Math.floor(currentProps.repeats)));if(uOffset)gl.uniform1f(uOffset,currentProps.offset);if(uPhase)gl.uniform1f(uPhase,currentProps.phase);if(uEvolution)gl.uniform1f(uEvolution,currentProps.evolution);if(uStopCount)gl.uniform1f(uStopCount,currentProps.stopCount);if(uRadius)gl.uniform1f(uRadius,radiusPxDevice);if(uStops)gl.uniform3fv(uStops,currentProps.gradientStops);gl.drawArrays(gl.TRIANGLE_STRIP,0,4);};const loop=now=>{if(unmounted)return;draw(now);if(canAnimateContinuously()){rafId=window.requestAnimationFrame(loop);}else{isRunning=false;rafId=0;draw(getSingleFrameTime());}};const stopLoop=()=>{if(rafId){window.cancelAnimationFrame(rafId);rafId=0;}isRunning=false;};const startLoop=()=>{if(isRunning||unmounted)return;isRunning=true;rafId=window.requestAnimationFrame(loop);};const requestRedraw=()=>{if(unmounted)return;if(isRunning)return;draw(getSingleFrameTime());};const reevaluateLoop=()=>{if(unmounted)return;if(canAnimateContinuously()){startLoop();}else{stopLoop();requestRedraw();}};resize();const environment=environmentRef.current;isVisible=environment.isStaticRenderer||environment.isCanvasRenderTarget;draw(getSingleFrameTime());reevaluateLoop();resizeObserver=new ResizeObserver(()=>{resize();requestRedraw();reevaluateLoop();});resizeObserver.observe(root);if(!environment.isStaticRenderer&&!environment.isCanvasRenderTarget){if(typeof IntersectionObserver==="function"){intersectionObserver=new IntersectionObserver(entries=>{const entry=entries[0];isVisible=Boolean(entry?.isIntersecting);reevaluateLoop();},{threshold:.01});intersectionObserver.observe(root);}else{isVisible=true;reevaluateLoop();}}runtimeControlsRef.current={requestRedraw,reevaluateLoop};return()=>{unmounted=true;runtimeControlsRef.current=null;stopLoop();if(intersectionObserver)intersectionObserver.disconnect();if(resizeObserver)resizeObserver.disconnect();gl.deleteBuffer(buffer);gl.deleteProgram(program);gl.deleteShader(vertexShader);gl.deleteShader(fragmentShader);};},[]);return /*#__PURE__*/_jsx("div",{ref:rootRef,style:{position:"relative",width:"100%",height:"100%",overflow:"hidden",borderRadius:safeRounding,background:"transparent"},children:/*#__PURE__*/_jsx("canvas",{ref:canvasRef,"aria-hidden":"true",style:{width:"100%",height:"100%",display:"block",borderRadius:safeRounding}})});}addPropertyControls(CamoLiquid,{rounding:{type:ControlType.BorderRadius,title:"Rounding",defaultValue:"999px"},depth:{type:ControlType.Number,title:"Depth",defaultValue:.65,min:0,max:1,step:.01},roughness:{type:ControlType.Number,title:"Roughness",defaultValue:.34,min:0,max:1,step:.01},rgbSplit:{type:ControlType.Number,title:"RGB Split",defaultValue:.45,min:0,max:1,step:.01},scale:{type:ControlType.Number,title:"Scale",defaultValue:3.2,min:.5,max:12,step:.1},stretch:{type:ControlType.Number,title:"Stretch",defaultValue:.35,min:-2,max:2,step:.01},angle:{type:ControlType.Number,title:"Angle",defaultValue:18,min:-180,max:180,step:1,unit:"deg"},gradient:{type:ControlType.Array,title:"Gradient",control:{type:ControlType.Color},defaultValue:["#060606","#FFFFFF","#080808","#7BE8FF","#FFE76B","#FFFFFF","#030303"],maxCount:MAX_STOPS},paletteA:{type:ControlType.Color,title:"Palette A",optional:true},paletteB:{type:ControlType.Color,title:"Palette B",optional:true},paletteC:{type:ControlType.Color,title:"Palette C",optional:true},paletteOrder:{type:ControlType.String,title:"Palette Order",defaultValue:"1,2,3,1,2,3,1"},repeats:{type:ControlType.Number,title:"Repeats",defaultValue:5,min:1,max:24,step:1},offset:{type:ControlType.Number,title:"Offset",defaultValue:.12,min:0,max:1,step:.001},phase:{type:ControlType.Number,title:"Phase",defaultValue:.2,min:0,max:1,step:.001},evolution:{type:ControlType.Number,title:"Evolution",defaultValue:.22,min:0,max:2,step:.01,description:"Built by Matthias \xd6lschlegel 💪\n[Explore more components](https://framer.link/fsd2pgh)"}});
export const __FramerMetadata__ = {"exports":{"default":{"type":"reactComponent","name":"CamoLiquid","slots":[],"annotations":{"framerIntrinsicWidth":"76","framerSupportedLayoutHeight":"any-prefer-fixed","framerIntrinsicHeight":"76","framerContractVersion":"1","framerSupportedLayoutWidth":"any-prefer-fixed"}},"__FramerMetadata__":{"type":"variable"}}}
//# sourceMappingURL=./CamoLiquid.map