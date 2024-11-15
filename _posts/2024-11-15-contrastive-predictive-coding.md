---  
title: "Contrastive Predicting Coding Paper Notes"  
comments: true  
---  
# Ultimate Goal
This is an attempt to write down my understanding of the paper "Representation Learning with Contrastive Predictive Coding" by Oord et al.

The primary goal is to learn speech representation that can be further used on numerous downstream task such as ASR, ST etc. Now, language models typically learns this sort of representation through next token prediction. The model produces a latent representation from which the output distribution for next token is generated. The loss function is usually a cross entropy function. 

This approach is not suitable for speech because the speech signal is high dimensional whether it is raw wave signals or log-melspectrograms. This paper addresses this issue by changing the goal itself.

## The Re-oriented Goal
Assume we have continuous inputs $$\textbf{X} = \{\textbf{x_1}, ... , \textbf{x_M}\}$$. Each $$x_i$$ is a vector of input representation. Given $$x_t$$, we will now predict the latent representation for $$x_{t+k}$$, where \(k > t\). This is presented in the paper in the following way: instead of modelling \(p(\textbf{x_{t+k} | c_t})\), this approach will model \(exp(\textbf{z_{t+k}^T \cdot W_k \cdot c_t})\) which is a denstiy ratio between the context at \(t^{th}\) step to the latent representation at \(t+k^{th}\) step.
