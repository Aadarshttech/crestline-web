import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

function parseFontSize(value, fallback) {
  if (typeof value === "number" && isFinite(value) && value > 0) return value;
  if (typeof value === "string") {
    const n = parseFloat(value);
    if (isFinite(n) && n > 0) return n;
  }
  return fallback;
}

function parseLineHeight(value, fontSizePx, fallback) {
  if (typeof value === "number" && isFinite(value) && value > 0) return value;
  if (typeof value === "string") {
    if (value.endsWith("%")) {
      const n = parseFloat(value);
      if (isFinite(n) && n > 0) return n / 100;
    }
    if (value.endsWith("px")) {
      const n = parseFloat(value);
      if (isFinite(n) && n > 0 && fontSizePx > 0) return n / fontSizePx;
    }
    const n = parseFloat(value);
    if (isFinite(n) && n > 0) return n;
  }
  return fallback;
}

export default function ScrollWordHighlight(props) {
  const {
    prefixText = "We shape",
    items = ["ideas", "brands", "identities", "interactions", "interfaces", "experiences"],
    screenReaderText = "",
    animationMode = "spotlight",
    prefixPlacement = "middle",
    placementOffset = 40,
    backgroundColor = "rgba(0, 0, 0, 0)",
    textColor = "#000000",
    inactiveOpacity = 0.2,
    font = { fontFamily: "Inter, system-ui, -apple-system, sans-serif", fontWeight: 800, fontSize: 124, lineHeight: 1.1 },
    gap = 16,
    style
  } = props;

  const sectionRef = useRef(null);
  const safeItems = (items || []).filter(Boolean);

  const fontSizePx = parseFontSize(font?.fontSize, 124);
  const fontLineHeight = parseLineHeight(font?.lineHeight, fontSizePx, 1.1);
  const lineHeightPx = fontSizePx * fontLineHeight;
  const halfLine = lineHeightPx / 2;

  const stickyTop =
    prefixPlacement === "top"
      ? `${placementOffset}px`
      : prefixPlacement === "bottom"
      ? `calc(100vh - ${lineHeightPx}px - ${placementOffset}px)`
      : `calc(50vh - ${halfLine}px)`;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start center", "end center"]
  });

  // Calculate total translation distance for the slot-machine slide
  const totalY = -(safeItems.length - 1) * lineHeightPx;
  const slideY = useTransform(scrollYProgress, [0, 1], [0, totalY]);

  const isSlide = animationMode === "slide";

  return (
    <section
      ref={sectionRef}
      style={{
        width: "100%",
        ...font,
        backgroundColor,
        color: textColor,
        boxSizing: "border-box",
        ...style
      }}
    >
      <div
        className="flex flex-row flex-wrap md:flex-nowrap items-start w-full justify-center md:justify-start"
        style={{
          gap,
          boxSizing: "border-box",
          ...(isSlide ? { height: safeItems.length * lineHeightPx } : {})
        }}
      >
        <h2
          className="bg-black md:bg-transparent z-10"
          style={{
            position: "sticky",
            top: stickyTop,
            margin: 0,
            font: "inherit",
            height: "fit-content",
            flexShrink: 0,
            whiteSpace: "nowrap",
            paddingRight: "1rem"
          }}
        >
          <span aria-hidden="true">{prefixText}&nbsp;</span>
          <span style={srOnly}>{screenReaderText || `${prefixText} ${safeItems.join(", ")}`}</span>
        </h2>

        {isSlide ? (
          <div
            style={{
              overflow: "hidden",
              height: lineHeightPx,
              position: "sticky",
              top: stickyTop,
              flex: 1
            }}
          >
            <motion.ul
              style={{
                listStyle: "none",
                margin: 0,
                padding: 0,
                y: slideY
              }}
            >
              {safeItems.map((item, i) => (
                <li key={`${item}-${i}`} style={{ height: lineHeightPx }}>
                  {item}
                </li>
              ))}
            </motion.ul>
          </div>
        ) : (
          <ul
            style={{
              listStyle: "none",
              margin: 0,
              padding: 0,
              flex: 1
            }}
          >
            {safeItems.map((item, i) => {
              // Calculate the range for this specific item to be active
              const start = (i - 0.5) / safeItems.length;
              const peak = i / safeItems.length;
              const end = (i + 0.5) / safeItems.length;
              
              // eslint-disable-next-line react-hooks/rules-of-hooks
              const opacity = useTransform(
                scrollYProgress,
                [start, peak, end],
                [inactiveOpacity, 1, inactiveOpacity]
              );

              return (
                <motion.li
                  key={`${item}-${i}`}
                  style={{
                    opacity: opacity,
                    willChange: "opacity"
                  }}
                >
                  {item}
                </motion.li>
              );
            })}
          </ul>
        )}
      </div>
    </section>
  );
}

const srOnly = {
  position: "absolute",
  width: 1,
  height: 1,
  padding: 0,
  margin: -1,
  overflow: "hidden",
  clip: "rect(0, 0, 0, 0)",
  whiteSpace: "nowrap",
  border: 0
};