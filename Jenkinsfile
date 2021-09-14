#!/usr/bin/env groovy
pipeline {
  agent { label 'slave2' }
//   tools {nodejs "latest"}
  stages {
    stage('preflight') {
      steps {
        echo sh(returnStdout: true, script: 'env')
        sh 'node -v'
      }
    }
    stage('build') {
      steps {
        sh 'npm --version'
        // sh 'git log --reverse -1'
        sh 'pwd'
        sh 'ls'
      }
    }
    stage('test') {
      steps {
        sh 'npm test'
      }
    }
  }
}
