
export const INSTALL_CMD = `# 1. Next.js 프로젝트 생성 (App Router 사용, 'src' 폴더 없이 생성)
npx create-next-app@latest trading-bot --typescript --tailwind --eslint --app --no-src-dir --import-alias "@/*"

# 2. 프로젝트 디렉토리로 이동 (필수 단계)
cd trading-bot

# 3. 필요한 의존성 패키지 설치
npm install axios jsonwebtoken uuid
npm install -D @types/jsonwebtoken @types/uuid @types/node

# 4. Git 초기화 (Vercel이 이 폴더를 프로젝트 루트로 인식하게 함)
git init
git add .
git commit -m "Initial setup"`;

export const ENV_TEMPLATE = `# .env.local
# 보안: 실제 키 값은 절대 버전 관리 시스템(Git)에 커밋하지 마세요.
UPBIT_ACCESS_KEY=DUMMY_ACCESS_KEY
UPBIT_SECRET_KEY=DUMMY_SECRET_KEY`;

export const PACKAGE_JSON_CHECK = `{
  "name": "trading-bot",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "axios": "^1.x.x",
    "jsonwebtoken": "^9.x.x",
    "next": "14.x.x",    <-- 이 줄이 반드시 있어야 합니다!
    "react": "^18",
    "react-dom": "^18",
    "uuid": "^9.x.x"
  }
  // ... 기타 설정
}`;

export const AUTH_UTILS_CODE = `import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import crypto from 'crypto';

/**
 * Upbit API 호출을 위한 인증 헤더 생성
 * @param accessKey 업비트 Access Key
 * @param secretKey 업비트 Secret Key
 * @param queryString 요청의 쿼리 스트링 (선택사항)
 */
export const getUpbitAuthHeader = (accessKey: string, secretKey: string, queryString?: string) => {
  const payload: any = {
    access_key: accessKey,
    nonce: uuidv4(),
  };

  // 쿼리 파라미터가 있는 경우, Upbit는 JWT 페이로드에 query_hash를 요구합니다.
  if (queryString) {
    const hash = crypto.createHash('sha512');
    hash.update(queryString, 'utf-8');
    const queryHash = hash.digest('hex');
    
    payload.query_hash = queryHash;
    payload.query_hash_alg = 'SHA512';
  }

  const token = jwt.sign(payload, secretKey);
  return \`Bearer \${token}\`;
};`;

export const ROUTE_CODE = `import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import { getUpbitAuthHeader } from '@/lib/upbit-auth'; // 경로에 맞게 수정 필요
import queryString from 'querystring';

// TradingView에서 전송받을 웹훅 페이로드 구조 정의
interface WebhookPayload {
  ticker: string; // 예: "BTC"
  action: 'buy' | 'sell';
  price?: number; // 매수 시 주문 금액 (KRW)
  volume?: number; // 매도 시 주문 수량
}

export async function POST(req: NextRequest) {
  try {
    // 1. 요청 파싱 및 유효성 검사
    const body: WebhookPayload = await req.json();
    const { ticker, action, price, volume } = body;

    if (!ticker || !action) {
      return NextResponse.json({ error: '필수 필드가 누락되었습니다.' }, { status: 400 });
    }

    // 2. 환경 변수 설정 확인
    const accessKey = process.env.UPBIT_ACCESS_KEY;
    const secretKey = process.env.UPBIT_SECRET_KEY;

    if (!accessKey || !secretKey) {
      console.error('Upbit API 키가 설정되지 않았습니다.');
      return NextResponse.json({ error: '서버 설정 오류' }, { status: 500 });
    }

    // 3. Upbit 주문 파라미터 준비
    // 마켓 단위: KRW (원화 마켓)
    const market = \`KRW-\${ticker.toUpperCase()}\`;
    
    // Upbit 주문 API 바디
    const orderBody: any = {
      market: market,
      side: action === 'buy' ? 'bid' : 'ask',
    };

    // 시장가 주문 로직 (단순화)
    if (action === 'buy') {
      // 시장가 매수 (price) -> 총 매수 금액(KRW) 필요
      // ord_type: 'price'
      if (!price) {
        return NextResponse.json({ error: '매수 주문은 금액(price)이 필요합니다.' }, { status: 400 });
      }
      orderBody.ord_type = 'price';
      orderBody.price = price.toString(); 
    } else {
      // 시장가 매도 (market) -> 총 매도 수량(volume) 필요
      // ord_type: 'market'
      if (!volume) {
        return NextResponse.json({ error: '매도 주문은 수량(volume)이 필요합니다.' }, { status: 400 });
      }
      orderBody.ord_type = 'market';
      orderBody.volume = volume.toString();
    }

    // 4. 인증 헤더 생성
    // axios는 데이터를 자동으로 직렬화하지만, 해시 생성을 위해 원본 쿼리 스트링이 필요합니다.
    const queryElements = [];
    for (const key in orderBody) {
        queryElements.push(\`\${key}=\${orderBody[key]}\`);
    }
    const rawQueryString = queryElements.join('&');

    const authHeader = getUpbitAuthHeader(accessKey, secretKey, rawQueryString);

    // 5. Upbit로 요청 전송
    const response = await axios.post('https://api.upbit.com/v1/orders', orderBody, {
      headers: {
        Authorization: authHeader,
        'Content-Type': 'application/json',
      },
    });

    console.log(\`주문 성공: \${market} \${action}\`, response.data);

    return NextResponse.json({
      success: true,
      message: '주문이 성공적으로 실행되었습니다.',
      data: response.data,
    });

  } catch (error: any) {
    console.error('주문 실패:', error.response?.data || error.message);
    return NextResponse.json(
      { 
        success: false, 
        error: error.response?.data?.error?.message || '내부 서버 오류' 
      },
      { status: 500 }
    );
  }
}`;