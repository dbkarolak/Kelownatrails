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
                sh 'npm install chai@4.2.0'
                sh 'npm install selenium-webdriver'
            }
        } 
        stage('Testing Environment'){
            steps{
            sh 'firebase deploy -P testing-replica-b9141 --token "$FIREBASE_DEPLOY_TOKEN"'
	     //input message: 'After testing. Do you want to continue with Staging Environment? (Click "Proceed" to continue)'
            sh 'node tests/MemberManagementTests.js'
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
