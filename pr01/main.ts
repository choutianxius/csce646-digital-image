const mainImageSource = `
float noise(vec2 x){
    vec2 f = fract(x);
    vec2 u = f*f*f*(f*(f*6.0-15.0)+10.0);
    vec2 du = 30.0*f*f*(f*(f-2.0)+1.0);

    vec2 p = floor(x);
	float a = texture(iChannel0, (p+vec2(0.0, 0.0))/1024.0).x;
	float b = texture(iChannel0, (p+vec2(1.0,0.0))/1024.0).x;
	float c = texture(iChannel0, (p+vec2(0.0,1.0))/1024.0).x;
	float d = texture(iChannel0, (p+vec2(1.0,1.0))/1024.0).x;

	return a+(b-a)*u.x+(c-a)*u.y+(a-b-c+d)*u.x*u.y;
}

float fbm(vec2 x, int detail){
    float a = 0.0;
    float b = 1.0;
    float t = 0.0;
    for(int i = 0; i < detail; i++){
        float n = noise(x);
        a += b*n;
        t += b;
        b *= 0.7;
        x *= 2.0;
    }
    return a/t;
}

float fbm2(vec2 x, int detail){
    float a = 0.0;
    float b = 1.0;
    float t = 0.0;
    for(int i = 0; i < detail; i++){
        float n = noise(x);
        a += b*n;
        t += b;
        b *= 0.9;
        x *= 2.0;
    }
    return a/t;
}

float box(vec2 uv, float x1, float x2, float y1, float y2){
    return (uv.x > x1 && uv.x < x2 && uv.y > y1 && uv.y < y2)?1.0:0.0;
}

#define dot2(v) dot(v, v)
#define layer(dh, v)  if (uv.y < h + midlevel - (dh) ) return vec4(v, 1.);

vec4 foreground(vec2 uv, float t){
    float midlevel;
    float h;
    float disp;
    float dist;
    vec2 uv2;

    uv.y -= 0.2;
    // clouds foreground //////////////////////////////////////////////////////

    // c14
    midlevel = -0.1;
    disp = 1.7;
    dist = 1.0;
    uv2 = uv + vec2(t/dist + 40.0, 0.0);
    h = (fbm(uv2, 8) - 0.5)*disp;
    layer(0.12, vec3(0.43, 0.32, 0.31));
    layer(0.08, vec3(0.55, 0.42, 0.41));
    layer(0.04, vec3(0.66, 0.42, 0.40));
    layer(0., vec3(0.77, 0.48, 0.46));

    // c13

    midlevel = 0.05;
    disp = 1.7;
    dist = 2.0;
    uv2 = uv + vec2(t/dist + 38.0, 0.0);
    h = (fbm(uv2, 8) - 0.5)*disp;
    layer(0.1, vec3(0.95, 0.66, 0.48));
    layer(0.04, vec3(0.98, 0.76, 0.64));
    layer(0., vec3(0.95, 0.80, 0.77));

    return vec4(0.95, 0.80, 0.77, 0.);
}

vec4 background(vec2 uv, float t){
    float midlevel;
    float h;
    float disp;
    float dist;
    vec2 uv2;

    // clouds ///////////////////////////////////////////////////////

    // c12
    midlevel = 0.3;
    disp = 0.9;
    dist = 10.0;
    uv2 = uv + vec2(t/dist + 32.5, 0.0);
    h = (fbm(uv2, 8) - 0.5)*disp;
    layer(0.14, vec3(0.48, 0.19, 0.20));
    layer(0.1, vec3(0.68, 0.28, 0.19));
    layer(0.07, vec3(0.88, 0.38, 0.24));
    layer(0., vec3(0.95, 0.45, 0.30));

    // c11
    midlevel = 0.35;
    disp = 1.0;
    dist = 15.0;
    uv2 = uv + vec2(t/dist + 30.0, 0.0);
    h = (fbm(uv2, 8) - 0.5)*disp;
    layer(0.04, vec3(0.98, 0.76, 0.64));
    layer(0., vec3(0.95, 0.80, 0.77));

    // c10
    midlevel = 0.35;
    disp = 3.5;
    dist = 20.0;
    uv2 = uv + vec2(t/dist + 27.5, 0.0);
    h = (fbm(uv2, 8) - 0.5)*disp;
    layer(0.12, vec3(0.43, 0.32, 0.31));
    layer(0.08, vec3(0.55, 0.42, 0.41));
    layer(0.04, vec3(0.66, 0.42, 0.40));
    layer(0., vec3(0.77, 0.48, 0.46));

    // c9
    midlevel = 0.45;
    disp = 2.0;
    dist = 25.0;
    uv2 = uv + vec2(t/dist + 23.0, 0.0);
    h = (fbm(uv2, 8) - 0.5)*disp;
    layer(0.04, vec3(0.98, 0.57, 0.36));
    layer(0., vec3(1.0, 0.62, 0.44));

    // c8
    midlevel = 0.5;
    disp = 2.3;
    dist = 30.0;
    uv2 = uv + vec2(t/dist + 20.5, 0.0);
    h = (fbm(uv2, 8) - 0.5)*disp;
    layer(0.12, vec3(0.41, 0.27, 0.27));
    layer(0.08, vec3(0.53, 0.35, 0.32));
    layer(0.04, vec3(0.80, 0.24, 0.17));
    layer(0., vec3(0.99, 0.29, 0.20));

    // c7
    midlevel = 0.5;
    disp = 2.5;
    dist = 35.0;
    uv2 = uv + vec2(t/dist + 18.0, 0.0);
    h = (fbm(uv2, 8) - 0.5)*disp;
    layer(0.1, vec3(0.88, 0.38, 0.24));
    layer(0.05, vec3(0.98, 0.42, 0.28));
    layer(0., vec3(1.0, 0.48, 0.35));

    // c6
    midlevel = 0.6;
    disp = 2.0;
    dist = 40.0;
    uv2 = uv + vec2(t/dist + 18.0, 0.0);
    h = (fbm(uv2, 8) - 0.5)*disp;
    layer(0.1, vec3(0.95, 0.66, 0.48));
    layer(0., vec3(1.0, 0.76, 0.60));

    // c5
    midlevel = 0.75;
    disp = 3.5;
    dist = 45.0;
    uv2 = uv + vec2(t/dist + 15.5, 0.0);
    h = (fbm(uv2, 8) - 0.5)*disp;
    layer(0.2, vec3(1.0, 0.55, 0.33));
    layer(0.15, vec3(0.98, 0.50, 0.24));
    layer(0.1, vec3(0.90, 0.55, 0.40));
    layer(0., vec3(1.0, 0.62, 0.44));

    // c4
    midlevel = 0.7;
    disp = 2.7;
    dist = 50.0;
    uv2 = uv + vec2(t/dist + 12.0, 0.0);
    h = (fbm(uv2, 8) - 0.5)*disp;
    layer(0.04, vec3(0.73, 0.36, 0.30));
    layer(0., vec3(0.80, 0.40, 0.34));

    // c3
    midlevel = 0.8;
    disp = 2.7;
    dist = 60.0;
    uv2 = uv + vec2(t/dist + 9.5, 0.0);
    h = (fbm(uv2, 8) - 0.5)*disp;
    layer(0.1, vec3(0.93, 0.58, 0.35));
    layer(0., vec3(1.0, 0.76, 0.60));

    // c2
    midlevel = 0.9;
    disp = 3.0;
    dist = 70.0;
    uv2 = uv + vec2(t/dist + 7.0, 0.0);
    h = (fbm(uv2, 8) - 0.5)*disp;
    layer(0.1, vec3(0.56, 0.25, 0.22));
    layer(0.05, vec3(0.60, 0.30, 0.27));
    layer(0., vec3(0.74, 0.35, 0.30));

    // c1
    midlevel = 1.0;
    disp = 5.0;
    dist = 100.0;
    uv2 = uv + vec2(t/dist + 3.5, 0.0);
    h = (fbm(uv2, 8) - 0.5)*disp;
    layer(0.1, vec3(0.92, 0.85, 0.82));
    layer(0., vec3(1.0, 0.94, 0.91));

    return vec4(0.58, 0.7, 1.0, 1.);
}

vec3 genRaster( vec2 uv )
{
    float t = sin(1.2 * iTime) + 4. * iTime;
    vec4 bg = background(uv, t);

    vec4 fg = vec4(0.);
    int n = 5;
    if (uv.y < 0.5)
    for (int i = 0; i < n; i++){
        fg += foreground(uv, t+4.*float(i)/float(n)/60.) / (float(n));
    }

    vec3 col = bg.rgb;
    // train //////////////////////////////////////////////////////////////////
    float k;
    float midlevel;
    float h;
    float disp;
    float dist;
    vec2 uv2;
    uv.y -= 0.2;
    // choo choo
    k = 1.0;
    uv2 = fract(uv*9.0);
    float wagon = 1.0;
    wagon *= 1.0 - step(0.45, uv.x);
    wagon *= 1.0 - step(0.115, uv.y);
    wagon *= step(0.103, uv.y);
    wagon *= step(0.05, 1.0 - abs(uv2.x*2.0 - 1.0));

    float join = 1.0;
    join *= 1.0 - step(0.45, uv.x);
    join *= 1.0 - step(0.11, uv.y);
    join *= step(0.107, uv.y);


    float roof = 1.0;
    roof *= 1.0 - step(0.45, uv.x);
    roof *= 1.0 - step(0.117, uv.y);
    roof *= step(0.11, uv.y);
    roof *= step(0.15, 1.0 - abs(uv2.x*2.0 - 1.0));

    float loco = box(uv, 0.45, 0.5, 0.103, 0.112);
    float chem1 = box(uv, 0.49, 0.495, 0.103, 0.12);
    float chem2 = box(uv, 0.488, 0.496, 0.12, 0.123);
    float locoRoof = box(uv, 0.443, 0.47, 0.11, 0.117);

    float wheel = 1.0 - step(0.00004, dot2(uv - vec2(0.457, 0.106)));
    wheel += 1.0 - step(0.00002, dot2(uv - vec2(0.487, 0.105)));
    wheel += 1.0 - step(0.00002, dot2(uv - vec2(0.497, 0.105)));

    if (uv.x < 0.45 && uv.y > 0.025 && uv.y < 0.2){
        wheel += 1.0 - step(0.002, dot2(uv2 - vec2(0.2, 0.95)));
        wheel += 1.0 - step(0.002, dot2(uv2 - vec2(0.8, 0.95)));
    }
    col = mix(col, vec3(0.18, 0.12, 0.15), join);
    col =  mix(col, vec3(0.48, 0.19, 0.20), wagon);
    col = mix(col, vec3(0.18, 0.12, 0.15), roof);

    col = mix(col, vec3(0.38, 0.19, 0.20), loco);
    col = mix(col, vec3(0.38, 0.19, 0.20), chem1);
    col = mix(col, vec3(0.18, 0.12, 0.15), locoRoof);
    col = mix(col, vec3(0.18, 0.12, 0.15), chem2 + wheel);
    // loco smoke //////

    dist = 5.0;
    uv2 = uv + vec2(t/dist + 3.5, 0.0);
    uv2.x -= t/dist*0.2;
    h = fbm2(uv2, 8) - 0.55;

    if(uv.x < 0.49){
        float x = -uv.x + 0.49;
        float y = abs(uv.y + h*0.4 - 0.16*sqrt(x) - 0.12) - 0.8*x*exp(-x*10.0);
        if(y < 0.0) col = vec3(1.0, 0.94, 0.91);
        if(y < - 0.02) col = vec3(0.92, 0.85, 0.82);
    }

    //bridge ///////
    dist = 5.0;
    uv2 = uv + vec2(t/dist + 32.5, 0.0);
    uv2.x = fract(uv2.x*3.0);
    k = 1.0;
    k *= smoothstep(0.001, 0.003, abs(uv2.y - pow(uv2.x - 0.5, 2.0)*0.15 - 0.12));
    k *= min(step(0.05, 1.0 - abs(uv2.x*2.0 - 1.0))
         +   step(0.17, uv2.y), 1.0);
    k *= min(smoothstep(0.02, 0.05, 1.0 - abs(uv2.x*2.0 - 1.0))
         +   step(0.177, uv2.y), 1.0);

    k *= min(step(0.1, uv2.y)
           + smoothstep(-0.09, -0.085, -uv2.y - 0.001/(1.0 - abs(uv2.x*2.0 - 1.0))), 1.0);

    k *= min(smoothstep(0.05, 0.2, 1.0 - abs(fract(uv2.x*16.0)*2.0 - 1.0))
         +   step(0.12, uv2.y - pow(uv2.x - 0.5, 2.0)*0.15)
         +   step(-0.1, -uv2.y), 1.0);
    col = mix(vec3(0.29, 0.09, 0.08)*smoothstep(-0.08, 0.08, uv.y), col, k);

    col = mix(col, fg.rgb, fg.a);

    return col;
}

vec3 vignettCorrection( vec3 col, vec2 uv )
{
    vec3 col1 = col;

    // correction
    col1 *= 0.5 + 0.5 * pow( 16.0*uv.x*uv.y*(1.0-uv.x)*(1.0-uv.y), 0.2 );

    // varying lightness
    col1 *= 1.3 + 0.4 * cos(0.5 * (iTime + 3.14));
    return col1;
}

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    // Gen
    vec2 uvGen = fragCoord/iResolution.y;
    vec3 col = genRaster( uvGen );

    // Vignett correction
    vec2 uvVignett = fragCoord/iResolution.xy;
    col = vignettCorrection( col, uvVignett);
    fragColor = vec4(col, 1.0);
}
`;

