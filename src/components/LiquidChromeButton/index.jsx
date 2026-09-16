"use client";
import{jsx as _jsx,jsxs as _jsxs}from"react/jsx-runtime";import*as React from"react";import{motion}from"framer-motion";import{addPropertyControls,ControlType}from"framer";import*as THREE from"three";const icons={Folder:/*#__PURE__*/_jsx("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"currentColor",style:{width:"100%",height:"100%"},children:/*#__PURE__*/_jsx("path",{d:"M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"})}),Lightning:/*#__PURE__*/_jsx("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"currentColor",style:{width:"100%",height:"100%"},children:/*#__PURE__*/_jsx("path",{d:"M13 2L3 14h9l-1 8 10-12h-9l1-8z"})}),Cursor:/*#__PURE__*/_jsx("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"currentColor",style:{width:"100%",height:"100%"},children:/*#__PURE__*/_jsx("path",{d:"M3 11l19-9-9 19-2-8-8-2z"})})};export default function PremiumLiquidButton(props){const{icon,customIcon,size,borderWidth,animationSpeed,glassOpacity,link}=props;const mountRef=React.useRef(null);React.useEffect(()=>{if(!mountRef.current)return;const width=size;const height=size;const scene=new THREE.Scene;const camera=new THREE.OrthographicCamera(-1,1,1,-1,0,1);const renderer=new THREE.WebGLRenderer({alpha:true,antialias:true});renderer.setSize(width,height);renderer.setPixelRatio(Math.min(window.devicePixelRatio,2));// Clear any existing canvas (for Framer hot reloads)
while(mountRef.current.firstChild){mountRef.current.removeChild(mountRef.current.firstChild);}mountRef.current.appendChild(renderer.domElement);const geometry=new THREE.PlaneGeometry(2,2);// Advanced Liquid Chrome Shader matching the reference video
const fragmentShader=`
            uniform float u_time;
            varying vec2 vUv;

            void main() {
                // Center and scale UVs
                vec2 uv = vUv * 2.0 - 1.0;
                
                // Extremely smooth, slow time progression
                float t = u_time * 0.15; 

                // Complex domain warping for organic liquid flow
                vec2 p = uv;
                for(float i = 1.0; i < 6.0; i++) {
                    uv.x += 0.4 / i * cos(i * 2.0 * uv.y + t);
                    uv.y += 0.4 / i * cos(i * 1.5 * uv.x + t);
                }

                // Generate base fluid pattern
                float f = cos(uv.x + uv.y);

                // High contrast chrome base (deep blacks, bright whites)
                float chrome = smoothstep(-0.1, 0.1, f);

                // Iridescent color offsets (creates the rainbow fringes)
                // We offset the phase slightly for each color channel
                float r = smoothstep(-0.1, 0.1, cos(uv.x + uv.y + 0.05));
                float g = smoothstep(-0.1, 0.1, cos(uv.x + uv.y + 0.10));
                float b = smoothstep(-0.1, 0.1, cos(uv.x + uv.y + 0.15));
                vec3 color = vec3(r, g, b);

                // Isolate the edges to apply the rainbow ONLY where the chrome transitions
                // This perfectly mimics chromatic aberration on curved metal
                float edge = 1.0 - smoothstep(0.0, 0.2, abs(f));

                // Mix chrome and iridescence
                vec3 finalColor = mix(vec3(chrome), color, edge * 0.9);

                // Deepen blacks and boost whites for a premium, glossy look
                finalColor = smoothstep(0.05, 0.95, finalColor);

                gl_FragColor = vec4(finalColor, 1.0);
            }
        `;const vertexShader=`
            varying vec2 vUv;
            void main() {
                vUv = uv;
                gl_Position = vec4(position, 1.0);
            }
        `;const material=new THREE.ShaderMaterial({uniforms:{u_time:{value:0}},vertexShader,fragmentShader});const mesh=new THREE.Mesh(geometry,material);scene.add(mesh);let animationFrameId;const startTime=Date.now();const animate=()=>{animationFrameId=requestAnimationFrame(animate);// Apply user-controlled speed
material.uniforms.u_time.value=(Date.now()-startTime)/1e3*animationSpeed;renderer.render(scene,camera);};animate();return()=>{cancelAnimationFrame(animationFrameId);if(mountRef.current&&renderer.domElement){mountRef.current.removeChild(renderer.domElement);}geometry.dispose();material.dispose();renderer.dispose();};},[size,animationSpeed]);// Mask to cut out the center of the WebGL canvas, creating the perfect border ring
const maskImage=`radial-gradient(closest-side, transparent calc(100% - ${borderWidth}px), black calc(100% - ${borderWidth}px + 0.5px))`;// Determine if we should render as an anchor tag or a div based on the link property
const isLink=typeof link==="string"&&link.trim().length>0;const Wrapper=isLink?motion.a:motion.div;const wrapperProps=isLink?{href:link}:{};return /*#__PURE__*/_jsxs(Wrapper,{...wrapperProps,style:{width:size,height:size,position:"relative",cursor:"pointer",borderRadius:"50%",display:"block",textDecoration:"none",// Main soft drop shadow for the entire component
boxShadow:"0 20px 40px rgba(0,0,0,0.15), 0 10px 20px rgba(0,0,0,0.05)"},whileHover:{scale:1.04},whileTap:{scale:.96},transition:{type:"spring",stiffness:400,damping:25},children:[/*#__PURE__*/_jsx("div",{ref:mountRef,style:{position:"absolute",inset:0,borderRadius:"50%",overflow:"hidden",WebkitMaskImage:maskImage,maskImage:maskImage,// Fallback background while WebGL loads
backgroundColor:"#e0e0e0"}}),/*#__PURE__*/_jsx("div",{style:{position:"absolute",inset:0,borderRadius:"50%",pointerEvents:"none",boxShadow:"inset 0 1px 3px rgba(255,255,255,0.9), inset 0 -2px 6px rgba(0,0,0,0.5)",zIndex:1}}),/*#__PURE__*/_jsxs("div",{style:{position:"absolute",inset:borderWidth,borderRadius:"50%",// Much lighter background to fix the "too dark" issue, letting the environment show through
background:`rgba(255, 255, 255, ${glassOpacity})`,backdropFilter:"blur(24px)",WebkitBackdropFilter:"blur(24px)",// Complex shadows: sharp white inner edge, soft white inner glow, soft black outer drop shadow
boxShadow:"inset 0 0 0 1px rgba(255,255,255,0.4), inset 0 6px 16px rgba(255,255,255,0.8), 0 4px 12px rgba(0,0,0,0.15)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:2},children:[/*#__PURE__*/_jsx("div",{style:{position:"absolute",top:"2%",left:"12%",right:"12%",height:"45%",background:"linear-gradient(180deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0) 100%)",borderRadius:"50%",pointerEvents:"none"}}),/*#__PURE__*/_jsx("div",{style:{width:"40%",height:"40%",color:"#ffffff",// Soft shadow to lift the white icon off the light glass background
filter:"drop-shadow(0px 2px 4px rgba(0,0,0,0.3))",zIndex:3,display:"flex",alignItems:"center",justifyContent:"center"},children:customIcon?/* Using CSS mask to render the custom SVG file so it inherits the white color and drop shadow perfectly *//*#__PURE__*/_jsx("div",{style:{width:"100%",height:"100%",backgroundColor:"currentColor",WebkitMaskImage:`url("${customIcon}")`,WebkitMaskSize:"contain",WebkitMaskRepeat:"no-repeat",WebkitMaskPosition:"center",maskImage:`url("${customIcon}")`,maskSize:"contain",maskRepeat:"no-repeat",maskPosition:"center"}}):icons[icon]})]})]});}addPropertyControls(PremiumLiquidButton,{link:{type:ControlType.Link,title:"Link"},customIcon:{type:ControlType.File,title:"Custom SVG",allowedFileTypes:["svg"]},icon:{type:ControlType.Enum,title:"Default Icon",options:["Folder","Lightning","Cursor"],defaultValue:"Folder",hidden(props){// Hide the default icon selector if a custom SVG is uploaded
return props.customIcon!==""&&props.customIcon!==undefined;}},size:{type:ControlType.Number,title:"Size",defaultValue:120,min:40,max:300,displayStepper:true},borderWidth:{type:ControlType.Number,title:"Border Width",defaultValue:6,min:1,max:20,displayStepper:true},animationSpeed:{type:ControlType.Number,title:"Anim Speed",defaultValue:1,min:.1,max:20,step:.1,displayStepper:true},glassOpacity:{type:ControlType.Number,title:"Glass Opacity",defaultValue:.15,min:0,max:1,step:.05,displayStepper:true}});
export const __FramerMetadata__ = {"exports":{"default":{"type":"reactComponent","name":"PremiumLiquidButton","slots":[],"annotations":{"framerContractVersion":"1"}},"__FramerMetadata__":{"type":"variable"}}}
//# sourceMappingURL=./Dw.map