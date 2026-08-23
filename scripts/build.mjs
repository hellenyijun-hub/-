import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';

const requiredFiles = ['index.html', 'src/main.tsx', 'src/styles.css'];

for (const file of requiredFiles) {
  await readFile(file, 'utf8');
}

const html = await readFile('index.html', 'utf8');
const app = await readFile('src/main.tsx', 'utf8');
const css = await readFile('src/styles.css', 'utf8');

const requiredAppSnippets = [
  'hero-visual',
  'person-illustration',
  '心理科普页面',
  '情绪测试页面',
  '微信咨询入口',
  'AI心理陪伴模块',
  'AI仅提供心理健康陪伴和信息参考，不能替代专业心理咨询。',
];

for (const snippet of requiredAppSnippets) {
  if (!app.includes(snippet)) {
    throw new Error(`src/main.tsx is missing required content: ${snippet}`);
  }
}

const requiredCssSnippets = [
  '@keyframes pageFadeIn',
  '@keyframes sectionFadeUp',
  '@keyframes floatLeaf',
  'prefers-reduced-motion',
];

for (const snippet of requiredCssSnippets) {
  if (!css.includes(snippet)) {
    throw new Error(`src/styles.css is missing required styling: ${snippet}`);
  }
}

await rm('dist', { recursive: true, force: true });
await mkdir(join('dist', 'src'), { recursive: true });

await writeFile('dist/index.html', html.replace('/src/main.tsx', '/src/main.tsx'));
await writeFile(join('dist', 'src', 'main.tsx'), app);
await writeFile(join('dist', 'src', 'styles.css'), css);
await mkdir(dirname(join('dist', 'assets', '.keep')), { recursive: true });
await writeFile(join('dist', 'assets', '.keep'), '');

console.log('Project environment build completed successfully.');
