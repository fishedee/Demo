#!/bin/sh

curl -i -XPOST 'http://localhost:8086/write?db=test' --data-binary @cpu_data.txt

curl -G 'http://localhost:8086/query?pretty=true' --data-urlencode "db=test" --data-urlencode "q=SELECT \"value\" FROM \"cpu_load_short\" WHERE \"region\"='us-west'"

