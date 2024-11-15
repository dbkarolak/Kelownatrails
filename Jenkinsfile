pipeline{
    agent any
    environment {
    FIREBASE_DEPLOY_TOKEN = credentials('firebase-token')
    }

 stages{
        stage('Building'){
            steps{
           // sh 'npm install -g firebase-tools'
                echo 'Biulding...'
            }
        } 
        stage('Testing Environment'){
            steps{
            sh 'firebase deploy -P testing-replica-b9141 --token "$FIREBASE_DEPLOY_TOKEN"'
	     //input message: 'After testing. Do you want to continue with Staging Environment? (Click "Proceed" to continue)'
            }
        } 
        stage('Staging Environment'){
            steps{
             sh 'firebase deploy -P staging-replica-c4415 --token "$FIREBASE_DEPLOY_TOKEN"'
            }
        } 
        stage('Production Environment'){
            steps{
            sh 'firebase deploy -P production-replica-bc191 --token "$FIREBASE_DEPLOY_TOKEN"'
            }
        } 
    }

}
