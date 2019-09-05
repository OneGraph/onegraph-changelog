FROM node:10-alpine as builder

RUN npm install -g yarn

ENV HOST 0.0.0.0
ENV RAZZLE_PUBLIC_DIR build/public
ENV PORT 8080
ENV RAZZLE_ONEGRAPH_APP_ID="d10667f4-a52f-4f77-ac7c-e3ff3644a0e8"

COPY package.json .
COPY yarn.lock .

RUN yarn install

COPY . .

RUN yarn razzle build

# Make smaller prod image
FROM node:10-alpine

ENV NODE_ENV production
ENV HOST 0.0.0.0
ENV RAZZLE_PUBLIC_DIR build/public
ENV PORT 8080
ENV RAZZLE_ONEGRAPH_APP_ID="d10667f4-a52f-4f77-ac7c-e3ff3644a0e8"

COPY package.json .
COPY yarn.lock .

RUN npm install --production

COPY --from=builder build build
CMD [ "node", "/build/server.js" ]