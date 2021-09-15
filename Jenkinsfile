#!/usr/bin/env groovy

def user
node {
  wrap([$class: 'BuildUser']) {
    user = env.BUILD_USER_ID
  }
  
  emailext mimeType: 'text/html',
                 subject: "[Jenkins]${currentBuild.fullDisplayName}",
                 to: "user@xxx.com",
                 body: '''<a href="${BUILD_URL}input">click to approve</a>'''
}


pipeline {
  agent { label 'slave1' }
//   tools {nodejs "latest"}
  stages {
    stage('Preflight') {
      steps {
        // emailext body: "${currentBuild.currentResult}: Job ${env.JOB_NAME}, build ${env.BUILD_NUMBER}\n More info at: ${env.BUILD_URL}", recipientProviders: [[$class: 'CulpritsRecipientProvider']], subject: "Jenkins Build - ${currentBuild.currentResult}: Job ${env.JOB_NAME}"
        echo sh(returnStdout: true, script: 'env')
        sh 'node -v'
      }
    }
    // stage('Build') {
    //   steps {
    //     sh 'npm --version'
    //     // sh 'git log --reverse -1'
    //     sh 'pwd'
    //     sh 'ls'
    //     sh 'npm install'
    //   }
    // }
    // stage('Test') {
    //   steps {
    //     sh 'npm test'
    //     // emailext attachLog: true, body: "${currentBuild.currentResult}: Job ${env.JOB_NAME}, build ${env.BUILD_NUMBER}\n More info at: ${env.BUILD_URL}", recipientProviders: [[$class: 'CulpritsRecipientProvider']], subject: "Jenkins Build - ${currentBuild.currentResult}: Job ${env.JOB_NAME}"
    //   }
    // }
    // stage('Deploy Staging') {
    //   steps {
    //         azureWebAppPublish appName: "middleware-staging",
    //         azureCredentialsId: "azure-staging-deploy",
    //         publishType: "file",
    //         filePath: "**/*.*",
    //         resourceGroup: "bits-assignment"
    //   }
    // }
    stage('Preprod'){
        input{
            message "Should we continue?"
            ok "Yes"
        }
        when{
            expression { user == 'hardCodeApproverJenkinsId'}
        }
        steps{
            sh "echo 'describe your deployment'"
        }
    }
    stage('Prod Deploy') {
      steps {
        sh 'echo "Deploying to Production"'
        // emailext body: "${currentBuild.currentResult}: Job ${env.JOB_NAME}, build ${env.BUILD_NUMBER}\n More info at: ${env.BUILD_URL}", recipientProviders: [[$class: 'CulpritsRecipientProvider']], subject: "Jenkins Build - ${currentBuild.currentResult}: Job ${env.JOB_NAME}"
        // echo sh(returnStdout: true, script: 'env')
        // sh 'node -v'
      }
    }
  }
}