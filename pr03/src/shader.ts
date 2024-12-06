export const shaderSource = `void mainImage(out vec4 fragColor, in vec2 fragCoord)
{
    // Get the normalized coordinates of the fragment
    vec2 uv = fragCoord.xy / iResolution.xy;

    // Center the UV coordinates around (0, 0)
    uv -= 0.5;

    // Aspect ratio correction (for non-square resolutions)
    uv.y *= iResolution.y / iResolution.x;

    // Calculate the rotation angle based on time
    float angle = iTime * 0.25;

    // Rotation matrix
    mat2 rot = mat2(
        cos(angle), sin(angle),
        -sin(angle),  cos(angle)
    );

    // Apply a scale factor to avoid blank regions
    float scaleFactor = 0.7; // Scale to cover diagonal
    uv *= scaleFactor;

    // Apply rotation
    uv = rot * uv;

    // Translate UV back to [0, 1]
    uv += 0.5;

    // Load background texture or set default color
    vec3 color;
    if (uv.x >= 0.0 && uv.x <= 1.0 && uv.y >= 0.0 && uv.y <= 1.0) {
        // Use a texture if available, e.g., iChannel0
        color = texture(iChannel0, uv).rgb;
    } else {
        // Fallback to solid background color if outside range
        color = vec3(0.2, 0.4, 0.6); // A light blue color
    }

    // Output the final color
    fragColor = vec4(color, 1.0);
}
`;
