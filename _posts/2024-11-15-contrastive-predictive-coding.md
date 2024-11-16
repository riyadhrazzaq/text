---  
title: "Paper Notes / Contrastive Predicting Coding"  
comments: true 
tags:
    - paper
    - speech
---  
This is an attempt to write down my understanding of the paper "[Representation Learning with Contrastive Predictive Coding" by Oord et al.](http://arxiv.org/abs/1807.03748)

# Ultimate Goal
The primary goal is to learn speech representation that can be further used on numerous downstream task such as ASR, ST etc. Now, language models typically learns this sort of representation through next token prediction. The model produces a latent representation from which the output distribution for next token is generated. The loss function is usually a cross entropy function. 

This approach is not suitable for speech because the speech signal is high dimensional whether it is raw wave signals or log-melspectrograms. This paper addresses this issue by changing the goal itself.

# The Re-oriented Goal
Assume we have continuous signals \(\vec{X} = \\{\vec{x_1},...,\vec{x_M}\\}\). Each $$x_i$$ is a vector of signal representation. Given $$x_t$$, we will now predict the latent representation for $$x_{t+k}$$, where \(k > t\). This is presented in the paper in the following way: instead of modelling \(p(\mathbf{x_{t+k} | c_t})\), this approach will model \(f_k(\mathbf{x_{t+k}, c_t}) = exp(\mathbf{z_{t+k}^T \cdot W_k \cdot c_t})\) which is a denstiy ratio between the context at \(t^{th}\) step to the latent representation at \(t+k^{th}\) step. Here, \(c_t\) is the context representation and \(z_t\) is the latent representation. In some way, we are looking for the relationship between two and our loss function will reflect that more clearly. 

# Training
## Forward
We have an encoder layer that will generate latent representation \(\mathbf{z_t}\) and another auto-regressive layer which will generate \(\mathbf{c_t}\) from \(\mathbf{z_t}\) and \(\mathbf{c_{p < t}}\).

## backward
Instead of directly predicting the latent representation, the model will learn to contrast between the latent representations. We want the predicted latent representation for current time step to be similar to the \(k^{th}\) tokens after it and different from other representations. We call them positive and negaitve samples respectively.

The model is given \(N\) samples among which \(N-1\) are negative samples. The positive sample is drawn from a regular conditional model \(p(\mathbf{x_{t+k} | c_t})\) (this can be an n-gram model). The negative samples are drawn from \(p(\mathbf{x_{t+k}})\) - which is overall collection of all the possible values (like the vocab in a text LLM).

\[ \begin{alignat}{2}
 L_N = - \Bbb{E} log \frac{f_k(\mathbf{x_{t+k}, c_t})}{\sum_{x_j \in \mathbf{X}} f_k(\mathbf{x_j, c_t}) } \\
    = - \Bbb{E} log \frac{exp(\mathbf{z_{t+k}^T W_k c_t})}{\sum_{x_j \in \mathbf{X}} exp(\mathbf{z_j^T W_k c_t})} \\
    = - \Bbb{E} log \frac{cosine\ similarity\ between\ current\ context\ repr.\ and\ future\ true\ latent\ repr.}{sum\ of\ the\ cosine\ similarities\ between\ all\ the\ pos \& neg\ future\ samples}
\end{alignat}\]

This loss is penalize the model if the cosine similarity between true latent representation is larger compared to all the cosine similarity it calculated The only way for the model to perform well is to learn to contrast between the positive sample and the other \(N-1\) negative samples.

## Some Comments
In the loss function, \(W_k\) is different for each \(k\). So, we can swap the weights afterwards if we want the model to perform the prediction for next step or 3 steps after that. Even though we are sampling \(N\) samples, whether be it positive or negaitve, the loss is calculated from the latent representation of that \(\mathbf{x}\)

# References
Oord, A. van den, Li, Y., & Vinyals, O. (2019). Representation Learning with Contrastive Predictive Coding (arXiv:1807.03748). arXiv. http://arxiv.org/abs/1807.03748 \

E. Hinton, G. (2013). LEARNING DISTRIBUTED REPRESENTATIONS FOR STATISTICAL LANGUAGE MODELLING. Retrieved November 16, 2024, from http://www.cs.utoronto.ca/%7Ehinton/csc2535/notes/hlbl.pdf

