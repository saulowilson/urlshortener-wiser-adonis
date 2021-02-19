#!/bin/sh
cd /app
node ace migration:run --force
node ace serve