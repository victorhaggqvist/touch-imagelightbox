<?php
$images = '[
{"src": "14448239362_53203a94bf_o.jpg", "name": "Sunrise", "url": "https://secure.flickr.com/photos/manal/14448239362"},
{"src": "6260329772_7ce10ac83c_o.jpg", "name": "transalpina", "url": "https://secure.flickr.com/photos/dexxus/6260329772"},
{"src": "7073381043_e3e50744eb_o.jpg", "name": "Water, rocks, sun, sea and cloud!", "url": "https://secure.flickr.com/photos/avidlyabide/7073381043"},
{"src": "9440861328_1326d64dbd_o.jpg", "name": "Sunday nature", "url": "https://secure.flickr.com/photos/pixlense/9440861328"},
{"src": "4440609236_fbfbe396b5_o.jpg", "name": "Light after Darkness", "url": "https://secure.flickr.com/photos/japokskee/4440609236"},
{"src": "14459672716_2fd51d6133_o.jpg", "name": "A Dragonfly!", "url": "https://secure.flickr.com/photos/lingeswaran/14459672716"},
{"src": "14461842031_f854d30f15_o.jpg", "name": "Marumi DHG Macro 200 + Tamron 17-50mm. 2.8", "url": "https://secure.flickr.com/photos/gaby1/14461842031"},
{"src": "6178731018_10e6fd6a9d_o.jpg", "name": "Times Square in the rain", "url": "https://secure.flickr.com/photos/en321/6178731018"},
{"src": "12173370053_39624f5dc6_o.jpg", "name": "Manchester City Centre - Northern Quarter Viewed from the 15th Floor", "url": "https://secure.flickr.com/photos/staceycav/12173370053"},
{"src": "8677766442_7d184f890e_o.jpg", "name": "City sunset", "url": "https://secure.flickr.com/photos/melburnian/8677766442"},
{"src": "8553010494_a36be7fcc8_o.jpg", "name": "City Lights", "url": "https://secure.flickr.com/photos/duncanh1/8553010494"},
{"src": "3155078790_b365637b61_o.jpg", "name": "Ready . . . Set ....................", "url": "https://secure.flickr.com/photos/oneworldgallery/3155078790"},
{"src": "443441197_c38caf32ee_o.jpg", "name": "Lights ou", "url": "https://secure.flickr.com/photos/aussiegall/443441197"},
{"src": "4436427104_9cd5f0daba_o.jpg", "name": "Golden Gate Bridge", "url": "https://secure.flickr.com/photos/kevcole/4436427104"},
{"src": "9212256888_c44fdaa46f_o.jpg", "name": "Red Spruce Peak", "url": "https://secure.flickr.com/photos/dbnunley/9212256888"},
{"src": "8573651373_6650a080d1_o.jpg", "name": "The Lou Ruvo Center for Brain Health, Las Vegas, Nevada", "url": "https://secure.flickr.com/photos/opalsson/8573651373/"},
{"src": "1483066391_ba9ceea56a_o.jpg", "name": "Nightfall over South End of Stockholm", "url": "https://secure.flickr.com/photos/ichimusai/1483066391"},
{"src": "5578985145_640f215e42_o.jpg", "name": "Grand Canyon Morning #dailyshoot", "url": "https://secure.flickr.com/photos/leshaines123/5578985145"}]';

if (isset($srgv)) {
  if (count($argv)>1 && $argv[1]=='md') {
    $mdfile = "Image Credits\n=============\nAll images are licensed CC BY 2.0\nfile - name - source";
    $json = json_decode($images);
    foreach ($json as $img) {
      $mdfile .= "\n- ".$img->src." - ".$img->name." - ".$img->url;
    }
    file_put_contents('images.md',$mdfile);
    echo 'images.md created';
  }
}

 ?>
