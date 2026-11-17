// Single-scattering Rayleigh approximation. Units are equatorial Earth radii.
// Ground occlusion and solar direction are geometric; this is not radiometric calibration.
export const atmosphereVertex=`varying vec3 worldPoint;
void main(){worldPoint=(modelMatrix*vec4(position,1.0)).xyz;gl_Position=projectionMatrix*viewMatrix*vec4(worldPoint,1.0);}`;
export const atmosphereFragment=`precision highp float;
varying vec3 worldPoint;uniform vec3 sunDirection;
const float R=1.0;const float A=1.0125;const float H=0.00125;
const vec3 beta=vec3(37.0,86.0,210.0);
vec2 hit(vec3 o,vec3 d,float radius){float b=dot(o,d),c=dot(o,o)-radius*radius,h=b*b-c;if(h<0.0)return vec2(1e6,-1e6);float s=sqrt(max(h,0.0));return vec2(-b-s,-b+s);}
float density(vec3 p){return exp(-max(length(p)-R,0.0)/H);}
void main(){vec3 ray=normalize(worldPoint-cameraPosition);vec2 outer=hit(cameraPosition,ray,A);float begin=max(outer.x,0.0),end=outer.y;if(end<=begin)discard;vec2 ground=hit(cameraPosition,ray,R);if(ground.x>0.0&&ground.x<end)end=ground.x;if(end<=begin)discard;float ds=(end-begin)/10.0;float viewDepth=0.0;vec3 sum=vec3(0.0);vec3 sun=normalize(sunDirection);
for(int i=0;i<10;i++){vec3 p=cameraPosition+ray*(begin+(float(i)+0.5)*ds);float rho=density(p);viewDepth+=rho*ds;vec2 shadow=hit(p,sun,R);if(shadow.x>0.0)continue;vec2 top=hit(p,sun,A);float sunStep=max(top.y,0.0)/4.0;float sunDepth=0.0;for(int j=0;j<4;j++){sunDepth+=density(p+sun*(float(j)+0.5)*sunStep)*sunStep;}vec3 transmission=exp(-beta*(viewDepth+sunDepth));sum+=rho*ds*transmission;}
float mu=dot(ray,sun);float phase=0.0596831*(1.0+mu*mu);vec3 color=sum*beta*phase*14.0;
gl_FragColor=vec4(color,1.0);}`;
