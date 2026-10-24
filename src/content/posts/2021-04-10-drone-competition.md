---
title: IEEE Region 5 Drone Competition 2021
date: 2021-04-10
author: Connor Monahan
---

Due to the impacts of COVID, the IEEE student robotics competitions were moved to an online format this year, where each team competed individually with an identical Tello EDU drone. The objective of the competition was to pop four colored balloons in a specified order within a 3m x 3m arena.

My team, the WashU student branch, placed 3rd in our division by popping the first balloon quickly. A better run where we popped all four balloons within the time limits can be seen below:

<iframe width="560" height="315" src="https://www.youtube.com/embed/wuHYLvlusmE" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

Some of our specific design decisions included the use of limonene-soaked sponges on the propeller guards to pop the balloons safely. Our software, based on the TelloPy SDK, solved for the position of the balloons as seen by the drone's onboard cameras by filtering for each bright color independently. The calculated distance, height, and angle to each balloon was used to allow the drone to come in for a smooth approach, while still taking precautions in the presence of noise. The source code of our control loops and computer vision solution is available on GitHub:

https://github.com/washuieee/drone2021/
