pipeline {
    agent any 

    stages {
        stage('Clone Repository') {
            steps {
                git branch: 'main', url: 'https://github.com/Poojaamangal/Github_Finder.git'
            }
        }
        stage('Build') {
            steps {
                echo 'Building the project...'
                // Add build commands here if needed
            }
        }
        stage('Deploy') {
            steps {
                sshPublisher(publishers: [sshPublisherDesc(
                    configName: 'server', // Name of your SSH config
                    transfers: [sshTransfer(
                        sourceFiles: '**/*', // Files to transfer
                        remoteDirectory: '/var/www/html/', // Destination on EC2
                        removePrefix: '', // Optional: Remove prefix from files
                        execCommand: 'sudo systemctl restart httpd' // Command to restart the server
                    )],
                    usePromotionTimestamp: false,
                    verbose: true
                )])
            }
        }
    }
}
