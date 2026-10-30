import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

function hasGPS(bytes) {
  for (let pos=2; pos+4<bytes.length;) {
    if (bytes[pos]!==0xff) break;
    const marker=bytes[pos+1];
    if (marker===0xda || marker===0xd9) break;
    const size=bytes.readUInt16BE(pos+2);
    if (size<2 || pos+2+size>bytes.length) throw Error('Invalid JPEG segment');
    if (marker===0xe1 && bytes.subarray(pos+4,pos+10).equals(Buffer.from('Exif\0\0'))) {
      const tiff=bytes.subarray(pos+10,pos+2+size);
      const little=tiff.toString('ascii',0,2)==='II';
      const u16=p=>little?tiff.readUInt16LE(p):tiff.readUInt16BE(p);
      const u32=p=>little?tiff.readUInt32LE(p):tiff.readUInt32BE(p);
      const start=u32(4);
      for(let i=0;i<u16(start);i++)if(u16(start+2+i*12)===0x8825)return true;
    }
    pos+=2+size;
  }
  return false;
}

test('the GPS check detects both TIFF byte orders',()=>{
  for(const little of [true,false]){
    const tiff=Buffer.alloc(26);tiff.write(little?'II':'MM');
    const u16=(v,p)=>little?tiff.writeUInt16LE(v,p):tiff.writeUInt16BE(v,p);
    const u32=(v,p)=>little?tiff.writeUInt32LE(v,p):tiff.writeUInt32BE(v,p);
    u16(42,2);u32(8,4);u16(1,8);u16(0x8825,10);
    const header=Buffer.from([0xff,0xd8,0xff,0xe1,0,34]);
    const image=Buffer.concat([header,Buffer.from('Exif\0\0'),tiff,Buffer.from([0xff,0xd9])]);
    assert.equal(hasGPS(image),true);u16(0x0112,10);
    assert.equal(hasGPS(Buffer.concat([header,Buffer.from('Exif\0\0'),tiff,Buffer.from([0xff,0xd9])])),false);
  }
});

test('published JPEG share cards carry no GPS directory',()=>{
  const files=fs.readdirSync('public/assets').filter(name=>/\.jpe?g$/i.test(name));
  assert.ok(files.length>0);
  const affected=files.filter(name=>hasGPS(fs.readFileSync('public/assets/'+name)));
  assert.deepEqual(affected,[]);
});
