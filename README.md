# MOM RABBITMQ MOM TASK

## Table of Contents

* [Quickstart](#quickstart)
* [Interval Producer](#interval-producer)
* [Interval Consumer](#interval-consumer)
* [Upper Case Service](#upper-case-service)
* [Upper Case Client](#upper-case-client)
* [Tests Run](#tests-run)

### Quickstart
* docker [java.com](https://www.java.com/en/download/) (Recommended Version)
* Download nodeJS LST [nodejs.org](https://nodejs.org/en/download/)
* RabbitMQ `rabbitmq.com`(https://www.rabbitmq.com/download.html)
* Download all libraries and dependencies by running command `npm install` from the current directory
* To run rabbitmq docker image locally `docker run -it --rm --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:3.11-management`

### Interval Producer
* Sending message to exchange every 2 seconds
    * `npm run interval-producer`

### Interval Consumer
* Reading from queue bound to interval exchange
    * `npm run interval-consumer`
### Upper Case Service

* Service answering with upper case text to requestor queue
    * `npm run upper-case-server`
### Upper Case Client

* Requesting upper cased text from server
    * `npm run upper-case-client -- "test test test"`

### Tests Run
Unit tests `npm run test-unit`
Integration tests `npm run test-integration`