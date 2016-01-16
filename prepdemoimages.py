#!/usr/bin/env python
import os
import requests
from collections import namedtuple
from jinja2 import FileSystemLoader, Environment
import json

template_env = Environment(loader=FileSystemLoader('.'))
template = template_env.get_template('demotemplate.html.jinja')

Demo = namedtuple('Demo', ['name', 'images'])

demos = [
    Demo(name='Core', images=[]),
    Demo(name='With activity indication', images=[]),
    Demo(name='With overlay & activity indication', images=[]),
    Demo(name='With "close" button & activity indication', images=[]),
    Demo(name='With caption & activity indication', images=[]),
    Demo(name='With navigation & activity indication', images=[]),
    Demo(name='Combination', images=[]),
]

maxnum = len(demos)*3

def put_image(img):
    done = False
    for d in demos:
        if len(d.images) == 3:
            done = True
        else:
            d.images.append(img)
            if len(d.images) == 4:
                done = True
            else:
                return False
    return done


headers = {
    'Authorization': 'Client-ID 3004ee20c6b4822a4ab148506fef3be12eab826823b6d15a84dcdb4dec086f7c'
}

cache_file = '.imgcache.json'
if os.path.isfile(cache_file):
    with open(cache_file, 'r') as f:
        images = json.load(f)
else:
    r = requests.get('https://api.unsplash.com/photos?per_page='+str(maxnum), headers=headers)
    images = r.json()

    with open(cache_file, 'w') as f:
        json.dump(images, f)

for img in images:
    put_image(img)

print(template.render(demos=demos))
