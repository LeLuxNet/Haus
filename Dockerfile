FROM node:alpine AS build

RUN apk add --no-cache

RUN git clone https://github.com/LeLuxNet/Haus .

RUN npm install --dev && npm run build

FROM node:alpine

WORKDIR /opt/haus

COPY --from=builder dist .
COPY --from=builder package*.json .

ENV NODE_ENV production

RUN npm install

ENV PORT 80
EXPOSE ${PORT}

CMD ["npm", "start"]
