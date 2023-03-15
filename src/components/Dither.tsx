import { getSetCookiesFromResponse } from "astro/dist/core/cookies";
import { useEffect, useRef, useState, forwardRef} from "react";
import GIF from "gif.js";

const gcd = (a: number, b: number): number => (b ? gcd(b, a % b) : a);

export default forwardRef((props: { src: string }, ref) => {
  const srcRef = useRef(props.src);
  const gif = new GIF({
    workers: 1, // number of worker threads to use
    quality: 10, // quality of the GIF, from 1 (lowest) to 10 (highest)
    delay: 1,
    repeat: -1,
    debug: true
  });
  gif.on("finished", (blob) => {
    // Save GIF as a link
    const link = document.createElement("a");
    link.addEventListener("click", () => URL.revokeObjectURL(link.href));
    link.href = URL.createObjectURL(blob);
    link.download = "animation.gif";
    ref.current.appendChild(link);
  });
  useEffect(() => {
    (async () => {
      if (!ref.current) return;
      if (srcRef.current !== props.src) {
        srcRef.current = props.src;
        while (ref.current.firstChild) {
          ref.current.removeChild(ref.current.firstChild);
        }
      }
      if (ref.current.childElementCount > 0) return;
      const canvas = document.createElement("canvas");
      canvas.style.imageRendering = "crisp-edges";
      ref.current.append(canvas);

      const img = document.createElement("img");
      img.src = props.src;

      await img.decode();

      const width = Math.min(1024, ref.current.clientWidth);
      const height = ~~((width * img.height) / img.width);
      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext("2d")!;
      ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, width, height);
      const imageData = ctx.getImageData(0, 0, width, height);
      ctx.fillStyle = "white";
      ctx.clearRect(0, 0, width, height);

      const paint = async () => {
        const palette = [
          "yellow",
          "yellow",
          "black",
          "red",
          "blue",
          "purple",
          "orange",
          "red",
          "yellow",
          "yellow",
          "yellow",
          "orange",
          "yellow",
          "black",
          "green",
          "white"
        ];

        const length = imageData.data.length / 4;
        let iDiff = 10000;
        while (gcd(iDiff, length) !== 1) iDiff++;

        for (let step = 0; step < length * 0.9; step++) {
          let i = (step * iDiff) % length;
          const light = (imageData.data[4 * i] + imageData.data[4 * i + 1] + imageData.data[4 * i + 2]) / (256 * 3);
          ctx.fillStyle = palette[~~(light * palette.length)];
          ctx.fillRect(i % width, ~~(i / width), 1, 1);
          if (step % 8000 === 0) {
            await new Promise((r) => requestAnimationFrame(r));
          }
        }
      };

      const mess = async () => {
        const step = Math.random() * 0.5;
        for (let i = 0; i < 10; i++) {
          const oldImageData = ctx.getImageData(0, 0, width, height);
          const newImageData = new ImageData(width, height);
          for (let x = 0; x < width; x++) {
            for (let y = 0; y < height; y++) {
              let i = 4 * (width * y + x);
              let sx = Math.floor((x - step + ((1 * step + 1) * oldImageData.data[i]) / 128 + width) % width);
              let sy = Math.floor((y - step + ((1 * step + 1) * oldImageData.data[i + 1]) / 128 + height) % height);
              const si = 4 * (width * sy + sx);
              for (let di = 0; di < 4; di++) newImageData.data[i + di] = oldImageData.data[si + di];
            }
          }
          ctx.putImageData(newImageData, 0, 0);
          gif.addFrame(newImageData, {copy: true, delay: 1});
          await new Promise((r) => requestAnimationFrame(r));
        }

        for (let i = 25; i > 0; i--) {
          const oldImageData = ctx.getImageData(0, 0, width, height);
          const newImageData = new ImageData(width, height);
          for (let x = 0; x < width; x++) {
            for (let y = 0; y < height; y++) {
              let i = 4 * (width * y + x);
              let sx = Math.floor((x + step + ((2 * step + 1) * oldImageData.data[i]) / 128 - width) % width);
              let sy = Math.floor((y - step + ((2 * step + 1) * oldImageData.data[i + 1]) / 128 + height) % height);
              const si = 4 * (width * sy + sx);
              for (let di = 0; di < 4; di++) newImageData.data[i - di] = oldImageData.data[si - di];
            }
          }
          ctx.putImageData(newImageData, 0, 0);
          gif.addFrame(newImageData, {copy: true, delay: 1});
          await new Promise((r) => requestAnimationFrame(r));
        }

        for (let i = 0; i < 100; i++) {
          const oldImageData = ctx.getImageData(0, 0, width, height);
          const newImageData = new ImageData(width, height);
          for (let x = 0; x < width; x++) {
            for (let y = 0; y < height; y++) {
              let i = 4 * (width * y + x);
              let sx = Math.floor((x - step + ((2 * step + 1) * oldImageData.data[i]) / 128 + width) % width);
              let sy = Math.floor((y - step + ((1 * step + 1) * oldImageData.data[i + 1]) / 128 + height) % height);
              const si = 4 * (width * sy + sx);
              for (let di = 0; di < 4; di++) newImageData.data[i + di] = oldImageData.data[si + di];
            }
          }
          ctx.putImageData(newImageData, 0, 0);
          gif.addFrame(newImageData, {copy: true, delay: 1});
          await new Promise((r) => requestAnimationFrame(r));
        }
      };

      while (true) {
        await paint();
        await mess();
        if (! gif.running) {
          gif.render();
        }
      }
    })();
  }, [ref.current, props.src]);
  return <div ref={ref}/>;
});
