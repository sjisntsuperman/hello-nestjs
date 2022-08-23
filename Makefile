SHELL := /bin/bash
BASEDIR = $(shell pwd)

# make   make all
.PHONY: all
all: lint test build

.PHONY: build
# make build, Build the binary file
build: dep
        @go build -v -ldflags ${ldflags} .

.PHONY: dep
# make dep Get the dependencies
dep:
        @go mod download

.DEFAULT_GOAL := all