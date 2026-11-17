import {calculate} from './core.mjs';self.onmessage=({data})=>{try{self.postMessage({result:calculate(data.records,data.settings)});}catch(e){self.postMessage({error:e.message});}};
