# Tolerance Viewer User Interface

This AngularJS application exposes the Viewer front-end, that displays Tolerance's message profiles.

## Docker

You can run the API using the `tolerance/viewer-api` Docker Image.
```
docker run -d \
    -e UI_PORT=80 \
    -e API_ROOT=http://viewer_api.docker/app_dev.php \
    tolerance/viewer-ui
```

## Contributing

To run the application, you first need to install dependencies:
```
npm install
bower install
```

You should use the docker-compose configuration at the root of the repository to run both the UI and the API at the
same time. If you want to run this UI only, you can start the server using `gulp`:
```
gulp serve
```

