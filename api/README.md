# Tolerance Viewer API

This Symfony application exposes the message profiles through an HTTP API to the Viewer user interface.

## Docker

You can run the API using the [`sroze/tolerance-viewer-api` Docker image](https://hub.docker.com/r/sroze/tolerance-viewer-api/).

```
docker run -d \
    -e NEO4J_HOST=neo4j.docker \
    -e NEO4J_PORT=7474 \
    -e NEO4J_USERNAME=neo4j \
    -e NEO4J_PASSWORD=samuel \
    sroze/tolerance-viewer-api
```

## Contributing

Like any Symfony application, you first need to install the dependencies using Composer:
```
composer install
```

