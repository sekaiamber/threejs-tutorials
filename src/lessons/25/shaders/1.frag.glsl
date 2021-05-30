varying vec2 vUv;

float random2d(vec2 coord) {
  return fract(sin(dot(coord.xy, vec2(12.9898, 78.233))) * 43758.5453);
}

vec2 rotate2d(vec2 origin, float rotation, vec2 mid) {
  return vec2(
  cos(rotation) * (origin.x - mid.x) + sin(rotation) * (origin.y - mid.y) + mid.x,
  cos(rotation) * (origin.y - mid.y) - sin(rotation) * (origin.x - mid.x) + mid.y
  );
}

const float PI = 3.14159265359;


//	Classic Perlin 2D Noise 
//	by Stefan Gustavson
//
vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
vec2 fade(vec2 t) {return t*t*t*(t*(t*6.0-15.0)+10.0);}

float cnoise(vec2 P){
  vec4 Pi = floor(P.xyxy) + vec4(0.0, 0.0, 1.0, 1.0);
  vec4 Pf = fract(P.xyxy) - vec4(0.0, 0.0, 1.0, 1.0);
  Pi = mod(Pi, 289.0); // To avoid truncation effects in permutation
  vec4 ix = Pi.xzxz;
  vec4 iy = Pi.yyww;
  vec4 fx = Pf.xzxz;
  vec4 fy = Pf.yyww;
  vec4 i = permute(permute(ix) + iy);
  vec4 gx = 2.0 * fract(i * 0.0243902439) - 1.0; // 1/41 = 0.024...
  vec4 gy = abs(gx) - 0.5;
  vec4 tx = floor(gx + 0.5);
  gx = gx - tx;
  vec2 g00 = vec2(gx.x,gy.x);
  vec2 g10 = vec2(gx.y,gy.y);
  vec2 g01 = vec2(gx.z,gy.z);
  vec2 g11 = vec2(gx.w,gy.w);
  vec4 norm = 1.79284291400159 - 0.85373472095314 * 
    vec4(dot(g00, g00), dot(g01, g01), dot(g10, g10), dot(g11, g11));
  g00 *= norm.x;
  g01 *= norm.y;
  g10 *= norm.z;
  g11 *= norm.w;
  float n00 = dot(g00, vec2(fx.x, fy.x));
  float n10 = dot(g10, vec2(fx.y, fy.y));
  float n01 = dot(g01, vec2(fx.z, fy.z));
  float n11 = dot(g11, vec2(fx.w, fy.w));
  vec2 fade_xy = fade(Pf.xy);
  vec2 n_x = mix(vec2(n00, n01), vec2(n10, n11), fade_xy.x);
  float n_xy = mix(n_x.x, n_x.y, fade_xy.y);
  return 2.3 * n_xy;
}

