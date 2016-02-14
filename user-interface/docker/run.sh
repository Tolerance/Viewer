#!/bin/bash

set -xe

# Updates the configuration
gulp config

# Start the gulp server
gulp serve
