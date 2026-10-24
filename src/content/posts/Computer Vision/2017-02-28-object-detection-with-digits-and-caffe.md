---
id: 71
title: Object Detection with DIGITS and Caffe
date: 2017-02-28T22:08:47+00:00
author: Connor Monahan
layout: post
guid: https://connormonahan.net/?p=71
permalink: /2017/02/28/object-detection-with-digits-and-caffe/
tags: robotics,FRC
---
This is a simplified version of the notes I took while creating and training a neural network to detect balls in the FRC 2017 game. This will be further updated with additional detail as time allows.

Requirements: Vatic, DIGITS, NvCaffe

An input data set of images with the object for detection in the target environment needs to be captured. About one minute of HD video at 30 FPS should be sufficient.

In order for DetectNet to find the location of the bounding boxes, it needs to know the ground truth position and location of these in the training data set. Vatic can be used for this process as it will allow for the division of effort of annotating the objects in the images between multiple individuals, and it requires very little training of the operators.

The output.txt file produced by vatic details the bounding box locations for each frame of the input image. A python script is then used to extract the frame numbers and dimensions from this file and build the folder structure demanded by DetectNet, which is the same as the KITTI data set. The layout appears as follows:

    ./train
    ./train/images
    ./train/images/00001.jpg
    ./train/labels
    ./train/labels/00001.txt
    ./val
    ./val/images
    ./val/images/00001.jpg
    ./val/labels
    ./val/labels/00001.txt

In DIGITS, create a new object detection data set with the folders as described above. In order to use the original DetectNet network without modification, adjust the padding and resize options so the final output size is 1248&#215;384. For images with heights greater than 384, this may first involve padding to fit the image to a 3.25 aspect ratio followed by a resize. The remainder of the settings here can be left as default, and modification of custom classes can be avoided by simply using class names from the KITTI dataset, such as car or pedestrian for the new input.

Then, create a new object detection model from this dataset. Set training epochs to 100, batch size to the graphics card&#8217;s limits (a batch size of 10 requires 12 GB of dedicated video memory), solver type to Adam, learning rate to 0.0001, and policy to exponential decay. Disable mean image subtraction. Choose custom network and paste [the contents of the reference DetectNet network](https://raw.githubusercontent.com/NVIDIA/caffe/caffe-0.15/examples/kitti/detectnet_network.prototxt). To speed learning, [download the pretrained weights for the GoogLeNet network](http://dl.caffe.berkeleyvision.org/bvlc_googlenet.caffemodel) to the computer running DIGITS and set the path below accordingly. Click create to begin training.

The model will begin training, and may take hours even on top of the line graphics cards. The output named mAP is close to percentage accuracy for this task and it will increase from zero if the model is learning.

Final output:

![Image of ball on field with red rectangle drawn due to its being recognized by the algorithm](/images/visual-300x160.png)

