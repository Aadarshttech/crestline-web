"use client";
import{jsx as _jsx}from"react/jsx-runtime";
import React,{useRef,useEffect,useCallback,useState}from"react";
import{useInView}from"framer-motion";

const useIsStaticRenderer = () => false;

export default function ScrollTicker(props){
  const{children,baseSpeed=80,initialDirection="left",gap=24,background="transparent",boostIntensity=1,style,paddingX=16,paddingY=8}=props;
  const isStatic=useIsStaticRenderer();
  
  const containerRef=useRef(null);
  const trackRef=useRef(null);
  const frameRef=useRef(null);
  const positionRef=useRef(0);
  const directionRef=useRef(initialDirection);
  const velocityRef=useRef(1);
  const lastTimeRef=useRef(null);
  const lastScrollTimeRef=useRef(null);
  
  const[copies,setCopies]=useState(2);
  const inView=useInView(containerRef,{margin:"0px",amount:.1});
  
  const measureAndReplicate=useCallback(()=>{
    const container=containerRef.current;
    const track=trackRef.current;
    if(!container||!track)return;
    const containerWidth=container.offsetWidth;
    if(containerWidth<=0)return;
    const singleCopyWidth=track.scrollWidth/copies;
    if(singleCopyWidth<=0)return;
    const needed=Math.max(2,Math.ceil(containerWidth*2/singleCopyWidth)+1);
    if(needed!==copies){setCopies(needed);}
  },[copies]);
  
  useEffect(()=>{
    measureAndReplicate();
    const ro=new ResizeObserver(measureAndReplicate);
    if(containerRef.current)ro.observe(containerRef.current);
    return()=>ro.disconnect();
  },[measureAndReplicate,children,gap]);
  
  useEffect(()=>{directionRef.current=initialDirection;},[initialDirection]);
  
  useEffect(()=>{
    if(isStatic)return;
    const onWheel=e=>{
      const dy=e.deltaY;
      const next=dy>0?initialDirection:dy<0?initialDirection==="left"?"right":"left":directionRef.current;
      directionRef.current=next;
      const absDelta=Math.min(Math.abs(dy),200);
      const intensity=Math.max(0,boostIntensity);
      velocityRef.current=1+absDelta/200*intensity;
      lastScrollTimeRef.current=performance.now();
    };
    window.addEventListener("wheel",onWheel,{passive:true});
    return()=>window.removeEventListener("wheel",onWheel);
  },[isStatic,boostIntensity,initialDirection]);
  
  useEffect(()=>{
    if(isStatic)return;
    const step=timestamp=>{
      const track=trackRef.current;
      if(!track){frameRef.current=requestAnimationFrame(step);return;}
      if(!inView){lastTimeRef.current=null;frameRef.current=requestAnimationFrame(step);return;}
      const prev=lastTimeRef.current;
      lastTimeRef.current=timestamp;
      if(prev!=null){
        const deltaSec=(timestamp-prev)/1e3;
        const dir=directionRef.current==="left"?-1:1;
        let velocity=velocityRef.current;
        if(lastScrollTimeRef.current!=null){
          const elapsed=timestamp-lastScrollTimeRef.current;
          if(elapsed>100){
            const t=Math.min((elapsed-100)/400,1);
            velocity=1+(velocity-1)*(1-t);
            if(t>=1){velocity=1;velocityRef.current=1;lastScrollTimeRef.current=null;}
            else{velocityRef.current=velocity;}
          }
        }
        positionRef.current+=dir*baseSpeed*velocity*deltaSec;
        const singleCopyWidth=track.scrollWidth/copies;
        if(singleCopyWidth>0){
          while(positionRef.current<=-singleCopyWidth){positionRef.current+=singleCopyWidth;}
          while(positionRef.current>0){positionRef.current-=singleCopyWidth;}
        }
        track.style.transform=`translateX(${positionRef.current}px)`;
      }
      frameRef.current=requestAnimationFrame(step);
    };
    frameRef.current=requestAnimationFrame(step);
    return()=>{
      if(frameRef.current!=null){cancelAnimationFrame(frameRef.current);frameRef.current=null;}
      lastTimeRef.current=null;
    };
  },[baseSpeed,inView,isStatic,copies]);
  
  const strip=children?/*#__PURE__*/_jsx("div",{style:{display:"inline-flex",flexDirection:"row",alignItems:"center",gap,whiteSpace:"nowrap",paddingRight:gap},children:children}):null;
  const strips=[];
  for(let i=0;i<copies;i++){strips.push(/*#__PURE__*/_jsx(React.Fragment,{children:strip},i));}
  
  return /*#__PURE__*/_jsx("div",{ref:containerRef,style:{position:"relative",overflow:"hidden",width:"100%",height:"100%",background,padding:`${paddingY}px ${paddingX}px`,...style},"aria-label":"Scroll-controlled ticker",role:"marquee",children:/*#__PURE__*/_jsx("div",{ref:trackRef,style:{display:"inline-flex",flexDirection:"row",alignItems:"center",whiteSpace:"nowrap",willChange:"transform"},children:strips})});
}
