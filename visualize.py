import micropip
from pyodide import to_js

PACKAGES_PATH = "/packages"
CUSTOM_BUILT_PKG_NAMES = list(map(lambda name: f"{PACKAGES_PATH}/{name}-cp310-cp310-emscripten_3_1_14_wasm32.whl", [
    "blis-0.7.8",
    "cymem-2.0.6",
    "murmurhash-1.0.7",
    "preshed-3.0.6",
    "srsly-2.4.3",
    "thinc-8.1.0",
    "spacy-3.4.0",
]))
SPACY_MODEL_NAME = "en_core_web_sm"
SPACY_MODEL_VERSION = "3.4.0"


def visualize(text):
    print("Loading spacy model...")
    import spacy
    from spacy import displacy

    nlp = spacy.load(SPACY_MODEL_NAME)

    doc = nlp(text)

    print("Visualizing...")
    render = displacy.render(doc, style="ent")

    return to_js(render)

# flake8: noqa
await micropip.install([
        f"{PACKAGES_PATH}/{SPACY_MODEL_NAME}-{SPACY_MODEL_VERSION}-py3-none-any.whl"
    ] + CUSTOM_BUILT_PKG_NAMES)  # type: ignore

# Return the visualize function to JS
visualize # type: ignore
