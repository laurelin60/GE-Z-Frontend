"use client";

import React, { useEffect, useRef } from "react";
import { Mesh, Program, Renderer, Triangle } from "ogl";

interface PlasmaProps {
    color?: string;
    speed?: number;
    direction?: "forward" | "reverse" | "pingpong";
    scale?: number;
    opacity?: number;
    mouseInteractive?: boolean;
    /** Target frames per second (default: 24). Lower = less CPU/GPU usage */
    targetFPS?: number;
    /** Shader quality: iterations per pixel. "low" = 30, "medium" = 45, "high" = 60 */
    quality?: "low" | "medium" | "high";
    /** Max device pixel ratio (default: 1). Lower = fewer pixels to render */
    maxDPR?: number;
}

const hexToRgb = (hex: string): [number, number, number] => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (!result) return [1, 0.5, 0.2];
    return [
        parseInt(result[1], 16) / 255,
        parseInt(result[2], 16) / 255,
        parseInt(result[3], 16) / 255,
    ];
};

const QUALITY_ITERATIONS = {
    low: 30,
    medium: 45,
    high: 60,
} as const;

const vertex = `#version 300 es
precision highp float;
in vec2 position;
in vec2 uv;
out vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

// Generate fragment shader with configurable iteration count
const createFragment = (iterations: number) => `#version 300 es
precision highp float;
uniform vec2 iResolution;
uniform float iTime;
uniform vec3 uCustomColor;
uniform float uUseCustomColor;
uniform float uSpeed;
uniform float uDirection;
uniform float uScale;
uniform float uOpacity;
uniform vec2 uMouse;
uniform float uMouseInteractive;
out vec4 fragColor;

void mainImage(out vec4 o, vec2 C) {
  vec2 center = iResolution.xy * 0.5;
  C = (C - center) / uScale + center;
  
  vec2 mouseOffset = (uMouse - center) * 0.0002;
  C += mouseOffset * length(C - center) * step(0.5, uMouseInteractive);
  
  float i, d, z, T = iTime * uSpeed * uDirection;
  vec3 O, p, S;

  for (vec2 r = iResolution.xy, Q; ++i < ${iterations.toFixed(1)}; O += o.w/d*o.xyz) {
    p = z*normalize(vec3(C-.5*r,r.y)); 
    p.z -= 4.; 
    S = p;
    d = p.y-T;
    
    p.x += .4*(1.+p.y)*sin(d + p.x*0.1)*cos(.34*d + p.x*0.05); 
    Q = p.xz *= mat2(cos(p.y+vec4(0,11,33,0)-T)); 
    z+= d = abs(sqrt(length(Q*Q)) - .25*(5.+S.y))/3.+8e-4; 
    o = 1.+sin(S.y+p.z*.5+S.z-length(S-p)+vec4(2,1,0,8));
  }
  
  o.xyz = tanh(O/1e4);
}

bool finite1(float x){ return !(isnan(x) || isinf(x)); }
vec3 sanitize(vec3 c){
  return vec3(
    finite1(c.r) ? c.r : 0.0,
    finite1(c.g) ? c.g : 0.0,
    finite1(c.b) ? c.b : 0.0
  );
}

