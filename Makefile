fmt:
	yarn run standard --fix ./src || true

lint: fmt
	yarn check --integrity
	yarn outdated || true
	yarn audit || true
	yarn run eslint --ext .js,.jsx,.ts,.tsx ./src

test:
	yarn run cypress run
