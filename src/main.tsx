import React, { useMemo, useState } from 'react';
import ReactDOM from 'react-dom/client';
import './styles.css';

type ArticleCategory = '焦虑情绪' | '情绪内耗' | '青少年心理' | '职场压力' | '亲子关系';

type Article = {
  category: ArticleCategory;
  title: string;
  summary: string;
  readTime: string;
};

type TestCard = {
  title: string;
  description: string;
  duration: string;
};

type CompanionReply = {
  warmth: string;
  emotion: string;
  suggestion: string;
};

const articles: Article[] = [
  {
    category: '焦虑情绪',
    title: '当焦虑来临：先让身体知道你是安全的',
    summary: '通过呼吸、感官定位和温和自我对话，帮助大脑从警觉模式回到稳定状态。',
    readTime: '6 分钟阅读',
  },
  {
    category: '情绪内耗',
    title: '停止反复责备自己：识别内耗循环的三个信号',
    summary: '了解完美主义、过度解释和灾难化想象如何消耗心理能量。',
    readTime: '8 分钟阅读',
  },
  {
    category: '青少年心理',
    title: '孩子突然沉默：家长可以先做的五件小事',
    summary: '从倾听、边界和陪伴出发，建立青少年愿意表达的安全关系。',
    readTime: '7 分钟阅读',
  },
  {
    category: '职场压力',
    title: '下班后仍停不下来？给职场大脑一个结束仪式',
    summary: '用简短复盘、身体放松和数字边界，降低持续在线带来的疲惫。',
    readTime: '5 分钟阅读',
  },
  {
    category: '亲子关系',
    title: '亲子冲突背后，常常是两代人的需求都没有被看见',
    summary: '学习把批评翻译成需求，让沟通从对抗转向合作。',
    readTime: '9 分钟阅读',
  },
];

const tests: TestCard[] = [
  {
    title: '压力测试',
    description: '了解近期压力来源、身体反应和恢复资源，获得个性化舒缓建议。',
    duration: '约 3 分钟',
  },
  {
    title: '焦虑倾向测试',
    description: '初步观察担忧频率、回避倾向和安全感水平，帮助你判断是否需要更多支持。',
    duration: '约 5 分钟',
  },
  {
    title: '情绪状态评估',
    description: '从睡眠、情绪波动、能量和关系满意度维度，梳理当下心理状态。',
    duration: '约 4 分钟',
  },
];

const categories: ArticleCategory[] = ['焦虑情绪', '情绪内耗', '青少年心理', '职场压力', '亲子关系'];

function createCompanionReply(input: string): CompanionReply {
  const normalizedInput = input.trim();

  if (!normalizedInput) {
    return {
      warmth: '你可以先写下一句最想被听见的话，我会在这里陪你慢慢梳理。',
      emotion: '暂未识别到具体情绪。',
      suggestion: '试着用“我最近因为……感到……”开头，帮助自己把模糊压力说清楚。',
    };
  }

  if (/压力|焦虑|紧张|撑不住|崩溃/.test(normalizedInput)) {
    return {
      warmth: '听起来你最近真的承受了很多，能说出来已经是在照顾自己了。',
      emotion: '可能包含压力、焦虑和持续紧绷感。',
      suggestion: '先做 3 轮缓慢呼吸：吸气 4 秒、停 2 秒、呼气 6 秒；然后写下“今天必须完成”和“可以延后”的事情，把压力拆小。',
    };
  }

  if (/不开心|难过|低落|想哭|委屈/.test(normalizedInput)) {
    return {
      warmth: '每天不开心会让人很孤单，谢谢你愿意把这份感受放到这里。',
      emotion: '可能包含低落、委屈、孤独或情绪耗竭。',
      suggestion: '给自己安排一个很小的恢复动作，例如晒 10 分钟太阳、喝一杯温水、给信任的人发一句“我今天有点难受”。',
    };
  }

  if (/累|疲惫|没力气|困|睡不好/.test(normalizedInput)) {
    return {
      warmth: '感觉很累并不代表你不够努力，可能是身心在提醒你需要恢复。',
      emotion: '可能包含疲惫、能量不足和身心透支。',
      suggestion: '今晚先降低目标：减少一件非必要任务，睡前 30 分钟离开屏幕，做一次从肩颈到脚底的身体扫描。',
    };
  }

  return {
    warmth: '我读到了你正在认真面对自己的感受，这本身就很重要。',
    emotion: '可能存在复杂情绪，需要更多背景来进一步梳理。',
    suggestion: '试着记录：发生了什么、身体有什么感觉、你最需要什么支持。若困扰持续或加重，建议联系专业心理咨询师。',
  };
}

