
## Introduction

This week, I had the opportunity to explore Google **Vertex AI - PaLM 2**, and I must say, it was an incredibly enjoyable experience. I visited the **Google** office to take on some exciting challenges, and I'm thrilled to share my adventure with you.

![](pic/iShot_2023-10-08_23.20.12.png)

## What is Google Vertex AI - Palm 2?

[Vertex AI](https://cloud.google.com/vertex-ai/) is a machine learning (ML) platform that lets you train and deploy ML models and AI applications. Vertex AI combines data engineering, data science, and ML engineering workflows, enabling your teams to collaborate using a common toolset.

Okay, how you can ask a question and get an answer? You can use [Google Cloud SDK](https://cloud.google.com/sdk?hl=en), let's see my example. Fist at all, you need install [google-generativeai](https://github.com/google/generative-ai-python) package.

```bash
%pip install -q google-generativeai
%pip install grpcio
```

And then, you can use your PaLM api key to generate text.

```python
import google.generativeai as palm
# add your token here
palm.configure(api_key="<Put your key>")
# see the list of models
models = [
    m for m in palm.list_models() if "generateText" in m.supported_generation_methods
]

for m in models:
    print(f"Model Name: {m.name}")
model = models[0].name
print("Model Name: ", model)

# Generate text
prompt = "What is BIM ?"
completion = palm.generate_text(
    model=model,
    prompt=prompt,
    temperature=0.3,
    # The maximum length of the response
    max_output_tokens=800,
)

print(completion.result)
```
For another example, demo a chatbot built using Vertex AI Generative AI Studio and surfaced using Gradio.  You have full flexibility into the prompt, parameter fine tuning, etc that Gen AI offers and a simple chat interface.  You have just developed an AI app.

```py
# Install Vertex AI LLM SDK
!pip install google-cloud-aiplatform --upgrade --user

# Install Gradio
!pip install -q gradio
# Authenticate User
Project_ID="test-genai"

# INSERT CODE FROM GEN AI STUDIO HERE
import vertexai
from vertexai.language_models import ChatModel, InputOutputTextPair

vertexai.init(project=Project_ID, location="us-central1")
chat_model = ChatModel.from_pretrained("chat-bison@001")
parameters = {
    "max_output_tokens": 256,
    "temperature": 0.2,
    "top_p": 0.8,
    "top_k": 40
}
chat = chat_model.start_chat(
    context="""You are an expert in Medicaid regulations for the State of New York.  You will base all of your information on the website https://www.health.ny.gov/health_care/medicaid/.  Ask the user all the questions you need to determine if they are eligible for Medicaid or not.  Please cite where you got your answer.""",
)

# Test to see Responses
response = chat.send_message("""am I eligible for medicaid""", **parameters)
print(f"Response from Model: {response.text}")

```
Run a chat bot with Gradio

```py
import gradio as gr

# Define the chat interface
def response(input_text, history):
  response = chat.send_message(input_text, **parameters)
  return response.text

demo = gr.ChatInterface(response).launch(share=True)
```

You can check the result and code at my jupyter: [PaLM_Complete.ipynb](https://chuongmep.github.io/jupyter/lab?path=PaLM-PDFChat%2FPaLM_Complete.ipynb)

[PaLM 2](https://ai.google/discover/palm2/) is next generation large language model that builds on Google’s legacy of breakthrough research in machine learning and responsible AI.

![](pic/iShot_2023-10-09_21.33.29.png)

Now, you have an document need to summarize, you can use [Google Cloud SDK](https://cloud.google.com/sdk?hl=en) to summarize it, you can easy use langchain library google sdk to summarize it. This one is so basic example I'm tried ask question `What is BIM ?` and get answer from document `Singapore-BIM-Guide_V2.pdf`

Please use this command to install all library need to run this example. File [requirements.txt](https://chuongmep.github.io/jupyter/lab?path=PaLM-PDFChat%2Frequirements.txt)

```bash
pip install -r requirements.txt
```

Streamlit library is a great tool for building interactive web apps. It's easy to use and has a lot of features that make it easy to build a web app. I'm using it to build a simple chatbot that can answer questions about a PDF file.

```python
import streamlit as st
from dotenv import load_dotenv
from streamlit_extras.add_vertical_space import add_vertical_space
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.indexes import VectorstoreIndexCreator
from langchain.document_loaders import UnstructuredPDFLoader
from langchain.chains import RetrievalQA
from pdfminer.pdfparser import PDFParser
from pdfminer.pdfdocument import PDFDocument
from pdfminer.pdfpage import PDFPage
from langchain.embeddings import GooglePalmEmbeddings
from langchain.llms import GooglePalm
import os, glob


# Sidebar contents
with st.sidebar:
    st.title("🤗💬 LLM Chat App")
    st.markdown(
        """
    ## About
    This app is an LLM-powered chatbot built using:
    - [Streamlit](https://streamlit.io/)
    - [LangChain](https://python.langchain.com/)
    - [PaLM](https://makersuite.google.com/app/home) Embeddings & LLM model
 
    """
    )
    add_vertical_space(5)

load_dotenv()


def main():
    st.header("Chat with PDF 💬")
    # Accept user questions/query
    query = st.text_input("Ask questions about your PDF file:")
    st.write(query)
    if query:
        files_path = r"./SOURCE_DOCUMENTS/Singapore-BIM-Guide_V2.pdf"
        loaders = [UnstructuredPDFLoader(files_path)]

        # if "index" not in st.session:
        index = VectorstoreIndexCreator(
            embedding=GooglePalmEmbeddings(),
            text_splitter=RecursiveCharacterTextSplitter(chunk_size=800, chunk_overlap=0),
        ).from_loaders(loaders)

        llm = GooglePalm(temperature=0.1)  # OpenAI()
        chain = RetrievalQA.from_chain_type(
            llm=llm,
            chain_type="stuff",
            retriever=index.vectorstore.as_retriever(),
            # input_key="question",
            return_source_documents=True,
        )
        # st.session.index = index
        print(index)
        response = chain(query)
        print(response)
        st.write(response["result"])
        with st.expander("Returned Chunks"):
            for doc in response["source_documents"]:
                st.write(f"{doc.metadata['source']} \n {doc.page_content}")
if __name__ == "__main__":
    main()

```

You can download and try it at my jupyter: [ChatPDF_PaLM.py](https://chuongmep.github.io/jupyter/lab?path=PaLM-PDFChat%2FChatPDF_PaLM.py)

## Review

- It was a great experience to work with Google engineers and learn about their work.
- I was able to learn about the latest research in machine learning and AI.
- I saw PaLM 2 in action and was impressed by its capabilities amd performance response from LLM model.
- I met alot of expert in AI, that really open my mind.
- I liked the challenges and the way they were presented.
- I like way google team arrage all team member to work together to solve the challenges.

![](pic/iShot_2023-10-08_23.25.56.png)

My team is people with role : 

- AI Engineer
- Data Engineer
- Data Scientist
- Software Engineer
- Application Engineer
- Guru

## Conclusion

I'm still working on the challenges, but I'm excited to see what I can do with Google `Vertex AI` - `PaLM 2`. I'm looking forward to sharing my progress with you in the coming weeks.

## References

- [Google Vertex AI](https://cloud.google.com/vertex-ai)
- [Google PaLM 2](https://ai.google/discover/palm2/)
- [Google Cloud SDK](https://cloud.google.com/sdk?hl=en)
- [Vertex AI Sample](https://github.com/GoogleCloudPlatform/vertex-ai-samples/tree/main)
- [Prompt Engineering](https://www.youtube.com/watch?v=LBkb3NbpPI4)