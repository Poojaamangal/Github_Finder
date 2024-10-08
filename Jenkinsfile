pipeline {
    agent any

    environment {
        // Change this to your Docker Hub repository name
        DOCKER_IMAGE = 'mangal23/github_finder:latest'
        // Replace this with your actual Docker Hub credentials ID in Jenkins
        DOCKER_CREDENTIALS_ID = 'fe164ee4-2f9c-48d4-a54c-2371fc792176' 
    }

    stages {
        stage('Checkout') {
            steps {
                // Checkout the code from the repository
                checkout scm
            }
        }
        
        stage('Build Docker Image') {
            steps {
                script {
                    // Build the Docker image
                    sh 'docker build -t $DOCKER_IMAGE .'
                }
            }
        }
        
        stage('Push Docker Image') {
            steps {
                script {
                    // Log in to Docker Hub
                    docker.withRegistry('https://index.docker.io/v1/', "$DOCKER_CREDENTIALS_ID") {
                        // Push the Docker image
                        sh 'docker push $DOCKER_IMAGE'
                    }
                }
            }
        }
    }

    post {
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed!'
        }
    }
}
