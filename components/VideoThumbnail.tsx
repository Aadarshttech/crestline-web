"use client";

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

interface VideoThumbnailProps {
  imageSrc: string;
  videoSrc?: string;
  alt: string;
  category?: string;
}

export default function VideoThumbnail({ imageSrc, videoSrc, alt, category }: VideoThumbnailProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  const hasVideo = !!videoSrc && videoSrc.length > 5;

  // Handle video play/pause on hover
  useEffect(() => {
    if (videoRef.current) {
      if (isHovered && hasVideo) {
        // Use a small delay before playing to prevent flashing when moving mouse quickly
        const playTimeout = setTimeout(() => {
          videoRef.current?.play().catch((err) => {
            console.warn("Video play blocked or failed:", err);
            setIsPlaying(false);
          });
        }, 150);
        return () => clearTimeout(playTimeout);
      } else {
        videoRef.current.pause();
        videoRef.current.currentTime = 0; // Reset video when mouse leaves
        setIsPlaying(false);
      }
    }
  }, [isHovered, hasVideo]);

  return (
    <div 
      className="relative w-full aspect-[4/3] bg-neutral-100 overflow-hidden group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Base Image (Static) */}
      <Image
        src={imageSrc}
        alt={alt}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
        className={`object-cover mix-blend-multiply transition-all duration-700 ${
          isPlaying ? 'opacity-0 scale-100' : 'opacity-100 group-hover:scale-105'
        }`}
      />
      
      {/* Video Element (Fades in on Hover) */}
      {hasVideo && (
        <video
          ref={videoRef}
          src={videoSrc}
          muted
          playsInline
          loop
          onPlaying={() => setIsPlaying(true)}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
            isPlaying ? 'opacity-100' : 'opacity-0'
          }`}
        />
      )}

      {/* No Image Fallback */}
      {!imageSrc && !hasVideo && (
        <div className="absolute inset-0 flex items-center justify-center text-neutral-400 font-outfit text-sm">
          No Image
        </div>
      )}
      
      {/* Hover Overlay for non-video images */}
      {!hasVideo && (
        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      )}
    </div>
  );
}
