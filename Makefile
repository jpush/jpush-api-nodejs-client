TESTS = test/*.js
REPORTER = spec
TIMEOUT = 60000
MOCHA = ./node_modules/mocha/bin/mocha

test:
	@npm install
	@$(MOCHA) --reporter $(REPORTER) --timeout $(TIMEOUT) $(MOCHA_OPTS) $(TESTS)

.PHONY: test
