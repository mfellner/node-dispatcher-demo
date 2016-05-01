FROM node:6.0.0

RUN adduser --disabled-login --disabled-password --gecos "" node

ENV HOME /home/node

WORKDIR $HOME

COPY package.json $HOME/package.json

RUN npm install

COPY src/ $HOME/src/

RUN npm run dist

RUN chown -R node:node $HOME && \
    chmod -R 0770 $HOME

USER node

EXPOSE 3000

ENTRYPOINT ["npm", "start"]
