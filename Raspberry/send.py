from __future__ import print_function

import requests
import json

headers = {
    'content-type': 'application/json'
}

params = {
  "ean": "",
  "lat": "",
  "lon": "",
  "acc": "",
  "datetime": "2017-10-18T09:04:01.942Z"
}

url = "http://localhost:8080/v1/pos"
resp = requests.post(url, data=json.dumps(params), headers=headers)

print(resp.content)