function App() {
  const [companionInput, setCompanionInput] = useState('最近压力很大');
  const companionReply = useMemo(() => createCompanionReply(companionInput), [companionInput]);

  return (
    <>
      <header className="site-header">
        <a className="brand" href="#home" aria-label="心语疗愈阁首页">
          <span className="brand-icon">心</span>
          <span>
            心语疗愈阁
            <small>Xin Yu Healing</small>
          </span>
        </a>
        <nav className="nav-links" aria-label="主导航">
          <a href="#home">首页</a>
          <a href="#psychoeducation">心理科普</a>
          <a href="#tests">情绪测试</a>
          <a href="#ai-companion">AI陪伴</a>
          <a href="#about">关于我们</a>
          <a className="nav-cta" href="#booking">预约咨询</a>
        </nav>
      </header>

      <main>
        <section className="hero fade-section" id="home">
          <div className="hero-content">
            <p className="eyebrow">温暖 · 专业 · 可实践</p>
            <h1>把难以言说的情绪，轻轻安放在这里。</h1>
            <p className="hero-lead">
              心语疗愈阁面向压力人群、职场焦虑者、青少年家长和所有关注心理健康的人，提供心理健康科普、情绪自测与咨询预约入口。
            </p>
            <div className="hero-actions">
              <a className="button primary" href="#tests">开始情绪测试</a>
              <a className="button secondary" href="#psychoeducation">阅读心理科普</a>
            </div>
            <dl className="hero-metrics" aria-label="平台服务亮点">
              <div>
                <dt>5 大</dt>
                <dd>心理科普主题</dd>
              </div>
              <div>
                <dt>3 项</dt>
                <dd>情绪自测入口</dd>
              </div>
              <div>
                <dt>15 分钟</dt>
                <dd>初谈预约</dd>
              </div>
            </dl>
          </div>
          <div className="hero-visual" aria-label="人物疗愈插画与自然元素">
            <div className="sun-glow"></div>
            <div className="leaf leaf-one"></div>
            <div className="leaf leaf-two"></div>
            <div className="leaf leaf-three"></div>
            <div className="illustration-card">
              <div className="moon"></div>
              <div className="person-illustration" aria-hidden="true">
                <span className="head"></span>
                <span className="hair"></span>
                <span className="body"></span>
                <span className="arm arm-left"></span>
                <span className="arm arm-right"></span>
                <span className="heart-light"></span>
              </div>
              <div className="ground"></div>
            </div>
            <div className="floating-note">
              <strong>今日练习</strong>
              <span>给自己三次深呼吸的时间</span>
            </div>
            <div className="therapy-tags" aria-label="疗愈服务关键词">
              <span>压力调节</span>
              <span>情绪陪伴</span>
              <span>亲子沟通</span>
            </div>
          </div>
        </section>

        <section className="intro section-block reveal-section">
          <div>
            <p className="eyebrow">心理疗愈介绍</p>
            <h2>用科学科普与温柔陪伴，帮助你恢复内在稳定。</h2>
          </div>
          <p>
            我们相信心理疗愈不是“变得完美”，而是在真实生活中学会照顾自己。平台内容覆盖压力调节、焦虑管理、情绪内耗、亲子沟通和青少年心理支持，帮助用户建立可持续的心理健康习惯。
          </p>
        </section>

        <section className="brand-highlights reveal-section" aria-label="品牌疗愈体验">
          <article>
            <span>01</span>
            <h3>被看见</h3>
            <p>用温柔语言解释情绪，不把脆弱视为问题。</p>
          </article>
          <article>
            <span>02</span>
            <h3>有方法</h3>
            <p>把心理学概念转化为日常可练习的小步骤。</p>
          </article>
          <article>
            <span>03</span>
            <h3>可持续</h3>
            <p>帮助你建立适合自己的恢复节奏与支持系统。</p>
          </article>
        </section>

        <section className="section-block reveal-section" id="psychoeducation">
          <div className="section-title">
            <p className="eyebrow">心理科普页面</p>
            <h2>按主题找到你需要的心理健康知识。</h2>
          </div>
          <div className="category-list" aria-label="心理科普分类">
            {categories.map((category) => (
              <a href={`#${category}`} key={category}>{category}</a>
            ))}
          </div>
          <div className="article-grid">
            {articles.map((article) => (
              <article className="article-card" id={article.category} key={article.title}>
                <span>{article.category}</span>
                <h3>{article.title}</h3>
                <p>{article.summary}</p>
                <small>{article.readTime}</small>
              </article>
            ))}
          </div>
        </section>

        <section className="tests section-block reveal-section" id="tests">
          <div className="section-title">
            <p className="eyebrow">情绪测试页面</p>
            <h2>用简短评估，开启一次自我觉察。</h2>
          </div>
          <div className="test-grid">
            {tests.map((test) => (
              <article className="test-card" key={test.title}>
                <h3>{test.title}</h3>
                <p>{test.description}</p>
                <div>
                  <small>{test.duration}</small>
                  <a href="#booking">开始评估</a>
                </div>
              </article>
            ))}
          </div>
        </section>



        <section className="ai-companion section-block reveal-section" id="ai-companion">
          <div className="section-title">
            <p className="eyebrow">AI心理陪伴模块</p>
            <h2>把此刻的感受说出来，先获得一点温柔回应。</h2>
            <p>
              你可以输入“最近压力很大”“每天不开心”“感觉很累”等内容，AI 会提供情绪陪伴、初步情绪识别和简单自助建议。
            </p>
          </div>
          <div className="companion-panel">
            <label htmlFor="companion-input">我现在想说</label>
            <textarea
              id="companion-input"
              value={companionInput}
              onChange={(event: { target: { value: string } }) => setCompanionInput(event.target.value)}
              placeholder="例如：最近压力很大 / 每天不开心 / 感觉很累"
              rows={5}
            />
            <div className="reply-card" aria-live="polite">
              <article>
                <span>温暖回应</span>
                <p>{companionReply.warmth}</p>
              </article>
              <article>
                <span>情绪识别</span>
                <p>{companionReply.emotion}</p>
              </article>
              <article>
                <span>简单心理建议</span>
                <p>{companionReply.suggestion}</p>
              </article>
            </div>
            <p className="ai-disclaimer">
              AI仅提供心理健康陪伴和信息参考，不能替代专业心理咨询。
            </p>
          </div>
        </section>

        <section className="booking reveal-section" id="booking">
          <div>
            <p className="eyebrow">咨询预约入口</p>
            <h2>如果你愿意，我们可以一起梳理此刻的困扰。</h2>
          </div>
          <a className="button primary" href="mailto:hello@xinyuhealing.com">预约 15 分钟初谈</a>
        </section>

        <section className="about section-block reveal-section" id="about">
          <div>
            <p className="eyebrow">关于我们页面</p>
            <h2>心语疗愈阁 Xin Yu Healing</h2>
          </div>
          <p>
            心语疗愈阁是一个面向普通用户的心理健康科普和情绪疗愈平台。我们以专业、尊重和保密为原则，将复杂的心理学知识转化为可理解、可练习、可持续的日常支持。
          </p>
        </section>
      </main>

      <footer className="site-footer">
        <div>
          <h2>心语疗愈阁</h2>
          <p>愿每一次被理解，都成为重新出发的力量。</p>
        </div>
        <address>
          <strong>联系方式</strong>
          <a href="mailto:hello@xinyuhealing.com">hello@xinyuhealing.com</a>
          <a href="tel:+8613800000000">+86 138 0000 0000</a>
          <span>微信咨询入口：XinYuHealing</span>
        </address>
      </footer>
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
