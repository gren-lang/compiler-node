app: Makefile gren.json node_modules
	gren make src/Main.gren --output=bin/app
	chmod +x bin/app

.PHONY: test
test: app node_modules
	npm test

node_modules: package.json package-lock.json
	npm ci

.PHONY: clean
clean:
	rm -rf .gren
	rm -rf node_modules
	rm bin/app
