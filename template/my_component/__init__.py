import streamlit as st
import streamlit.components.v1 as components

_component_func = components.declare_component(
    "sign_up",
    url="http://localhost:3001",
)

_component_func()

page_style = """
<style>
    [data-testid="stAppViewContainer"] {
        background-color: #F9FBFA;
    }

    .block-container {
        padding-top: 10rem;
    }
</style>
"""

st.markdown(page_style, unsafe_allow_html=True)