pipeline {
    agent any
    stages {
        stage('Checkout') {
            steps {
                git 'https://github.com/Poojaamangal/Github_Finder.git'
            }
        }
        stage('Build Docker Image') {
            steps {
                script {
                    docker.build("mangal23/github_finder:latest")
                }
            }
        }
        stage('Push Docker Image') {
            steps {
                script {
                    docker.withRegistry('https://index.docker.io/v1/', 'dockerhub-credentials-id') {
                        docker.image("mangal23/github_finder:latest").push()
                    }
                }
            }
        }
    }
}
