install:	
	npm install

publish:
	npm publish --dry-run

lint:
	npx eslint .

test-coverage:
	jest --coverage --coverageProvider=v8

make test:
	node --experimental-vm-modules node_modules/jest/bin/jest.js