function createShader(
  gl: WebGL2RenderingContext,
  type: GLenum,
  source: string
): WebGLShader | undefined {
  const shader = gl.createShader(type)!;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
  if (success) {
    return shader;
  }
  console.warn(gl.getShaderInfoLog(shader));
  gl.deleteShader(shader); // clean up failed shader
}

function createProgram(
  gl: WebGL2RenderingContext,
  vertexShader: WebGLShader,
  fragmentShader: WebGLShader
): WebGLProgram | undefined {
  const program = gl.createProgram()!;
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);

  const success = gl.getProgramParameter(program, gl.LINK_STATUS);
  if (success) {
    return program;
  }
  console.warn(gl.getProgramInfoLog(program));
  gl.deleteProgram(program);
}

function playProgram(
  gl: WebGL2RenderingContext,
  program: WebGLProgram,
  textureImage?: HTMLImageElement
) {
  gl.useProgram(program);
  const quadPositions = new Float32Array([
    -1, -1, 1, -1, -1, 1, 1, 1, -1, 1, 1, -1,
  ]); // two triangles to fill the rectangle
  const quadBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, quadBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, quadPositions, gl.STATIC_DRAW);

  // texture
  // TODO: Up to 4 textures
  // TODO: Support images with non-power-of-two edge lengths
  if (textureImage) {
    const texture = gl.createTexture();
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(
      gl.TEXTURE_2D,
      0,
      gl.RGBA,
      gl.RGBA,
      gl.UNSIGNED_BYTE,
      textureImage
    );
    gl.generateMipmap(gl.TEXTURE_2D);
  }

  let firstDrawTime: number | undefined = undefined;
  let prevDrawTime: number | undefined = undefined;
  let iFrame: number = 0;

  function drawFrame(now: number) {
    if (!(firstDrawTime || prevDrawTime)) {
      firstDrawTime = now;
      prevDrawTime = now;
      return;
    }

    gl.bindFramebuffer(gl.FRAMEBUFFER, null);

    // uniforms
    const iResolution: [number, number, number] = [
      gl.canvas.width,
      gl.canvas.height,
      1.0,
    ];
    const iTimeDelta = (now - prevDrawTime!) * 0.001;
    const iTime = (now - firstDrawTime!) * 0.001;
    const _date = new Date(now);
    const iDate: [number, number, number, number] = [
      _date.getFullYear(),
      _date.getMonth(),
      _date.getDate(),
      _date.getTime() * 0.001,
    ];

    function repeat(n: number, arr: any[]): any[] {
      let repeated = [];
      for (let i = 0; i < n; i++) {
        repeated.push(...arr);
      }
      return repeated;
    }

    const iChannelTime = new Float32Array(repeat(4, [iTime]));
    const iChannelResolution = new Float32Array(
      repeat(4, [gl.canvas.width, gl.canvas.height, 0])
    );

    gl.uniform3f(gl.getUniformLocation(program, "iResolution"), ...iResolution);
    gl.uniform1f(gl.getUniformLocation(program, "iTime"), iTime);
    gl.uniform1f(gl.getUniformLocation(program, "iTimeDelta"), iTimeDelta);
    gl.uniform1f(gl.getUniformLocation(program, "iFrameRate"), 60.0);
    gl.uniform1i(gl.getUniformLocation(program, "iFrame"), iFrame);
    gl.uniform1fv(gl.getUniformLocation(program, "iChannelTime"), iChannelTime);
    gl.uniform3fv(
      gl.getUniformLocation(program, "iChannelResolution"),
      iChannelResolution
    );
    gl.uniform1i(gl.getUniformLocation(program, "iChannel0"), 0);
    gl.uniform1i(gl.getUniformLocation(program, "iChannel1"), 1);
    gl.uniform1i(gl.getUniformLocation(program, "iChannel2"), 2);
    gl.uniform1i(gl.getUniformLocation(program, "iChannel3"), 3);
    gl.uniform4f(gl.getUniformLocation(program, "iDate"), ...iDate);

    // draw
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    gl.bindBuffer(gl.ARRAY_BUFFER, quadBuffer);
    const vertexInPositionAttrib = gl.getAttribLocation(
      program,
      "vertexInPosition"
    );
    gl.vertexAttribPointer(vertexInPositionAttrib, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vertexInPositionAttrib);
    gl.drawArrays(gl.TRIANGLES, 0, 6);

    // maintain timer and counter
    prevDrawTime = now;
    iFrame += 1;
  }

  // animation loop
  function animate(t: number) {
    drawFrame(t);
    requestAnimationFrame(animate);
  }
  requestAnimationFrame(animate);
}

