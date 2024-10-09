pipeline {
    agent any
    
    environment {
        DOCKER_IMAGE = 'mangal23/github_finder'
        IMAGE_TAG = 'latest'
        REGISTRY_CREDENTIALS = 'dockerhub-credentials-id'
    }

    stages {
        stage('Checkout') {
            steps {
                // Checkout the repository
                git 'https://github.com/Poojaamangal/Github_Finder.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    // Build the Docker image
                    docker.build("${DOCKER_IMAGE}:${IMAGE_TAG}")
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                script {
                    // Login to Docker Hub and push the image
                    docker.withRegistry('https://index.docker.io/v1/', "${REGISTRY_CREDENTIALS}") {
                        docker.image("${DOCKER_IMAGE}:${IMAGE_TAG}").push()
                    }
                }
            }
        }
    }

    post {
        always {
            // Cleanup Docker resources to free up space
            script {
                sh 'docker system prune -f'
            }
        }
    }
}
