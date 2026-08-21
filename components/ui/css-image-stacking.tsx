"use client";
import { ReactLenis } from "lenis/react";
import Link from "next/link";

export default function CssImageStacking() {
  return (
    <ReactLenis root>
      <div className="bg-black text-white w-full relative z-20" id="catalog">
        <div className="wrapper">
          <section className="text-white h-[50vh] md:h-[60vh] w-full bg-black grid place-content-center sticky top-0 z-10">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#333_1px,transparent_1px),linear-gradient(to_bottom,#333_1px,transparent_1px)] bg-[size:54px_54px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_0%,#000_40%,transparent_100%)]"></div>

            <h1 
              className="z-20 text-[clamp(2rem,5vw,4.5rem)] font-outfit font-light text-center tracking-[0.2em] uppercase leading-tight -translate-y-4"
              style={{
                textShadow: "1px 1px 0px #555, 2px 2px 0px #444, 3px 3px 0px #333, 4px 4px 0px #222, 5px 5px 0px #111, 8px 8px 15px rgba(0,0,0,0.9)",
              }}
            >
              Product <br /> Catalogue
            </h1>
          </section>
        </div>

        <section className="text-white w-full bg-transparent relative z-20">
          <>
            {/* Product 1 */}
            <div className="sm:sticky sm:top-0 w-full">
              <Link href="/collections/all?category=Air%20Fryers" className="block w-full">
                <figure className="w-full h-[70vh] flex items-center justify-center bg-black relative group cursor-pointer">
                  <div className="relative h-[90%] w-[55%] rounded-md shadow-[0_-5px_25px_rgba(0,0,0,0.8)] overflow-hidden">
                    <img
                      src="/catalog/real_product_1.png"
                      alt="Air Fryers"
                      className="w-full h-full object-cover align-bottom brightness-75 transition-all duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/60 pointer-events-none"></div>
                    <div className="absolute top-6 left-6 md:top-8 md:left-8 z-10 w-24 md:w-32 opacity-90 drop-shadow-lg">
                      <img src="/hero-logo.svg" alt="Crestline" className="w-full h-auto object-contain brightness-0 invert" />
                    </div>
                    <div className="absolute bottom-8 md:bottom-12 left-0 w-full flex flex-col items-center justify-center z-10">
                      <h3 className="text-white font-outfit font-light tracking-[0.3em] uppercase text-xl md:text-2xl drop-shadow-md">Air Fryers</h3>
                      <div className="w-16 h-[2px] bg-white mt-4 drop-shadow-md opacity-80"></div>
                    </div>
                  </div>
                </figure>
              </Link>
            </div>

            {/* Product 2 */}
            <div className="sm:sticky sm:top-2 w-full">
              <Link href="/collections/all?category=Rice%20Cookers" className="block w-full">
                <figure className="w-full h-[70vh] flex items-center justify-center bg-black relative group cursor-pointer">
                  <div className="relative h-[90%] w-[60%] rounded-md shadow-[0_-5px_25px_rgba(0,0,0,0.8)] overflow-hidden">
                    <img
                      src="/catalog/real_product_2.jpg"
                      alt="Electric Rice Cookers"
                      className="w-full h-full object-cover align-bottom brightness-75 transition-all duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/60 pointer-events-none"></div>
                    <div className="absolute top-6 left-6 md:top-8 md:left-8 z-10 w-24 md:w-32 opacity-90 drop-shadow-lg">
                      <img src="/hero-logo.svg" alt="Crestline" className="w-full h-auto object-contain brightness-0 invert" />
                    </div>
                    <div className="absolute bottom-8 md:bottom-12 left-0 w-full flex flex-col items-center justify-center z-10">
                      <h3 className="text-white font-outfit font-light tracking-[0.3em] uppercase text-xl md:text-2xl drop-shadow-md">Electric Rice Cookers</h3>
                      <div className="w-16 h-[2px] bg-white mt-4 drop-shadow-md opacity-80"></div>
                    </div>
                  </div>
                </figure>
              </Link>
            </div>

            {/* Product 3 */}
            <div className="sm:sticky sm:top-4 w-full">
              <Link href="/collections/all?category=Electric%20Pressure%20Cookers" className="block w-full">
                <figure className="w-full h-[70vh] flex items-center justify-center bg-black relative group cursor-pointer">
                  <div className="relative h-[90%] w-[65%] rounded-md shadow-[0_-5px_25px_rgba(0,0,0,0.8)] overflow-hidden">
                    <img
                      src="/catalog/real_product_3_new.png"
                      alt="Pressure Cookers"
                      className="w-full h-full object-cover align-bottom brightness-75 transition-all duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/60 pointer-events-none"></div>
                    <div className="absolute top-6 left-6 md:top-8 md:left-8 z-10 w-24 md:w-32 opacity-90 drop-shadow-lg">
                      <img src="/hero-logo.svg" alt="Crestline" className="w-full h-auto object-contain brightness-0 invert" />
                    </div>
                    <div className="absolute bottom-8 md:bottom-12 left-0 w-full flex flex-col items-center justify-center z-10">
                      <h3 className="text-white font-outfit font-light tracking-[0.3em] uppercase text-xl md:text-2xl drop-shadow-md">Pressure Cookers</h3>
                      <div className="w-16 h-[2px] bg-white mt-4 drop-shadow-md opacity-80"></div>
                    </div>
                  </div>
                </figure>
              </Link>
            </div>

            {/* Product 4 */}
            <div className="sm:sticky sm:top-6 w-full">
              <Link href="/collections/all?q=Breakfast" className="block w-full">
                <figure className="w-full h-[70vh] flex items-center justify-center bg-black relative group cursor-pointer">
                  <div className="relative h-[90%] w-[70%] rounded-md shadow-[0_-5px_25px_rgba(0,0,0,0.8)] overflow-hidden">
                    <img
                      src="/catalog/real_product_3.jpg"
                      alt="3 in 1 Breakfast Makers"
                      className="w-full h-full object-cover align-bottom brightness-75 transition-all duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/60 pointer-events-none"></div>
                    <div className="absolute top-6 left-6 md:top-8 md:left-8 z-10 w-24 md:w-32 opacity-90 drop-shadow-lg">
                      <img src="/hero-logo.svg" alt="Crestline" className="w-full h-auto object-contain brightness-0 invert" />
                    </div>
                    <div className="absolute bottom-8 md:bottom-12 left-0 w-full flex flex-col items-center justify-center z-10">
                      <h3 className="text-white font-outfit font-light tracking-[0.3em] uppercase text-xl md:text-2xl drop-shadow-md">3 in 1 Breakfast Makers</h3>
                      <div className="w-16 h-[2px] bg-white mt-4 drop-shadow-md opacity-80"></div>
                    </div>
                  </div>
                </figure>
              </Link>
            </div>

            {/* Product 5 */}
            <div className="sm:sticky sm:top-8 w-full">
              <Link href="/collections/all?q=Infrared" className="block w-full">
                <figure className="w-full h-[70vh] flex items-center justify-center bg-black relative group cursor-pointer">
                  <div className="relative h-[90%] w-[75%] rounded-md shadow-[0_-5px_25px_rgba(0,0,0,0.8)] overflow-hidden">
                    <img
                      src="/catalog/real_product_4.png"
                      alt="Infrared Ceramic Cooker"
                      className="w-full h-full object-cover align-bottom brightness-75 transition-all duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/60 pointer-events-none"></div>
                    <div className="absolute top-6 left-6 md:top-8 md:left-8 z-10 w-24 md:w-32 opacity-90 drop-shadow-lg">
                      <img src="/hero-logo.svg" alt="Crestline" className="w-full h-auto object-contain brightness-0 invert" />
                    </div>
                    <div className="absolute bottom-8 md:bottom-12 left-0 w-full flex flex-col items-center justify-center z-10">
                      <h3 className="text-white font-outfit font-light tracking-[0.3em] uppercase text-xl md:text-2xl drop-shadow-md">Infrared Ceramic Cooker</h3>
                      <div className="w-16 h-[2px] bg-white mt-4 drop-shadow-md opacity-80"></div>
                    </div>
                  </div>
                </figure>
              </Link>
            </div>
          </>
        </section>
      </div>
    </ReactLenis>
  );
}
