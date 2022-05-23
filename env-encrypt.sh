#!/bin/bash

set -e

npx senv encrypt .env.development > .env.development.encrypted
