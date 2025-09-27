node_modules: package.json package-lock.json
	npm ci

bin/app: Makefile gren.json node_modules
	gren make Main --output=bin/app
	chmod +x bin/app

.PHONY: test
test: bin/app node_modules
	rm -r .lock || true
	npm test

.PHONY: clean
clean:
	rm -rf .gren
	rm -rf node_modules
	rm bin/app
