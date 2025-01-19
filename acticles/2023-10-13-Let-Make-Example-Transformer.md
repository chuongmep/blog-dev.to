
## Introduction

"Transformers" is a type of deep learning model architecture that has revolutionized the field of natural language processing (NLP) and has since been applied to various other domains. The term "transformer" is often associated with the model architecture introduced in the paper titled "Attention is All You Need" by Vaswani et al., published in 2017. This architecture primarily utilizes self-attention mechanisms, which allow it to effectively model and process sequential data, making it particularly well-suited for NLP tasks.

![Basic Architecture](https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/The-Transformer-model-architecture.png/400px-The-Transformer-model-architecture.png)

Key components of transformer models include:

- Self-Attention Mechanism: This is the core of the transformer architecture. Self-attention enables the model to weigh the importance of different words in a sentence when making predictions, capturing long-range dependencies effectively.

- Multi-Head Attention: Transformers use multiple attention heads to attend to different parts of the input data, providing a richer representation.

- Positional Encoding: Since transformers do not have inherent positional information like recurrent neural networks (RNNs), they incorporate positional encoding to understand the order of words in a sequence.

- Feed-Forward Neural Networks: Transformers include feed-forward neural networks after the attention mechanism to further process the information.

- Stacked Layers: Transformers are typically composed of multiple layers, with each layer refining the representations of the input data.

## Let Do Example

In this example, we will try ask transformer to answer a question. We will use the [Hugging Face Transformers](https://huggingface.co/transformers/) library to build a question answering model. The model will be trained on the [SQuAD](https://rajpurkar.github.io/SQuAD-explorer/) dataset, which consists of questions posed by crowdworkers on a set of Wikipedia articles, where the answer to every question is a segment of text, or span, from the corresponding reading passage.

- Fist, we need to install transformers, tensorflow and pandas
library :

```bash
%pip install git+https://github.com/huggingface/transformers
%pip install --user tensorflow
%pip install pandas
```


::: warning
with tensforflow, some computer need use `--user` to py pass permission error, and if your computer have GPU, you can use `tensorflow-gpu` instead of `tensorflow`.
:::

So now, we can import library transformer for question answering using HuggingFace , warning library allow us to ignore warning when we run code.

```python
import warnings
warnings.filterwarnings('ignore')
from transformers import pipeline
```

Next step, let provider text over which we will generate questions, we will use data.txt file to provider text.

```python
with open('data.txt', 'r') as f:
    text = f.read().replace('\n', '')
```
And this is content basic of data.txt file: [data.txt](https://chuongmep.github.io/jupyter/lab?path=Transformers%2Fdata.txt). Basically, we will use this text to generate question.

Let try setup the pipeline for question answering, we will use pipeline function from transformers library to setup pipeline for question answering.

```python
reader = pipeline(task = "question-answering", 
                  model = "distilbert-base-cased-distilled-squad")
```

All is ready, we can generate question now, we will use reader function to generate question, we will provider context and question to reader function.

```python
reader(question = "What is the library used for question answering?", 
       context = text)
```
And this is result, the score is the probability of the answer, the start is the start position of the answer, the end is the end position of the answer and the answer is the answer.

|  | score   | start | end  | answer     |
|-------|---------|-------|----- |------------|
| 0     | 0.62039 | 1291  | 1300 | Flask API  |

The example can be found at my jupyter: [Transformers.ipynb](https://chuongmep.github.io/jupyter/lab?path=Transformers%2FTransformers.ipynb)

## Conclusion

In this post, we have learned how to make an example transformer. We have seen that transformers are a type of neural network that can be used for many different tasks. They are often used in natural language processing (NLP) and computer vision (CV). Transformers have been shown to outperform other types of neural networks on some tasks, such as machine translation and image classification. I hope you found this post helpful and will continue to explore the world of transformers with us!

I wish I have more time to write longer ...

## References

[Transformers.ipynb](https://chuongmep.github.io/jupyter/lab?path=Transformers%2FTransformers.ipynb)