function resizeCanvas(
  canvas: HTMLCanvasElement,
  gl: WebGL2RenderingContext
): void {
  if (
    canvas.width == canvas.clientWidth &&
    canvas.height == canvas.clientHeight
  ) {
    return;
  }
  canvas.width = canvas.clientWidth;
  canvas.height = canvas.clientHeight;
  gl.viewport(0, 0, canvas.width, canvas.height);
}

function main(): void {
  const canvas = document.getElementById("my-canvas")! as HTMLCanvasElement;
  const gl = canvas.getContext("webgl2");

  if (!gl) {
    alert("WebGL2 not supported on this device.");
    return;
  }
  canvas.width = canvas.clientWidth;
  canvas.height = canvas.clientHeight;

  window.addEventListener("resize", () => {
    resizeCanvas(canvas, gl);
  });

  gl.getExtension("OES_texture_float_linear");
  gl.getExtension("OES_texture_half_float_linear");
  gl.getExtension("EXT_color_buffer_float");
  gl.getExtension("WEBGL_debug_shaders");

  // shaders
  const vertexShaderSource = `#version 300 es
  #ifdef GL_ES
  precision highp float;
  precision highp int;
  #endif
  in vec2 vertexInPosition;
  void main() {
    gl_Position = vec4(vertexInPosition, 0.0, 1.0);
  }
  `;

  const shaderToyHeader = `#version 300 es
  #ifdef GL_ES
  precision highp float;
  precision highp int;
  #endif
  #define texture2D texture
  uniform vec3 iResolution;
  uniform float iTime;
  uniform float iTimeDelta;
  uniform float iFrameRate;
  uniform int iFrame;
  uniform float iChannelTime[4];
  uniform vec3 iChannelResolution[4];
  uniform sampler2D iChannel0;
  uniform sampler2D iChannel1;
  uniform sampler2D iChannel2;
  uniform sampler2D iChannel3;
  uniform vec4 iDate;
  out vec4 frag_out_color;
  void mainImage( out vec4 fragColor, in vec2 fragCoord );
  void main( void )
  {
    vec4 color = vec4(0.0, 0.0, 0.0, 0.0);
    mainImage(color, gl_FragCoord.xy);
    frag_out_color = vec4(color);
  }
  `;

  const fragmentShaderSource = shaderToyHeader + mainImageSource;

  const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
  const fragmentShader = createShader(
    gl,
    gl.FRAGMENT_SHADER,
    fragmentShaderSource
  );
  if (!(vertexShader && fragmentShader)) {
    console.warn("Failed to create shaders");
    return;
  }

  // program
  const program = createProgram(gl, vertexShader, fragmentShader);
  if (!program) {
    console.warn("Failed to create program");
    return;
  }

  // load texture image and play
  const textureImage = new Image();
  textureImage.src = "/pr01/blue_noise.png";
  textureImage.onload = () => {
    playProgram(gl, program, textureImage);
  };
}

main();
