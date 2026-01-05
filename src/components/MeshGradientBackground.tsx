"use client";

import { MeshGradient } from "@paper-design/shaders-react";

export function MeshGradientBackground() {
    return (
        <MeshGradient
            fit="cover"
            colors={["#ffffff", "#0f7cb3"]}
            distortion={0.16}
            swirl={1}
            grainMixer={0.18}
            grainOverlay={0}
            speed={2}
            scale={0.76}
            offsetX={0.6}
        />
    );
}

