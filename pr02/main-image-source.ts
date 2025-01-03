const mainImageSource = `void mainImage(out vec4 fragColor, in vec2 fragCoord) {
	// Get normalized coordinates (range -1.0 to 1.0 with respect to the screen center)
	vec2 uv = fragCoord / iResolution.xy;
	uv -= 0.5;
	uv.x *= iResolution.x / iResolution.y;

	// Time parameter to animate the swirl
	float time = iTime * 0.5;

	// Create a background spiral swirl effect
	float radius = length(uv);
	float angle = atan(uv.y, uv.x);
    
	// Spiral effect for the background - waves rotating towards the center
	float spiralFactor = sin(angle * 8.0 - time * 3.0) * 0.1;
	float intensity = smoothstep(0.4, 0.0, radius + spiralFactor);
	vec3 bgColor = mix(vec3(0.1, 0.0, 0.2), vec3(0.3, 0.0, 0.6), intensity);

	// Orb effect: moving towards the center in a spiral
	vec3 orbColor = vec3(0.0);
	for (int i = 0; i < 8; i++) {
    	float orbAngle = time + float(i) * 3.14 / 4.0;
    	float orbRadius = 0.3 - mod(time * 0.1 + float(i) * 0.05, 0.3);
    	vec2 orbPos = orbRadius * vec2(cos(orbAngle), sin(orbAngle));

    	// Decrease orb size as it approaches the center
    	float orbSize = mix(0.02, 0.2, orbRadius);

    	// Check distance to orb position
    	float orbDist = length(uv - orbPos);
    	orbColor += vec3(0.2, 0.8, 1.0) * smoothstep(orbSize, orbSize * 0.4, orbDist);
	}

	// Combine the background and orb colors
	fragColor = vec4(bgColor + orbColor, 1.0);
}
`;

export default mainImageSource;
