async function loadPackages(pyodide) {
  await pyodide.loadPackage(["micropip", "numpy", "pydantic"]);
}

async function loadVisualize(pyodide) {
  let python_script = await fetch("/visualize.py").then((r) => r.text());

  return await pyodide.runPythonAsync(python_script);
}

function onSubmitForm(e) {
  console.log("submitting form");
  e.preventDefault();

  let input = document.getElementById("input").value;

  let html = document.vis_fn(input);

  document.getElementById("output").innerHTML = html;
}

async function main() {
  // Set default value for input
  document.getElementById("input").value =
    "Hello! Guess what? I'm running Python in your browser!\n\nMy name is Clara and I live in Berkeley, California.";

  // Load Pyodide and packages
  let pyodide = await loadPyodide();

  await loadPackages(pyodide);

  // Load visualize function
  document.vis_fn = await loadVisualize(pyodide);

  // Enable the form button and change label
  document.getElementById("submit").disabled = false;
  document.getElementById("submit").innerHTML = "Visualize";

  // Add event listener to form
  document.getElementById("form").addEventListener("submit", (e) => {
    e.preventDefault();

    let input = document.getElementById("input").value;

    let html = document.vis_fn(input);

    document.getElementById("output").innerHTML = html;
  });
}

main();
