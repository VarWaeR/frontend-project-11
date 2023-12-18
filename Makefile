install:
	npm install

install-deps:
	npm ci

lint:
	npx eslint .

build:
	NODE_ENV=production npx webpack

start:
	npx webpack serve