import React, { useEffect, useRef } from 'react';

interface Props {
  url: string;
  onColorExtracted: (color: string) => void;
}

const DominantColorPicker: React.FC<Props> = ({ url, onColorExtracted }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!url) return;

    const img = new Image();
    img.src = url;
    img.crossOrigin = 'anonymous';
    img.referrerPolicy = 'no-referrer';

    img.onload = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      canvas.width = img.width;
      canvas.height = img.height;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      ctx.drawImage(img, 0, 0);
      const imageData = ctx.getImageData(0, 0, img.width, img.height).data;

      const colorCount: Record<string, number> = {};
      let maxColor = '';
      let maxCount = 0;

      for (let i = 0; i < imageData.length; i += 4) {
        const r = imageData[i];
        const g = imageData[i + 1];
        const b = imageData[i + 2];
        const a = imageData[i + 3];
        if (a < 128) continue;

        const key = `${Math.round(r / 10) * 10},${Math.round(g / 10) * 10},${Math.round(b / 10) * 10}`;
        colorCount[key] = (colorCount[key] || 0) + 1;

        if (colorCount[key] > maxCount) {
          maxCount = colorCount[key];
          maxColor = key;
        }
      }

      if (maxColor) {
        const [r, g, b] = maxColor.split(',').map(Number);
        const hex = `#${[r, g, b].map(x => x.toString(16).padStart(2, '0')).join('')}`;
        onColorExtracted(hex); // ✅ callback to parent
      }
    };
  }, [url, onColorExtracted]);

  return <canvas ref={canvasRef} style={{ display: 'none' }} />;
};

export default DominantColorPicker;
