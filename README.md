# Webdev-Project - Universe


## Elastic Search Test Commands

[Follow this Article](https://www.elastic.co/blog/getting-started-with-the-elastic-stack-and-docker-compose)

- `docker cp universe-es01-1:/usr/share/elasticsearch/config/certs/ca/ca.crt /tmp/.` - Copy CA cert from container to host
- `curl --cacert /tmp/ca.crt -u elastic:secretpass https://localhost:9200` - Test connection to ElasticSearch

## Kibana Credentials

Username: elastic
Password: secretpass