# jupyterlab-theme

A theme extension for JupyterLab with the g2nb logo and colors

## Prerequisites

* JupyterLab >= 4.0.0

## Installation

```bash
jupyter labextension install @g2nb/jupyterlab-theme
```

## Development

For a development install (requires npm version 4 or later), do the following in the repository directory:

```bash
npm install
jupyter labextension link .
jupyter labextension install .
```

To rebuild the package and the JupyterLab app:

```bash
npm run build
jupyter lab build
```