void main() {
  // // 黑白渐变
  // float strength = vUv.x;

  // // 斜向渐变
  // float strength = vUv.x * vUv.y;

  // // 黑白短暂渐变
  // float strength = vUv.x * 10.0;

  // // 黑白短暂渐变重复
  // float strength = mod(vUv.x * 10.0, 1.0);

  // ------------------

  // // 斑马线，避免使用if，可以的话使用step性能更好
  // float strength = mod(vUv.x * 10.0, 1.0);
  // strength = step(0.5, strength);

  // // 交错斑马线
  // float strength = step(0.8, mod(vUv.x * 10.0, 1.0));
  // strength += step(0.8, mod(vUv.y * 10.0, 1.0));

  // // 交错斑马线衍生，只显示交错点
  // float strength = step(0.8, mod(vUv.x * 10.0, 1.0));
  // strength *= step(0.8, mod(vUv.y * 10.0, 1.0));

  // // 拉长交错点
  // float strength = step(0.3, mod(vUv.x * 10.0, 1.0));
  // strength *= step(0.8, mod(vUv.y * 10.0, 1.0));

  // // 拉长交错点，并交错
  // float stx = step(0.3, mod(vUv.x * 10.0, 1.0));
  // stx *= step(0.8, mod(vUv.y * 10.0, 1.0));
  // float sty = step(0.8, mod(vUv.x * 10.0, 1.0));
  // sty *= step(0.3, mod(vUv.y * 10.0, 1.0));
  // float strength = stx + sty;

  // // 拉长交错点，并交错，并平移为十字架
  // float stx = step(0.3, mod(vUv.x * 10.0, 1.0));
  // stx *= step(0.8, mod(vUv.y * 10.0 + 0.25, 1.0));
  // float sty = step(0.8, mod(vUv.x * 10.0 + 0.25, 1.0));
  // sty *= step(0.3, mod(vUv.y * 10.0, 1.0));
  // float strength = stx + sty;

  // ------------------

  // // 中央黑两边白
  // float strength = abs(vUv.x - 0.5);

  // // 黑十字min，黑菱形max
  // float strength = min(abs(vUv.x - 0.5), abs(vUv.y - 0.5));

  // // 结合上面，方框
  // float strength = step(0.2, max(abs(vUv.x - 0.5), abs(vUv.y - 0.5)));

  // // 再结合上面，小方框
  // float strength = step(0.2, max(abs(vUv.x - 0.5), abs(vUv.y - 0.5)));
  // strength *= 1.0 - step(0.25, max(abs(vUv.x - 0.5), abs(vUv.y - 0.5)));

  // ------------------

  // // 阶梯渐变
  // float strength = floor(vUv.x * 10.0) / 10.0;

  // // 斜向渐变格子
  // float strength = floor(vUv.x * 10.0) / 10.0;
  // strength *= floor(vUv.y * 10.0) / 10.0;

  // ------------------

  // // 白噪音
  // float strength = random2d(vUv);

  // // 马赛克
  // vec2 grid = vec2(floor(vUv.x * 10.0) / 10.0, floor(vUv.y * 10.0) / 10.0);
  // float strength = random2d(grid);

  // // 斜切马赛克
  // vec2 grid = vec2(
  //   floor(vUv.x * 10.0) / 10.0,
  //   floor(vUv.y * 10.0 + vUv.x * 5.0) / 10.0
  // );
  // float strength = random2d(grid);

  // ------------------

  // // 角落径向渐变
  // float strength = length(vUv);

  // // 中心径向渐变
  // // float strength = length(vUv - 0.5);
  // // or
  // float strength = distance(vUv, vec2(0.5, 0.5));

  // // 反色中心径向渐变
  // float strength = 1.0 - distance(vUv, vec2(0.5, 0.5));

  // // 灯泡，调整渐变变化速率
  // float strength = 0.02 / distance(vUv, vec2(0.5, 0.5));

  // // 扁圆光斑
  // vec2 lightUv = vec2(vUv.x * 0.1 + 0.45, vUv.y * 0.5 + 0.25);
  // float strength = 0.02 / distance(lightUv, vec2(0.5, 0.5));

  // // 十字光斑
  // vec2 lightUvx = vec2(vUv.x * 0.1 + 0.45, vUv.y * 0.5 + 0.25);
  // float x = 0.02 / distance(lightUvx, vec2(0.5, 0.5));

  // vec2 lightUvy = vec2(vUv.x * 0.5 + 0.25, vUv.y * 0.1 + 0.45);
  // float y = 0.02 / distance(lightUvy, vec2(0.5, 0.5));
  // // + 和 * 都可以，衰减不同
  // float strength = x * y;

  // // 45°十字光斑，旋转vUv
  // vec2 rotatedUv = rotate2d(vUv, PI / 4.0, vec2(0.5, 0.5));

  // vec2 lightUvx = vec2(rotatedUv.x * 0.1 + 0.45, rotatedUv.y * 0.5 + 0.25);
  // float x = 0.02 / distance(lightUvx, vec2(0.5, 0.5));

  // vec2 lightUvy = vec2(rotatedUv.x * 0.5 + 0.25, rotatedUv.y * 0.1 + 0.45);
  // float y = 0.02 / distance(lightUvy, vec2(0.5, 0.5));
  // // + 和 * 都可以，衰减不同
  // float strength = x * y;

  // ------------------

  // // 中央一个圆
  // float strength = distance(vUv, vec2(0.5, 0.5));
  // strength = step(0.25, strength);

  // // 甜甜圈，这里巧妙用了-0.25有些值小于0的情况
  // float strength = abs(distance(vUv, vec2(0.5, 0.5)) - 0.25);

  // // 圆环
  // float strength = step(0.02, abs(distance(vUv, vec2(0.5, 0.5)) - 0.25));

  // // 反色圆环
  // float strength = 1.0 - step(0.02, abs(distance(vUv, vec2(0.5, 0.5)) - 0.25));

  // // 反色抖动圆环
  // vec2 wavedUv = vec2(vUv.x, vUv.y + sin(vUv.x * 30.0) * 0.1);
  // float strength = 1.0 - step(0.02, abs(distance(wavedUv, vec2(0.5, 0.5)) - 0.25));

  // // 反色抖动圆环瞎搞
  // vec2 wavedUv = vec2(vUv.x + sin(vUv.y * 30.0) * 0.1, vUv.y + sin(vUv.x * 30.0) * 0.1);
  // float strength = 1.0 - step(0.02, abs(distance(wavedUv, vec2(0.5, 0.5)) - 0.25));

  // // 反色抖动圆环不是瞎搞了，类似振动干涉条纹
  // vec2 wavedUv = vec2(vUv.x + sin(vUv.y * 100.0) * 0.1, vUv.y + sin(vUv.x * 100.0) * 0.1);
  // float strength = 1.0 - step(0.02, abs(distance(wavedUv, vec2(0.5, 0.5)) - 0.25));

  // ------------------

  // // 旋转渐变
  // float angle = atan(vUv.x, vUv.y);
  // float strength = angle;

  // // 平移旋转渐变
  // float angle = atan(vUv.x - 0.5, vUv.y - 0.5);
  // float strength = angle;

  // // 中心旋转渐变
  // float angle = atan(vUv.x - 0.5, vUv.y - 0.5);
  // angle /= PI * 2.0;
  // angle += 0.5;
  // float strength = angle;

  // // 中心辐射
  // float angle = atan(vUv.x - 0.5, vUv.y - 0.5);
  // angle /= PI * 2.0;
  // angle += 0.5;
  // float strength = sin(angle * 100.0);

  // // 波浪圆环，圆环按照上面的中心辐射进行抖动
  // float angle = atan(vUv.x - 0.5, vUv.y - 0.5);
  // angle /= PI * 2.0;
  // angle += 0.5;
  // float sinusoid = sin(angle * 100.0);
  // float r = 0.25 + sinusoid * 0.02;
  // float strength = 1.0 - step(0.02, abs(distance(vUv, vec2(0.5, 0.5)) - r));

  // ------------------

  // Perlin Noise 柏林噪声
  // 可以用来模拟地形、云彩、火焰、草、雪的动画等
  // cnoise的返回不是[0, 1]，而是[-x, x]，不确定，所以结合step和abs的时候，可以调整相应的值。

  // 经典
  // float strength = cnoise(vUv * 10.0);

  // // 柏林噪声和step结合
  // float strength = step(0.0, cnoise(vUv * 10.0));

  // // 柏林噪声，显示边际
  // float strength = 1.0 - abs(cnoise(vUv * 10.0));

  // // 柏林噪声，模拟等高线，使用sin，这里和前面的例子显示，对付重复图案，mod可以重复0%-100%过程，而sin可以重复0%-100%-0%过程
  // float strength = sin(cnoise(vUv * 10.0) * 20.0);

  // 锐化等高线，这里因为sin的缘故，值被限定在[0, 1]
  float strength = step(0.5, sin(cnoise(vUv * 10.0) * 20.0));

  gl_FragColor = vec4(vec3(strength), 1.0);
}