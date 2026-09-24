pipeline {
    agent any

    environment {
        IMAGE     = 'fiandra12/devops-cicd-lab'
        CONTAINER = 'devops-cicd-lab'
        TAG       = "${env.BUILD_NUMBER}"
    }

    options {
        timestamps()
        timeout(time: 15, unit: 'MINUTES')
    }

    stages {
        stage('Lint & Test') {
            agent {
                docker {
                    image 'node:20-alpine'
                    args '-e npm_config_cache=/tmp/.npm'
                    reuseNode true
                }
            }
            steps {
                sh 'npm install'
                sh 'npm run lint'
                sh 'npm test'
            }
        }

        stage('Build Image') {
            steps {
                sh 'docker build -t $IMAGE:$TAG -t $IMAGE:latest .'
            }
        }

        stage('Push ke Docker Hub') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'p1',
                        usernameVariable: 'DH_USER', passwordVariable: 'DH_PASS')]) {
                    sh 'echo "$DH_PASS" | docker login -u "$DH_USER" --password-stdin'
                    sh 'docker push $IMAGE:$TAG'
                    sh 'docker push $IMAGE:latest'
                }
            }
        }

        stage('Deploy') {
            steps {
                sh '''
                    docker rm -f $CONTAINER || true
                    docker run -d --name $CONTAINER -p 3000:3000 \
                        -e BUILD_NUMBER=$TAG $IMAGE:$TAG
                '''
            }
        }

        stage('Smoke Test') {
            steps {
                sh 'sleep 5 && curl -f http://localhost:3000/health'
            }
        }
    }

    post {
        success { echo "Deploy build #${env.BUILD_NUMBER} berhasil" }
        failure { echo "Pipeline gagal, cek Console Output" }
        always  { sh 'docker logout || true' }
    }
}
