'use client';

import { useEffect, useRef } from 'react';

export default function WebGLBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvasElement = canvasRef.current;

    if (!canvasElement) {
      return;
    }

    const webglContext = canvasElement.getContext('webgl');

    if (!webglContext) {
      console.warn('WebGL is not supported');
      return;
    }

    // From this point onward both are guaranteed non-null.
    const canvas: HTMLCanvasElement = canvasElement;
    const gl: WebGLRenderingContext = webglContext;

    // --------------------------------------------------
    // Theme background: pure black in dark mode, pure white in light
    // --------------------------------------------------

    function getBackgroundColor(): [number, number, number] {
      const isDark = document.documentElement.classList.contains('dark');

      return isDark ? [0, 0, 0] : [1, 1, 1];
    }

    function syncSize() {
      const width = canvas.clientWidth || 1280;
      const height = canvas.clientHeight || 720;

      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);

      const displayWidth = Math.floor(width * pixelRatio);

      const displayHeight = Math.floor(height * pixelRatio);

      if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
        canvas.width = displayWidth;
        canvas.height = displayHeight;
      }
    }

    syncSize();

    const resizeObserver = new ResizeObserver(syncSize);

    resizeObserver.observe(canvas);

    // --------------------------------------------------
    // Vertex Shader
    // --------------------------------------------------

    const vertexShaderSource = `
      attribute vec2 a_position;

      varying vec2 v_texCoord;

      void main() {
        v_texCoord = a_position * 0.5 + 0.5;

        gl_Position = vec4(
          a_position,
          0.0,
          1.0
        );
      }
    `;

    // --------------------------------------------------
    // Fragment Shader
    // --------------------------------------------------

    const fragmentShaderSource = `
      precision highp float;

      uniform float u_time;
      uniform vec2 u_resolution;
      uniform vec2 u_mouse;
      uniform vec3 u_backgroundColor;
      uniform vec3 u_accentColor;
      uniform float u_accentStrength;

      varying vec2 v_texCoord;

      void main() {

        vec2 uv = v_texCoord;

        float noise =
          sin(uv.x * 3.0 + u_time * 0.5) *
          cos(uv.y * 2.0 - u_time * 0.3);

        noise +=
          sin(uv.y * 5.0 + u_time * 0.8) *
          0.5;

        float strength =
          smoothstep(
            0.3,
            0.8,
            noise * 0.5 + 0.5
          );

        vec2 mouseNorm =
          u_mouse / u_resolution;

        float mouseGlow =
          1.0 -
          smoothstep(
            0.0,
            0.4,
            length(uv - mouseNorm)
          );

        // Start from the exact theme color (pure black or pure white).
        // No vignette / multiplicative darkening here, so edges never
        // drift toward black in light mode.
        vec3 finalColor =
          mix(
            u_backgroundColor,
            u_accentColor,
            strength * u_accentStrength
          );

        finalColor =
          mix(
            finalColor,
            u_accentColor,
            mouseGlow * u_accentStrength * 0.65
          );

        gl_FragColor =
          vec4(finalColor, 1.0);
      }
    `;

    // --------------------------------------------------
    // Shader helper
    // --------------------------------------------------

    function createShader(type: number, source: string): WebGLShader | null {
      const shader = gl.createShader(type);

      if (!shader) {
        console.error('Unable to create shader');
        return null;
      }

      gl.shaderSource(shader, source);
      gl.compileShader(shader);

      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('Shader compilation error:', gl.getShaderInfoLog(shader));

        gl.deleteShader(shader);

        return null;
      }

      return shader;
    }

    // --------------------------------------------------
    // Create shaders
    // --------------------------------------------------

    const vertexShader = createShader(gl.VERTEX_SHADER, vertexShaderSource);

    const fragmentShader = createShader(gl.FRAGMENT_SHADER, fragmentShaderSource);

    if (!vertexShader || !fragmentShader) {
      resizeObserver.disconnect();
      return;
    }

    // --------------------------------------------------
    // Create program
    // --------------------------------------------------

    const program = gl.createProgram();

    if (!program) {
      console.error('Unable to create WebGL program');

      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);

      resizeObserver.disconnect();

      return;
    }

    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Program linking error:', gl.getProgramInfoLog(program));

      gl.deleteProgram(program);
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);

      resizeObserver.disconnect();

      return;
    }

    gl.useProgram(program);

    // --------------------------------------------------
    // Fullscreen rectangle
    // --------------------------------------------------

    const buffer = gl.createBuffer();

    if (!buffer) {
      console.error('Unable to create WebGL buffer');

      gl.deleteProgram(program);
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);

      resizeObserver.disconnect();

      return;
    }

    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);

    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);

    // --------------------------------------------------
    // Attribute
    // --------------------------------------------------

    const position = gl.getAttribLocation(program, 'a_position');

    if (position === -1) {
      console.error('Could not find a_position attribute');

      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);

      resizeObserver.disconnect();

      return;
    }

    gl.enableVertexAttribArray(position);

    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

    // --------------------------------------------------
    // Uniforms
    // --------------------------------------------------

    const uTime = gl.getUniformLocation(program, 'u_time');

    const uResolution = gl.getUniformLocation(program, 'u_resolution');

    const uMouse = gl.getUniformLocation(program, 'u_mouse');

    const uBackgroundColor = gl.getUniformLocation(program, 'u_backgroundColor');

    const uAccentColor = gl.getUniformLocation(program, 'u_accentColor');

    const uAccentStrength = gl.getUniformLocation(program, 'u_accentStrength');

    if (uTime === null || uResolution === null || uMouse === null || uBackgroundColor === null || uAccentColor === null || uAccentStrength === null) {
      console.error('Could not find required uniforms');

      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);

      resizeObserver.disconnect();

      return;
    }

    // --------------------------------------------------
    // Mouse
    // --------------------------------------------------

    let mouseX = canvas.width / 2;
    let mouseY = canvas.height / 2;

    function handleMouseMove(event: MouseEvent) {
      const rect = canvas.getBoundingClientRect();

      if (rect.width === 0 || rect.height === 0) {
        return;
      }

      const normalizedX = (event.clientX - rect.left) / rect.width;

      const normalizedY = 1 - (event.clientY - rect.top) / rect.height;

      mouseX = normalizedX * canvas.width;

      mouseY = normalizedY * canvas.height;
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // --------------------------------------------------
    // Theme
    // --------------------------------------------------

    function updateBackgroundColor() {
      const isDark = document.documentElement.classList.contains('dark');

      const [r, g, b] = getBackgroundColor();

      gl.uniform3f(uBackgroundColor, r, g, b);

      if (isDark) {
        // On black: a brighter, more saturated teal reads clearly at a
        // gentle blend strength.
        gl.uniform3f(uAccentColor, 0.0, 0.55, 0.5);
        gl.uniform1f(uAccentStrength, 0.22);
      } else {
        // On white: the same low-opacity teal looks washed out, so use a
        // deeper, more saturated tone and blend it in more strongly.
        gl.uniform3f(uAccentColor, 0.0, 0.32, 0.29);
        gl.uniform1f(uAccentStrength, 0.4);
      }
    }

    // Initial theme color
    updateBackgroundColor();

    // Detect .dark class changes on <html>
    const themeObserver = new MutationObserver(() => {
      updateBackgroundColor();
    });

    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    // --------------------------------------------------
    // Animation
    // --------------------------------------------------

    let animationFrame = 0;

    function render(time: number) {
      gl.viewport(0, 0, canvas.width, canvas.height);

      gl.uniform1f(uTime, time * 0.001);

      gl.uniform2f(uResolution, canvas.width, canvas.height);

      gl.uniform2f(uMouse, mouseX, mouseY);

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

      animationFrame = requestAnimationFrame(render);
    }

    animationFrame = requestAnimationFrame(render);

    // --------------------------------------------------
    // Cleanup
    // --------------------------------------------------

    return () => {
      cancelAnimationFrame(animationFrame);

      window.removeEventListener('mousemove', handleMouseMove);

      resizeObserver.disconnect();

      themeObserver.disconnect();

      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden="true" />;
}
