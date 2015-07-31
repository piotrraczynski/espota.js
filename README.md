# Minimalistic OTA (Over the Air) update server for esp8266 Arduino Update class

This is simple, minimalistic script to serve firmware update over WiFi for ESP8266 modules, programmed using arduino:
https://github.com/esp8266/Arduino

This script is direct nodejs rewrite of python script that can be found here:
https://github.com/esp8266/Arduino/blob/esp8266/hardware/esp8266com/esp8266/tools/espota.py

For the purpose of this example (for the sake of simplicity), the script is using blocking FS API.

The script can be tested with esp8266 Arduino example: *DNS_SD_Arduino_OTA.ino*
First flash this example (fill your WiFi ssid/password) using Arduino. Then your module is ready to be used with this server script.

Hint:

For development purposes, when Arduino is open active sketch .bin file can be found in: **/tmp/build/build2108131298899243749.tmp/sketch_name.cpp.bin** 
(number is random and will be different on your host)

Usage:
-----

    node espota.js ESP_ADDRESS ESP_PORT FIRMWARE.BIN # 8266 is default port used in Arduino examples
