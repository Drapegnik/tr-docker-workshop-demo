IMAGE_NAME=backend-demo

build:
	docker build -t ${IMAGE_NAME}:latest .

run:
	docker run --init --network host ${IMAGE_NAME}:latest
