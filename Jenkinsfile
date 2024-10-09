pipeline {
    agent any

    environment {
        // Define the Docker image name
        IMAGE_NAME = 'github-finder'
    }

    stages {
        stage('Clone Repository') {
            steps {
                // Clone the GitHub repository
                git 'https://github.com/Poojaamangal/Github_Finder.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                // Build the Docker image using the Dockerfile in the repo
                script {
                    // Check if Docker is installed
                    if (!fileExists('/usr/bin/docker')) {
                        error 'Docker is not installed on this agent.'
                    }
                }
                sh "docker build -t ${IMAGE_NAME} ."
            }
        }
    }

    post {
        success {
            echo "Docker image '${IMAGE_NAME}' built successfully."
        }
        failure {
            echo "Docker image build failed."
        }
    }
}

