#!/usr/bin/env groovy
pipeline {
  agent { label 'slave1' }
//   tools {nodejs "latest"}
  stages {
    stage('Start') {
      steps {
        emailext attachLog: true, body: "${currentBuild.currentResult}: Job ${env.JOB_NAME}, build ${env.BUILD_NUMBER}\n More info at: ${env.BUILD_URL}", recipientProviders: "${env.DEFAULT_RECIPIENTS}", subject: "Jenkins Build ${currentBuild.currentResult}: Job ${env.JOB_NAME}"
      }
    }
    stage('Preflight') {
      steps {
        echo sh(returnStdout: true, script: 'env')
        sh 'node -v'
      }
    }
    stage('Build') {
      steps {
        sh 'npm --version'
        // sh 'git log --reverse -1'
        sh 'pwd'
        sh 'ls'
        sh 'npm install'
      }
    }
    stage('Test') {
      steps {
        sh 'npm test'
      }
    }
  }
  post {
        always {
            echo 'Sending Notification!'
            emailext attachLog: true, body: "${currentBuild.currentResult}: Job ${env.JOB_NAME}, build ${env.BUILD_NUMBER}\n More info at: ${env.BUILD_URL}", recipientProviders: "${env.DEFAULT_RECIPIENTS}", subject: "Jenkins Build ${currentBuild.currentResult}: Job ${env.JOB_NAME}"
        }
    }
}