void main() {
  vec4 o = vec4(0.0);
  mainImage(o, gl_FragCoord.xy);
  vec3 rgb = sanitize(o.rgb);
  
  // Calculate brightness of the plasma effect
  float brightness = dot(rgb, vec3(0.299, 0.587, 0.114));
  
  // Use custom color directly - brightness only affects alpha, not color
  vec3 finalColor = mix(rgb, uCustomColor, step(0.5, uUseCustomColor));
  
  // Use brightness as alpha - swirls are visible, background is transparent
  float alpha = clamp(brightness * uOpacity, 0.0, 1.0);
  
  fragColor = vec4(finalColor, alpha);
}`;

export const Plasma: React.FC<PlasmaProps> = ({
    color = "#ffffff",
    speed = 1,
    direction = "forward",
    scale = 1,
    opacity = 1,
    mouseInteractive = false,
    targetFPS = 24,
    quality = "high",
    maxDPR = 1,
}) => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const mousePos = useRef({ x: 0, y: 0 });

    useEffect(() => {
        if (!containerRef.current) return;

        const useCustomColor = color ? 1.0 : 0.0;
        const customColorRgb = color ? hexToRgb(color) : [1, 1, 1];

        const directionMultiplier = direction === "reverse" ? -1.0 : 1.0;

        // Generate shader with quality-based iterations
        const iterations = QUALITY_ITERATIONS[quality];
        const fragment = createFragment(iterations);

        const renderer = new Renderer({
            webgl: 2,
            alpha: true,
            antialias: false,
            dpr: Math.min(window.devicePixelRatio || 1, maxDPR),
            preserveDrawingBuffer: true,
        });
        const gl = renderer.gl;
        gl.clearColor(0, 0, 0, 0); // Transparent background
        gl.enable(gl.BLEND);
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
        const canvas = gl.canvas as HTMLCanvasElement;
        canvas.style.display = "block";
        canvas.style.width = "100%";
        canvas.style.height = "100%";
        containerRef.current.appendChild(canvas);

        const geometry = new Triangle(gl);

        const program = new Program(gl, {
            vertex: vertex,
            fragment: fragment,
            uniforms: {
                iTime: { value: 0 },
                iResolution: { value: new Float32Array([1, 1]) },
                uCustomColor: { value: new Float32Array(customColorRgb) },
                uUseCustomColor: { value: useCustomColor },
                uSpeed: { value: speed * 0.4 },
                uDirection: { value: directionMultiplier },
                uScale: { value: scale },
                uOpacity: { value: opacity },
                uMouse: { value: new Float32Array([0, 0]) },
                uMouseInteractive: { value: mouseInteractive ? 1.0 : 0.0 },
            },
        });

        const mesh = new Mesh(gl, { geometry, program });

        const handleMouseMove = (e: MouseEvent) => {
            if (!mouseInteractive) return;
            const rect = containerRef.current!.getBoundingClientRect();
            mousePos.current.x = e.clientX - rect.left;
            mousePos.current.y = e.clientY - rect.top;
            const mouseUniform = program.uniforms.uMouse.value as Float32Array;
            mouseUniform[0] = mousePos.current.x;
            mouseUniform[1] = mousePos.current.y;
        };

        if (mouseInteractive) {
            containerRef.current.addEventListener("mousemove", handleMouseMove);
        }

        // Track pending size to apply in render loop (prevents flickering)
        let pendingWidth = 0;
        let pendingHeight = 0;
        let needsResize = true;

        const updatePendingSize = () => {
            const rect = containerRef.current!.getBoundingClientRect();
            pendingWidth = Math.max(1, Math.floor(rect.width));
            pendingHeight = Math.max(1, Math.floor(rect.height));
            needsResize = true;
        };

        const ro = new ResizeObserver(updatePendingSize);
        ro.observe(containerRef.current);
        updatePendingSize();

        // Animation state
        let raf = 0;
        let isRunning = true;
        let isVisible = !document.hidden;
        let isInViewport = true;
        const t0 = performance.now();

        // Frame rate throttling
        const frameInterval = 1000 / targetFPS;
        let lastFrameTime = 0;

        const loop = (t: number) => {
            if (!isRunning) return;

            // Schedule next frame first
            raf = requestAnimationFrame(loop);

            // Skip frame if not enough time has passed (frame rate throttling)
            if (t - lastFrameTime < frameInterval) return;
            lastFrameTime = t;

            // Skip rendering if not visible
            if (!isVisible || !isInViewport) return;

            // Apply resize in render loop to prevent flickering
            if (needsResize) {
                renderer.setSize(pendingWidth, pendingHeight);
                const res = program.uniforms.iResolution.value as Float32Array;
                res[0] = gl.drawingBufferWidth;
                res[1] = gl.drawingBufferHeight;
                needsResize = false;
            }

            let timeValue = (t - t0) * 0.001;
            if (direction === "pingpong") {
                const pingpongDuration = 10;
                const segmentTime = timeValue % pingpongDuration;
                const isForward =
                    Math.floor(timeValue / pingpongDuration) % 2 === 0;
                const u = segmentTime / pingpongDuration;
                const smooth = u * u * (3 - 2 * u);
                const pingpongTime = isForward
                    ? smooth * pingpongDuration
                    : (1 - smooth) * pingpongDuration;
                (program.uniforms.uDirection as any).value = 1.0;
                (program.uniforms.iTime as any).value = pingpongTime;
            } else {
                (program.uniforms.iTime as any).value = timeValue;
            }
            renderer.render({ scene: mesh });
        };

        // Visibility change handler (tab visibility)
        const handleVisibilityChange = () => {
            isVisible = !document.hidden;
        };
        document.addEventListener("visibilitychange", handleVisibilityChange);

        // Intersection observer (viewport visibility)
        const io = new IntersectionObserver(
            ([entry]) => {
                isInViewport = entry.isIntersecting;
            },
            { threshold: 0 }
        );
        io.observe(containerRef.current);

        // Start animation loop
        raf = requestAnimationFrame(loop);

        return () => {
            isRunning = false;
            cancelAnimationFrame(raf);
            ro.disconnect();
            io.disconnect();
            document.removeEventListener(
                "visibilitychange",
                handleVisibilityChange
            );
            if (mouseInteractive && containerRef.current) {
                containerRef.current.removeEventListener(
                    "mousemove",
                    handleMouseMove
                );
            }
            try {
                containerRef.current?.removeChild(canvas);
            } catch {}
        };
    }, [
        color,
        speed,
        direction,
        scale,
        opacity,
        mouseInteractive,
        targetFPS,
        quality,
        maxDPR,
    ]);

    return (
        <div
            ref={containerRef}
            className="relative h-full w-full overflow-hidden"
        />
    );
};

export default Plasma;
