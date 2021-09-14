#!/usr/bin/env groovy
pipeline {
  agent { label 'slave1' }
//   tools {nodejs "latest"}
  stages {
    
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
            emailext body: "${DEFAULT_SUBJECT}", recipientProviders: "${DEFAULT_RECIPIENTS}", subject: "${DEFAULT_CONTENT}"
        }
    }
}