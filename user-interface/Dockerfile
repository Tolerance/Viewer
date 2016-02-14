FROM node

RUN npm install -g gulp bower

WORKDIR /app

COPY package.json /app/package.json
RUN npm install

COPY bower.json /app/bower.json
RUN bower install --allow-root

COPY . /app
RUN gulp build

CMD ["/app/docker/run.sh"]
