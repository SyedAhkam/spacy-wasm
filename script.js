async function loadPackages(pyodide) {
  await pyodide.loadPackage(["micropip", "numpy", "pydantic"]);
}

async function load_visualize(pyodide) {
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
  let pyodide = await loadPyodide();

  await loadPackages(pyodide);

  document.vis_fn = await load_visualize(pyodide);

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
