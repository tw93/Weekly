import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import path from 'node:path';
const root = process.env.BROWSER_SOURCE_ROOT || '.';

test('analytics initialises once after both the idle fallback and interaction', () => {
  const source = fs.readFileSync(path.join(root, 'src/components/ClientScripts.astro'), 'utf8').match(/<script is:inline>([\s\S]*?)<\/script>/)[1];
  const events = {}, timers = [], scripts = [];
  const context = {window:{addEventListener(name, fn){events[name]=fn},removeEventListener(name){delete events[name]}},document:{head:{appendChild(el){scripts.push(el)}},createElement(){return {}},addEventListener(){}},setTimeout(fn){timers.push(fn)}};
  context.window=context;context.addEventListener=(name,fn)=>events[name]=fn;context.removeEventListener=name=>delete events[name];
  vm.runInNewContext(source, context);
  timers[0]();events.scroll();
  assert.equal(scripts.length,1);
  assert.equal(context.dataLayer.filter(args=>args[0]==='config').length,1);
});

test('native dialog close releases the page scroll lock', () => {
  const source=fs.readFileSync(path.join(root, 'src/components/Header/Search.astro'),'utf8');
  // Execute the registered native-close handler with the same browser event name.
  const handler=source.match(/dialog\.addEventListener\('close', \(\) => \{([\s\S]*?)\n        \}\);/);
  assert.ok(handler,'Esc closes the native dialog and must have a cleanup listener');
  let locked=true, listening=true;
  vm.runInNewContext(handler[1],{document:{body:{classList:{remove(name){assert.equal(name,'overflow-hidden');locked=false}}}},window:{removeEventListener(){listening=false}},onWindowClick(){}});
  assert.equal(locked,false);assert.equal(listening,false);
});
