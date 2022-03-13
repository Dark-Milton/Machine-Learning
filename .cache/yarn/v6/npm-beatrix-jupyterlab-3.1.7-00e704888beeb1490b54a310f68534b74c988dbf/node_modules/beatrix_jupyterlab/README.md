# Beatrix JupyterLab

This directory contains the package for the customized build of JupyterLab
suitable for the Beatrix environment that it will run in. It is a self-contained
package independent of the package defined in the parent directory.

## Development instructions

### One-time setup

This only needs to be done once after cloning the repository.

1. Ensure that [pipenv](https://pypi.org/project/pipenv/) is installed.

1. Run the [initialize.sh](./initialize.sh) script which will install JupyterLab
   in a local pipenv Python environment, install all NPM dependencies, compile
   the extension, and install the `beatrix_jupyterlab` package, which provides
   the necessary server routes used by the extension under the `/aipn/v2` path.

You are now ready to develop. Any changes you make to the frontend code should
be picked up by the steps indicated below in the development workflow section.

### Normal development Workflow

The `BeatrixNotebookProviderPlugin` expects to be able to obtain VM metdata
from the `/aipn/v2/metadata` route. If you're running on a Cloudtop, the
information returned will not be consistent with what is expected to be
present on a Notebook Instance or Runtime. To avoid this, you can download
a valid metadata JSON file and serve it locally using the following steps.

1. Use cURL to retrieve the metadata from an existing Notebook Instance or
   Runtime that you have access to.

   ```
   curl -s https://<proxy host>/aipn/v2/metadata \
     -H "Content-Type: application/json" \
     -H "Authorization: Bearer $(gcloud auth print-access-token)" \
     | jq > vm_metadata.json
   ```

   - This will download the metadata from the Notebook to the `vm_metadata.json`
     file needed in the next step.

1. Run `npm run develop`. This will start three (3) concurrent processes.

   - The TypeScript compiler to watch and recompile your sources
   - A local Python server to serve the metadata JSON file
     at http://localhost:8889. All requests to fetch VM metadata will be routed
     here.
   - The JupyterLab server at http://localhost:8888.

## Generating a Python tarball

Run the [build.sh](./build.sh) to generate a clean production build. This
command will re-create the existing Pip environment and validate that the
extension builds into JupyterLab. The end result will be a gzipped tarball
of the Pip installable extension in the `dist/` folder.

## Testing with Docker

Building a Docker image is a good way to test behavior in a production-like
environment. To do so, execute the following steps:

1. Follow the instructions above in the Generating a Python tarball section.
   Copy the tarball into the `docker` subdirectory and `cd` into it.
   - `cp dist/beatrix_jupyterlab*.tar.gz docker/beatrix_jupyterlab.tar.gz && cd docker`
1. Run `docker build . -t "gcr.io/notebooks-frontend-playground/beatrix:latest"`
   - This will build a Docker image that installs the Beatrix extension into
     the base DL container image.
1. To test the image locally, do the following.

   - Run `npm run metadata` to start a local metadata server.
   - In another terminal, run the following:

   ```
   docker run --network host \
     -e 'METADATA_SERVER=http://localhost:8889' \
     gcr.io/notebooks-frontend-playground/beatrix:latest
   ```

1. You should now have the local metadata server running on port 8889 and the
   Docker container running on port 8080. You should be able to access it
   from your browser at http://localhost:8080 and proceed through the auth flow.
1. If successful, you can push your image to [GCR](http://go/ccp-gcr/notebooks-frontend-playground/global/beatrix?project=notebooks-frontend-playground) using the following command:
   - `docker push gcr.io/notebooks-frontend-playground/beatrix`
   - This will make it available for use in semi-managed Notebooks as a Custom
     Container.

## Releasing

1. Run the [prepare_release.py](./prepare_release.py) script and provide the
   new version number.
   - This will update the NPM package files, the Pip setup file, and the
     release information TS file.
1. Submit this change for review and ensure that it builds successfully on
   Kokoro.
1. Confirm that the build succeeds and verify that the `tar.gz` file copied to
   Placer is valid and can be installed on a Notebook Instance or Runtime.
   - Sample log:
   ```
   [15:21:22] Storing artifacts in placer
   [15:21:23] Storing build artifacts to Placer
   [15:21:28] Copied /tmp/workspace/workspace/caip_notebooks/gcp_ubuntu/presubmit/artifacts/git/beatrix/dist/beatrix_jupyterlab-0.0.4.tar.gz to /placer/prod/scratch/home/kokoro-dedicated/build_artifacts/prod/caip_notebooks/gcp_ubuntu/presubmit/522/20210722-151302/git/beatrix/dist/beatrix_jupyterlab-0.0.4.tar.gz
   [15:21:28] Copied /tmp/workspace/workspace/caip_notebooks/gcp_ubuntu/presubmit/artifacts/git/beatrix/beatrix_jupyterlab-0.0.4.tgz to /placer/prod/scratch/home/kokoro-dedicated/build_artifacts/prod/caip_notebooks/gcp_ubuntu/presubmit/522/20210722-151302/git/beatrix/beatrix_jupyterlab-0.0.4.tgz
   [15:21:28] Publishing scratchpad /placer/prod/scratch/home/kokoro-dedicated/build_artifacts/prod/caip_notebooks/gcp_ubuntu/presubmit/522/20210722-151302
   [15:21:30] Result at placer: http://cnsviewer2/placer/prod/home/kokoro-dedicated/build_artifacts/prod/caip_notebooks/gcp_ubuntu/presubmit/522/20210722-151302
   ```
1. Merge the change into the `master` branch on http://go/beatrix-gob.
1. Locally, do a `git pull` to ensure you've pulled down all changes from remote.
1. Create a new tag for the version and push it to remote:
   - ex.
   ```
   git tag v0.9.0 -m "v0.9.0 public preview RC0"
   git push origin v0.0.4-rc0
   ```
1. Run a "nightly" Kokoro build from http://go/kkro/KOKORO/prod:caip_notebooks%2Fgcp_ubuntu%2Fnightly
   specifying the tag you just pushed.
   - [Screenshot](http://screen/3FPr3KPNqRE96Kn.png)
1. Navigate to the Placer directory containing the built extension tarball.
   - Click the Copy path action next to the `tar.gz` file in the `beatrix/dist`
     folder ([Screenshot](http://screen/9dPMTCcLq8feWXg.png)).
1. Back in your terminal, run the [./release.sh](./release.sh) script passing the Placer
   path you copied in the previous step in as an argument.
   - This will copy the tarball to [the location](http://screen/6XyQPpLVN6Ftuqk.png)
     where the DLVM image build process will copy it.
1. Get a reviewer from the DL Eng team and submit your change.
1. Validate the correct behavior in the next morning's nightly Beatrix image.
   - [deeplearning-platform Images page](<http://go/ccp-img?project=deeplearning-platform&pageState=(%22images%22:(%22s%22:%5B(%22i%22:%22creationTimestamp%22,%22s%22:%221%22),(%22i%22:%22type%22,%22s%22:%220%22),(%22i%22:%22name%22,%22s%22:%220%22)%5D,%22f%22:%22%255B%257B_22k_22_3A_22_22_2C_22t_22_3A10_2C_22v_22_3A_22_5C_22beatrix_5C_22_22%257D%255D%22))>)

## Server Extension

`beatrix_jupyterlab` extends the Jupyter server with custom routes used by
JupyterLab frontend extensions.

### Normal development Workflow

1. In order to access the metadata server running on GCE VM, you will need to
   issue the following command to set up port forwarding. This will allow
   requests made locally to port 8889 to be forwarded to a real GCE metadata
   server. Do this in another terminal window since it will create a process
   that needs to stay running.

```
gcloud compute ssh <instance> --zone <zone> \
  --ssh-flag "-N -L 8889:metadata.google.internal:80"
```

1. Then set the `METADATA_SERVER` environment variable to tell the server to use
   the forwarded address.

   `export METADATA_SERVER="http://localhost:8889"`

1. Run the [run.sh](./run.sh) to start the Jupyter server using `nodemon`.
   This process will watch for changes in Python files and restart the server
   afterwards.

### Unit tests

To format, lint, and run Python unit tests, run `npm run pytest`.
