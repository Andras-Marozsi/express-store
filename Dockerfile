FROM node:boron

ADD package.json package.json
RUN npm install
ADD . .

CMD ["node","app.js"]
