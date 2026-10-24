---
title: Programming various Atmel chips
date: 2017-11-11 20:06
authors: Connor Monahan
category: Hardware
tags: arduino, atmel
slug: programming-various-atmel-chips
summary: Guides for programming several external Atmel chips with an Arduino
---

This is meant to be a compendium of programming guides for a series of useful Atmel chips.

Diagram of the Arduino Uno, which will be used to program each of these chips:


## ATmega328P

Diagram: ![ATmega328P pinout](/images/pinoutmega328.png)


### One time: burning the bootloader

  1. Connect an unwired Arduino to the computer.
  2. Set Tools/Board to &#8220;Arduino/Genuino Uno&#8221; and upload the example ArduinoISP sketch.
  3. In Documents/Arduino, create a new folder called &#8220;hardware&#8221;.
  4. Download [breadboard-1.6.zip](https://www.arduino.cc/en/uploads/Tutorial/breadboard-1-6-x.zip) and unzip it in the hardware folder. The final directory tree should look like this:

     ![Arduino IDE hardware folder structure](/images/idebootloaders.png)
  
  5. Restart the Arduino IDE.
  6. Wire the devices as shown.

     ![ATmega328P on a breadboard bootloader configuration](/images/wirediagrammega328.png)
  
  7. Connect a 10 µF capacitor from reset to ground on the Arduino.
  8. Set Tools/Board to &#8220;ATmega328 on a breadboard (8MHz internal)&#8221;.
  9. Set Tools/Programmer to &#8220;Arduino as ISP&#8221;
 10. Click Tools/Burn Bootloader.
 11. Post the error it gives you in the comments below. (hopefully none)

### Every time: uploading sketches

  1. Set Tools/Board to &#8220;ATmega328 on a breadboard (8MHz internal)&#8221;.
  2. Set Tools/Programmer to &#8220;Arduino/Genuino Uno&#8221;
  3. Wire the device like shown.
  
     ![ATmega328P on a breadboard programming configuration](/images/wirediagrammega328.2.png)

  4. Press the upload button.

## ATmega328 (without the P)

Seriously consider buying a regular ATmega328P unless this is all they have at your local electronics store.

### One time: burning the bootloader

Follow the same instructions as for ATmega328P, but after step 3 edit &#8220;boards.txt&#8221; within Arduino/hardware/breadboard/avr. Find the line that reads &#8220;atmega328bb.build.mcu=atmega328p&#8221; and change atmega328**p** to atmega328. After step 9, revert this change (the bootloader causes the chip to respond in the same way as a ATmega328P).

### Every time: uploading sketches

Same instructions as for ATmega328P

## ATtiny84 (14-pin DIP)

No bootloader is required.

Diagram: ![ATtiny84/85 pinout](/images/pinouttiny8485.png)


### Uploading sketches:

  1. Connect an unwired Arduino to the computer.
  2. Set Tools/Board to &#8220;Arduino/Genuino Uno&#8221; and upload the example ArduinoISP sketch.
  3. Open Arduino&#8217;s preferences. In Additional Boards Manager URLs, insert `https://raw.githubusercontent.com/damellis/attiny/ide-1.6.x-boards-manager/package_damellis_attiny_index.json` and press OK.
  4. Go to Tools/Boards/Boards Manager. Search for attiny. Click the first result and press Install.
  5. Restart the Arduino IDE.
  6. Wire the board as follows.
  
     ![ATtiny84 on a breadboard programming configuration](/images/wirediagramtiny84.png)

  7. Set Tools/Board to ATtiny24/44/84
  8. Set Tools/Processer to ATtiny84
  9. Set Tools/Clock to 1MHz
 10. Set Tools/Programmer to Arduino as ISP.
 11. Click Sketch/Upload using Programmer.

## ATtiny85 (8-pin DIP)

No bootloader is required.

### Uploading sketches:

Follow the instructions for the ATtiny84. For step 6, wire the board as follows:

![ATtiny85 on a breadboard programming configuration](/images/wirediagramtiny85.png)

For step 7, select ATtiny25/45/85. For step 8, select ATtiny85.


Sources:

  * https://www.arduino.cc/en/Tutorial/ArduinoToBreadboard
  * http://42bots.com/tutorials/programming-attiny84-attiny44-with-arduino-uno/
  * http://42bots.com/tutorials/how-to-program-attiny85-with-arduino-uno-part-1/
  * http://www.pighixxx.com/
