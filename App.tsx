import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import CodeBlock from './components/CodeBlock';
import { INSTALL_CMD, ENV_TEMPLATE, ROUTE_CODE, AUTH_UTILS_CODE, PACKAGE_JSON_CHECK } from './constants';
import { NavItem } from './types';

// Icons
const TerminalIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="4 17 10 11 4 5"></polyline><line x1="12" y1="19" x2="20" y2="19"></line></svg>
);
const KeyIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"></path></svg>
);
const CodeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
);
const BoxIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
);
const RocketIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"></path><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"></path><path d="M9 12H4s.55-3.03 2-4c1.62-1.1 4-1 4-1s.38 2.38-1 4z"></path><path d="M12 15v5s3.03-.55 4-2c1.1-1.62 1-4 1-4s-2.38-.38-4 1z"></path></svg>
);

const NAV_ITEMS: NavItem[] = [
  { id: 'setup', label: '1. 프로젝트 설정', icon: <TerminalIcon /> },
  { id: 'env', label: '2. 환경 변수', icon: <KeyIcon /> },
  { id: 'utils', label: '3. 인증 유틸리티', icon: <BoxIcon /> },
  { id: 'route', label: '4. API 라우트', icon: <CodeIcon /> },
  { id: 'usage', label: '5. 사용 및 배포', icon: <RocketIcon /> },
];

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState('setup');

  const renderContent = () => {
    switch (activeSection) {
      case 'setup':
        return (
          <div className="space-y-6 animate-fadeIn">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">프로젝트 설정 (Project Setup)</h2>
              
              <div className="mb-6 p-4 bg-indigo-500/10 border border-indigo-500/30 rounded-lg">
                <h3 className="text-indigo-400 font-semibold mb-2 flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  명령어는 어디서 실행하나요?
                </h3>
                <p className="text-sm text-slate-300 mb-3">
                  이 명령어들은 GitHub 웹사이트가 아닌 <strong>터미널(Terminal)</strong> 환경에서 실행해야 합니다. 두 가지 방법이 있습니다.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                  <div className="bg-slate-900/50 p-3 rounded border border-slate-700">
                    <strong className="text-white block mb-1">방법 A: 내 컴퓨터 (로컬)</strong>
                    <span className="text-slate-400">내 컴퓨터의 VS Code 터미널, 명령 프롬프트(CMD) 등을 열어서 실행하세요. (Node.js 설치 필요)</span>
                  </div>
                  <div className="bg-slate-900/50 p-3 rounded border border-slate-700">
                    <strong className="text-white block mb-1">방법 B: GitHub Codespaces</strong>
                    <span className="text-slate-400">GitHub 저장소 생성 후 <code className="bg-black/30 px-1 rounded">&lt;&gt; Code</code> 버튼 &gt; <strong>Codespaces</strong> 탭에서 새 환경을 만들면 웹에서 바로 터미널을 쓸 수 있습니다.</span>
                  </div>
                </div>
              </div>

              <p className="text-slate-400">
                올바른 설정으로 새로운 Next.js 프로젝트를 생성합니다. 
                <br/>
                <span className="text-yellow-400 font-semibold">중요:</span> 이 가이드의 파일 경로와 일치시키기 위해 특정 플래그(예: <code>--no-src-dir</code>)를 사용하여 프로젝트를 생성해야 합니다.
              </p>
            </div>
            <CodeBlock fileName="Terminal" code={INSTALL_CMD} language="bash" />
            <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
              <h3 className="text-blue-400 font-semibold mb-1">아키텍처 노트</h3>
              <p className="text-sm text-slate-300">
                <code>trading-bot</code> 폴더 내부에서 <code>git init</code>을 실행하는 것이 중요합니다. 
                이렇게 해야 GitHub에 푸시했을 때 리포지토리 최상위 경로(Root)에 <code>package.json</code> 파일이 위치하게 되어, Vercel이 Next.js 버전을 올바르게 감지할 수 있습니다.
              </p>
            </div>
          </div>
        );
      case 'env':
        return (
          <div className="space-y-6 animate-fadeIn">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">환경 변수 (Environment Variables)</h2>
              <p className="text-slate-400">
                <code>.env.local</code> 파일에 API 키를 설정합니다. 이 파일은 절대 깃(Git) 저장소에 커밋하면 안 됩니다.
              </p>
            </div>
            <CodeBlock fileName=".env.local" code={ENV_TEMPLATE} language="properties" />
            <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
              <h3 className="text-yellow-400 font-semibold mb-1">보안 경고</h3>
              <p className="text-sm text-slate-300">
                업비트 API 키 생성 시 <strong>자산 조회</strong> 및 <strong>주문</strong> 권한은 허용하되, 
                보안을 위해 <strong>출금</strong> 권한은 반드시 비활성화하세요.
              </p>
            </div>
          </div>
        );
      case 'utils':
        return (
          <div className="space-y-6 animate-fadeIn">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">인증 유틸리티 (Auth Utility)</h2>
              <p className="text-slate-400">
                JWT 토큰 생성을 처리하는 유틸리티 파일을 생성합니다. 업비트는 쿼리 해시(query hash)를 포함한 특정 페이로드 구조를 요구합니다.
              </p>
            </div>
            <CodeBlock fileName="lib/upbit-auth.ts" code={AUTH_UTILS_CODE} language="typescript" />
          </div>
        );
      case 'route':
        return (
          <div className="space-y-6 animate-fadeIn">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">API 라우트 구현 (API Route)</h2>
              <p className="text-slate-400">
                TradingView 웹훅을 처리하는 메인 서버리스 함수입니다. 
                페이로드를 파싱하고 요청을 검증한 뒤, 업비트 주문 API를 실행합니다.
              </p>
            </div>
            <CodeBlock fileName="app/api/webhook/route.ts" code={ROUTE_CODE} language="typescript" />
            <div className="p-4 bg-slate-800 rounded-lg border border-slate-700">
              <h3 className="text-white font-semibold mb-2">TradingView 페이로드 JSON</h3>
              <p className="text-sm text-slate-400 mb-2">TradingView 얼럿 웹훅 설정 시 아래 JSON 형식을 사용하세요:</p>
              <pre className="bg-black/50 p-3 rounded text-sm font-mono text-green-400">
{`{
  "ticker": "BTC",
  "action": "{{strategy.order.action}}",
  "price": {{strategy.order.price}},
  "volume": {{strategy.order.contracts}}
}`}
              </pre>
            </div>
          </div>
        );
      case 'usage':
        return (
          <div className="space-y-6 animate-fadeIn">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">사용 및 배포 가이드</h2>
              <p className="text-slate-400">
                질문하신 내용에 대한 답변과 올바른 GitHub 저장 방법을 안내해 드립니다.
              </p>
            </div>
            
            {/* Critical Answer Block */}
            <div className="p-5 bg-red-500/10 border border-red-500/30 rounded-lg border-l-4 border-l-red-500">
              <h3 className="text-red-400 font-bold text-lg mb-2 flex items-center">
                <svg className="w-6 h-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                답변: 파일명을 절대 바꾸지 마세요!
              </h3>
              <div className="text-sm text-slate-300 space-y-3">
                <p className="font-medium text-white text-base">
                  Q. "package.json을 next.js로 파일명을 바꿔서 ... 수정해야해?"
                </p>
                <p className="text-red-300 bg-red-900/20 p-2 rounded">
                  A. <strong>아니요, 절대 안 됩니다.</strong><br/>
                  설정 파일의 이름은 무조건 <code>package.json</code>이어야 합니다. 
                  <code>next.js</code>라는 파일명은 Node.js가 인식하지 못해 프로젝트가 아예 실행되지 않습니다.
                </p>
              </div>
            </div>

            {/* Visual File Tree */}
             <div className="bg-slate-900 border border-slate-700 rounded-lg p-5">
               <h4 className="text-green-400 font-bold mb-4 flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  GitHub에 업로드해야 할 올바른 구조
               </h4>
               <p className="text-sm text-slate-400 mb-4">
                 새로 만든 <code>trading-bot</code> 폴더 안의 내용이 아래와 같아야 합니다. 이 상태로 GitHub에 Push 하세요.
               </p>
               <div className="font-mono text-sm leading-7 bg-black/30 p-4 rounded border border-slate-800">
                  <div className="text-blue-300">trading-bot/ <span className="text-slate-600 ml-2">// (프로젝트 루트 폴더)</span></div>
                  <div className="text-slate-400 pl-4 border-l border-slate-700 ml-2 relative">
                    <span className="text-slate-600 mr-2">├──</span>
                    <span className="text-yellow-400 font-bold">package.json</span> 
                    <span className="text-green-500 text-xs ml-3">✅ (이 이름 그대로 유지!)</span>
                  </div>
                  <div className="text-slate-400 pl-4 border-l border-slate-700 ml-2">
                    <span className="text-slate-600 mr-2">├──</span>
                    <span>next.config.mjs</span>
                  </div>
                  <div className="text-slate-400 pl-4 border-l border-slate-700 ml-2">
                    <span className="text-slate-600 mr-2">├──</span>
                    <span>tsconfig.json</span>
                  </div>
                  <div className="text-slate-400 pl-4 border-l border-slate-700 ml-2">
                    <span className="text-slate-600 mr-2">├──</span>
                    <span className="text-blue-300">app/</span>
                  </div>
                  <div className="text-slate-400 pl-8 border-l border-slate-700 ml-2">
                     <span className="text-slate-600 mr-2">└──</span>
                     <span className="text-blue-300">api/</span>
                  </div>
                  <div className="text-slate-400 pl-12 border-l border-slate-700 ml-2">
                     <span className="text-slate-600 mr-2">└──</span>
                     <span className="text-blue-300">webhook/</span>
                  </div>
                  <div className="text-slate-400 pl-16 border-l border-slate-700 ml-2">
                     <span className="text-slate-600 mr-2">└──</span>
                     <span className="text-white font-bold">route.ts</span>
                  </div>
               </div>
            </div>

            <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
               <h4 className="text-blue-400 font-bold mb-2">GitHub 저장(Push) 방법 요약</h4>
               <ol className="list-decimal list-inside text-slate-300 space-y-2 text-sm">
                 <li>터미널을 엽니다.</li>
                 <li><code className="bg-slate-800 px-1 rounded">cd trading-bot</code> 명령어로 폴더에 들어갑니다.</li>
                 <li><code className="bg-slate-800 px-1 rounded">git add .</code></li>
                 <li><code className="bg-slate-800 px-1 rounded">git commit -m "Trading bot setup"</code></li>
                 <li><code className="bg-slate-800 px-1 rounded">git push origin main</code></li>
               </ol>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-slate-950 text-slate-200 font-sans">
      <Sidebar 
        navItems={NAV_ITEMS} 
        activeId={activeSection} 
        onSelect={setActiveSection} 
      />
      
      <main className="flex-1 p-6 md:p-12 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default App;