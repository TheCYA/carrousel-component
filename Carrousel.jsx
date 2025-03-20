"use client";
import { useState, useEffect, useRef } from "react";
import Button from "./Button";
import "./carrousel.css";

export default function Carrousel({ img, visibleCount }) {
  const [positions, setPositions] = useState([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    const initialPositions = img.map((_, index) => ({ x: index }));
    if (initialPositions.length) {
      initialPositions[initialPositions.length - 1] = { x: -1 };
    }
    setPositions(initialPositions);
  }, [img]);

  useEffect(() => {
    startAutoSlide();
    return () => stopAutoSlide();
  })

  function startAutoSlide() {
    stopAutoSlide();
    intervalRef.current = setInterval(moveRight,3000)
  }

  function stopAutoSlide(){
    if (intervalRef.current) clearInterval(intervalRef.current)
  }

  function moveRight() {
    if (isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 220);
    setPositions((prevPositions) =>
      prevPositions.map((pos) =>
        pos.x >= img.length - 2 ? { x: -1 } : { x: pos.x + 1 }
      )
    );
  };

  function moveLeft() {
    if (isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 220);

    setPositions((prevPositions) =>
      prevPositions.map((pos) =>
        pos.x <= -1 ? { x: img.length - 2 } : { x: pos.x - 1 }
      )
    );
  };

  return (
    <div className="container">
      <div className="btn-container">
        <Button variant="pink" onClick={moveLeft} disabled={isAnimating}>
          {"<"}
        </Button>
      </div>
      <div className="carrousel">
        <div className="wrapper">
          {positions.map((pos, index) => (
            <img
              key={index}
              src={img[index]}
              className={pos.x >= 0 && pos.x < visibleCount ? "" : "hidden"}
              style={{
                width: `${100 / visibleCount}%`,
                transform: `translate(${100 * pos.x}%, -50%) scale(${pos.x === 1  && visibleCount === 3 ? 1.5 : 1})`,
              }}
            />
          ))}
        </div>
      </div>
      <div className="btn-container">
        <Button variant="pink" onClick={moveRight} disabled={isAnimating}>
          {">"}
        </Button>
      </div>
    </div>
  );
}
