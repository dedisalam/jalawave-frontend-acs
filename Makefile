all:
	rm -rf node_modules
	rm -rf .next
	npm install
	npm run build
	docker build --no-cache -t dedisalam/jalawave-frontend-acs .
	docker push dedisalam/jalawave-frontend-acs
	docker image rm dedisalam/jalawave-frontend-acs