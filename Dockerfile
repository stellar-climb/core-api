# =================================================================
# 1. 빌드 단계 (Builder Stage)
# =================================================================
FROM node:22-alpine AS builder

WORKDIR /app

# package.json과 lock 파일을 먼저 복사하여 캐싱 활용
COPY package*.json ./

# NestJS는 빌드 스크립트 실행을 위해 devDependencies가 필요
RUN npm install

# 소스 코드를 복사
COPY . .

# NestJS 애플리케이션을 빌드
RUN npm run build

# =================================================================
# 2. 최종 배포 단계 (Final Stage)
# =================================================================
# 다시 깨끗하고 가벼운 이미지에서 시작
FROM node:22-alpine

WORKDIR /app

# [중요] 빌드 단계에서 필요한 파일들만 선택적으로 복사
# 1. 빌드 결과물(dist 폴더)
COPY --from=builder /app/dist ./dist
# 2. 프로덕션용 의존성(node_modules)
COPY --from=builder /app/node_modules ./node_modules
# 3. package.json 파일
COPY --from=builder /app/package.json ./package.json

# 보안을 위해 non-root 유저로 실행
USER node

# 애플리케이션 포트 노출
EXPOSE 3000

# [핵심] 컴파일된 main.js 파일을 실행
CMD [ "node", "dist/main.js" ]