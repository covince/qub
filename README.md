# COVID–19 Genomic Surveillance in Northern Ireland

## Prerequisites

* An `input.tsv` file should be copied into the `database` folder. This file should have headings in this order:
```
date  ltla  lineage count
```
* a `fonts` folder should be created in the root of the project, and the file `HVDFonts-BrandonText-Bold.otf` should be copied in.
* a `POSTGRES_PASSWORD` environment variable should be created.

## Running the system

```
docker-compose up
```
This should build the database and download images for the API and UI. The UI should be available on port 8080.
