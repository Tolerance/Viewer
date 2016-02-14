# Tolerance Viewer API

This Symfony application exposes the message profiles through an HTTP API to the Viewer user interface.

## Docker

You can run the API using the `tolerance/viewer-api` Docker Image.
```
docker run -d \
    -e NEO4J_HOST=neo4j.docker \
    -e NEO4J_PORT=7474 \
    -e NEO4J_USERNAME=neo4j \
    -e NEO4J_PASSWORD=samuel \
    tolerance/viewer-api
```

## Contributing

Like any Symfony application, you first need to install the dependencies using Composer:
```
composer install
```
