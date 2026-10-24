---
id: 419
title: Computer vision for controller-less robot control
date: 2014-05-16T21:04:32+00:00
author: Connor Monahan
layout: post
guid: http://cmastudios.me/?p=419
permalink: /2014/05/16/computer-vision-for-controller-less-robot-control/
tags: kinect,skeleton,robotics,FRC
---
It is legal (currently) to use computer vision of humans during autonomous mode to command a robot in FRC. This has been accomplished before by other teams, such as The Cheesy Poofs. We designed a different algorithm that allows for control of speed as well.
  
The Ratchet Rockers have designed two different methods to accomplish this control. The first one implemented resembles 254&#8217;s more directly as it is OpenCV. It searches for an object (via color threshold) and uses its position to determine the speed and direction of the robot. This has been tested to work reliably.
  
We also worked on a similar method later using skeleton tracking. One hand tracked works the same way as the previous solution. The other can be used to send specific action commands to, for example, launch a ball at the target. There are some irregularities that occur if the program has been running long, which we haven&#8217;t been able to overcome yet. This program is alternatively written in C#.NET using Microsoft&#8217;s own kinect libraries on windows. We don&#8217;t have confirmed results on the robot yet, but it uses the same protocol as the previous solution.
  
Even in the off season time of summer, our team 1706 continues productivity in vision and control solutions.
