// Website behavior stays native-browser based. The bundled iOS entry installs
// a narrowly scoped adapter before loading the shared Earth experience.
export function fetchAPI(path,options){return globalThis.ParallaxNative?.request?globalThis.ParallaxNative.request(path,options):fetch(path,options);}
export async function surfaceURL(path){return globalThis.ParallaxNative?.imageURL?globalThis.ParallaxNative.imageURL(path):{url:path,revoke:()=>{}};}
export async function shareRenderedImage(data,name){if(!globalThis.ParallaxNative?.sharePNG)return false;await globalThis.ParallaxNative.sharePNG(data,name);return true;}
export async function shareTextExport(name,text){if(!globalThis.ParallaxNative?.shareText)return false;await globalThis.ParallaxNative.shareText(name,text);return true;}
