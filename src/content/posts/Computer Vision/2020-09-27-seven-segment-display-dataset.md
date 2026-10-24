---
title: Like MNIST, but for 7-segment displays
date: 2020-09-27
author: Connor Monahan
---

The original venue for this post is on
[r/MachineLearning](https://np.reddit.com/r/MachineLearning/comments/j10ub1/p_like_mnist_but_for_7segment_displays/), reposted here as I have a working blog now.

I was recently working on a data analysis project, part of which needed to detect the value of a seven segment display. I started by applying an MNIST-trained model, but the error was very high. I went looking for a different dataset and was not finding any easily accessible ones. Eventually, I found this [image generator](https://bitbucket.org/eoinf96/7-segmentdigitgenerator/src/master/) that was designed to create datasets with seven segment display computer-generated images. I used it to create a dataset with ~17k samples, 0-9 digits. It worked well for my project, where I applied it with a random forest model. I don't plan to write a paper so thought I'd leave the dataset here, to save someone else a few hours if faced with a similar task.

Link to Dataset:
[sevensegdataset.npy](https://s3.us-east-2.amazonaws.com/public.connor.money/sevensegdataset.npy)

Original generation and application, for reference: [datasetgenerator.ipynb](https://gist.github.com/cmastudios/7f29b6714a0936b900a1a7cd37cdf3f9)

Images are 28x28, flattened here.

```python
features = np.load("sevensegdataset.npy")
X = features[:, :-1]
Y = features[:, -1]
```

```python
images = X.reshape((-1, 28, 28))
plt.axis('off')
plt.imshow(images[0], cmap='gray'), plt.imshow(images[1], cmap='gray')
```
![Digit 0](/images/7seg0.png)
![Digit 9](/images/7seg1.png)

Labels are integers 0-9:
```python
Y[1], Y[2]
```
gives us

    (9, 0)
	
Training a random forest classifier based on this dataset then allowed me to accurately classify individual inputs such as

![Inputs](/images/7seginputfirst.png)

that was first preprocessed into 5 separate images

![Inputs](/images/7seginput.png)

More details on the preprocessing I used in this example can be found in [readscale.ipynb](https://gist.github.com/cmastudios/7f29b6714a0936b900a1a7cd37cdf3f9#file-readscale-ipynb).