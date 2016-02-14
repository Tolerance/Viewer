#!/bin/bash

set -xe

# Update composer parameters
composer run-script update-parameters

# Run Apache
/run.sh
