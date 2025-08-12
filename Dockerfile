# =================================================================
# 1. 빌드 단계 (Builder Stage)
# =================================================================
# Alpine Linux 기반의 가볍고 특정 버전이 명시된 이미지를 사용합니다.
FROM node:22-alpine AS builder

# 작업 디렉터리를 설정합니다.
WORKDIR /app

# package.json과 package-lock.json을 먼저 복사합니다.
# -> 이 파일들이 변경되지 않으면 다음 RUN 단계는 캐시를 사용해 빌드 속도가 빨라집니다.
COPY package*.json ./

# 프로덕션용 의존성만 설치하여 빌드 시간을 단축하고 이미지 크기를 줄입니다.
RUN npm install --only=production

# 소스 코드를 복사합니다.
COPY . .

# (선택) 만약 TypeScript 등 빌드 과정이 필요하다면 여기에 추가합니다.
# RUN npm run build

# =================================================================
# 2. 최종 배포 단계 (Final Stage)
# =================================================================
# 다시 깨끗하고 가벼운 이미지에서 시작합니다.
FROM node:22-alpine

WORKDIR /app

# 빌드 단계(builder)에서 생성된 파일들만 선택적으로 복사합니다.
# -> 소스 코드나 개발용 의존성 등 불필요한 파일은 최종 이미지에 포함되지 않습니다.
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app .

# 보안을 위해 root 사용자가 아닌 node 사용자로 컨테이너를 실행합니다.
USER node

# 이 컨테이너가 3000번 포트를 사용함을 명시적으로 알립니다.
EXPOSE 3000

# 컨테이너가 시작될 때 실행할 기본 명령어를 정의합니다.
CMD [ "node", "src/index.js" ]