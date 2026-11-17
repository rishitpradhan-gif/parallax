import {test} from 'node:test';import assert from 'node:assert/strict';import handler from '../api/surface.mjs';
function response(){return {code:0,body:null,status(code){this.code=code;return this;},json(body){this.body=body;},end(){},setHeader(){},send(body){this.body=body;}};}
test('surface endpoint rejects invalid dates and future dates before querying NASA',async()=>{for(const date of ['bad','2026-02-30','1999-12-31','2099-01-01','2026-01-01&url=evil']){const res=response();await handler({method:'GET',query:{date}},res);assert.equal(res.code,400);assert.match(res.body.error,/valid imagery date/);}});
test('surface endpoint accepts only read requests',async()=>{const res=response();await handler({method:'POST',query:{date:'2026-11-15'}},res);assert.equal(res.code,405);});
