import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import path from 'node:path';
const root = process.env.BROWSER_SOURCE_ROOT || '.';

test('analytics initialises once after both the idle fallback and interaction', () => {
  const source = fs.readFileSync(path.join(root, 'src/components/ClientScripts.astro'), 'utf8').match(/<script is:inline>([\s\S]*?)<\/script>/)[1];
  const events = {}, timers = [], scripts = [];
  const context = {screen:{width:1440,height:900},window:{addEventListener(name, fn){events[name]=fn},removeEventListener(name){delete events[name]}},document:{head:{appendChild(el){scripts.push(el)}},createElement(){return {}},addEventListener(){}},setTimeout(fn){timers.push(fn)}};
  context.window=context;context.addEventListener=(name,fn)=>events[name]=fn;context.removeEventListener=name=>delete events[name];
  vm.runInNewContext(source, context);
  timers[0]();events.scroll();
  assert.equal(scripts.length,1);
  assert.equal(context.dataLayer.filter(args=>args[0]==='config').length,1);
});

test('analytics never loads on the fake screens', () => {
  const source = fs.readFileSync(path.join(root, 'src/components/ClientScripts.astro'), 'utf8').match(/<script is:inline>([\s\S]*?)<\/script>/)[1];
  for (const [width, height] of [[1280, 1200], [1366, 1366]]) {
    const events = {}, timers = [], scripts = [];
    const context = {screen:{width,height},document:{head:{appendChild(el){scripts.push(el)}},createElement:()=>({})},setTimeout(fn){timers.push(fn)}};
    context.window=context;context.addEventListener=(name,fn)=>events[name]=fn;context.removeEventListener=name=>delete events[name];
    vm.runInNewContext(source, context);
    timers[0]();events.scroll();
    assert.equal(scripts.length,0);
  }
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

test('header rows share one centre line with no compensating margins', () => {
  const read = (file) => fs.readFileSync(path.join(root, file), 'utf8');
  const rule = (source, selector) => {
    const start = source.indexOf(`${selector} {`);
    assert.notEqual(start, -1, `${selector} is missing`);
    return source.slice(start, source.indexOf('}', start));
  };
  for (const file of ['src/components/Header/Header.astro', 'src/components/LeftSidebar.astro']) {
    const source = read(file);
    assert.doesNotMatch(rule(source, '.logo .logo-image'), /margin-top/, `${file} pulls the cup off the line`);
    assert.match(rule(source, '.logo h1'), /margin: 1px 0 0 -2px/, `${file} moves the Han title off the cup's centre`);
    assert.match(rule(source, '.logo h1:lang(en)'), /margin-top: -1px/, `${file} leaves Latin capitals low`);
  }
  assert.doesNotMatch(read('src/components/Header/HeaderRight.astro'), /\.header-right \{/);
  assert.doesNotMatch(rule(read('src/layouts/post.astro'), '.content-title .content-logo'), /margin-top/);
});

test('the copy label sits on the first code line', () => {
  const pre = fs.readFileSync(path.join(root, 'src/styles/markdown.css'), 'utf8');
  const padding = Number(pre.match(/\.heti pre \{[\s\S]*?padding-block-start: (\d+)px/)[1]);
  const source = fs.readFileSync(path.join(root, 'src/components/CodeCopy.astro'), 'utf8');
  const lineCentre = padding + 27.2 / 2; // .heti pre: 17px at line-height 1.6
  const fine = source.match(/\.code-copy \{\s*position: absolute;\s*top: (\d+)px/);
  const coarse = source.match(/\.code-copy \{\s*top: (\d+)px;\s*right: 6px;\s*padding: (\d+)px/);
  assert.ok(Math.abs(Number(fine[1]) + 2 + 10 - lineCentre) <= 1, 'fine pointer label is off the line');
  assert.ok(Math.abs(Number(coarse[1]) + Number(coarse[2]) + 10 - lineCentre) <= 1, 'touch label is off the line');
});
