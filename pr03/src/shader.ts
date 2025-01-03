export const shaderSource = `//canvas rotation setup
#define SCALE 0.8
#define ZOOM 1.0
const float PI = 3.1416;

// Take this and multiply your UV by the resulting mat2 to get the rotation
mat2 rotationMatrix(float angle)
{
    angle *= PI / 180.0;
    float sine = sin(angle), cosine = cos(angle);
    return mat2(cosine, -sine, sine, cosine);
}

float random (vec2 st) {
    return fract(sin(dot(st.xy,vec2(12.9898, 78.233))) * 43758.5453123);
}

float smooth_step( float min, float max, float x )
{
    float t = (x - min) / (max - min);
    t = clamp(t, 0.0, 1.0);
    t = t * t * (3.0 - 2.0 * t); // smoothstep formula
    return t;
}

float step2( float min, float max, float x )
{
    float t = (x - min) / (max - min);
    t = clamp(t, 0.0, 1.0);
    return t;
}

/*
iChannel1: Normal Map
iChannel2: dark orbs
iChannel3: bright orbs
*/
void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    vec2 uv = fragCoord.xy / iResolution.xy;
    uv -= 0.5;
    uv.y *= iResolution.y / iResolution.x;
    uv *= SCALE;
    uv *= rotationMatrix(iTime) * ZOOM;
    uv += 0.5;

    vec4 col = vec4(0.0);
    vec4 img0 = texture(iChannel0, uv);
    vec4 img1 = texture(iChannel1, uv);
    vec4 img2 = texture(iChannel2, uv);
    vec4 img3 = texture(iChannel3, uv);

    vec3 normals= 1.5 * img1.rgb - vec3(1.0);
    normals = normals / length(normals);
    int n_samples = 100;
    float d = 0.5;
    float R = d;
    vec3 shader_point = vec3(fragCoord, (1.0 + d) * img0.x - d);
    float a = 5.0;

    vec3 light_position = vec3(iMouse.xy, 50.0);

    vec3 light_vector = light_position - shader_point;
    vec3 light_dir = light_vector / length(light_vector);
    for (int i = 0; i < n_samples; i++) {
        vec3 pos = (
            shader_point
            + float(i) * d * a * light_dir
            + 0.0125 * vec3(random(shader_point.xy))
        );
        vec2 pos_uv = pos.xy / iResolution.xy;
        vec4 H = texture(iChannel0, pos_uv);
        if(H.x > pos.z) R = R + d;
    }
    float t = d / R;
    t = 2.0 * pow(t, 0.45);
    t = clamp(t, 0.0, 1.0);
    float dif = 0.5 * dot(light_dir, normals) + 0.5;
    float W = pow(dif, 10.0);
    t = dif;
    col = img2 * (1.0 - t) + img3 * t;
    fragColor = vec4(col);
}
`;
