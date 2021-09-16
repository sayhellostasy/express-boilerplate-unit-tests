#!/usr/bin/env groovy
pipeline {
  agent { label 'slave2' }
//   tools {nodejs "latest"}
  stages {
    stage('Preflight') {
      steps {
        // emailext body: "${currentBuild.currentResult}: Job ${env.JOB_NAME}, build ${env.BUILD_NUMBER}\n More info at: ${env.BUILD_URL}", recipientProviders: [[$class: 'CulpritsRecipientProvider']], subject: "Jenkins Build - ${currentBuild.currentResult}: Job ${env.JOB_NAME}"
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
        // emailext attachLog: true, body: "${currentBuild.currentResult}: Job ${env.JOB_NAME}, build ${env.BUILD_NUMBER}\n More info at: ${env.BUILD_URL}", recipientProviders: [[$class: 'CulpritsRecipientProvider']], subject: "Jenkins Build - ${currentBuild.currentResult}: Job ${env.JOB_NAME}"
      }
    }
    stage('Deploy Staging') {
      steps {
            azureWebAppPublish appName: "middleware-staging",
            azureCredentialsId: "azure-staging-deploy",
            publishType: "file",
            filePath: "**/*.*",
            resourceGroup: "bits-assignment"
      }
    }
    stage("Approval") {
        steps {
            emailext (
                    attachLog: true,
                    subject: "Waiting for your Approval! Job: '${env.JOB_NAME} [${env.BUILD_NUMBER}]'",
                    mimeType: 'text/html',
                    body: """<p>STARTED: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]':</p>
                                <p>Job has completed dev/test successfully and deployed to Staging! Please go to this link and Approve the build to promote to production. </br><a href='${env.BUILD_URL}/input'>${env.JOB_NAME} [${env.BUILD_NUMBER}]</a></p>""",
                    recipientProviders: [[$class: 'DevelopersRecipientProvider']]
            )
            script {
                def userInput = false
                userInput = input(id: 'Proceed1', message: 'Promote to Production?', parameters: [[$class: 'BooleanParameterDefinition', defaultValue: true, description: '', name: 'Please confirm you agree with this!']])
                echo 'userInput: ' + userInput

                if(userInput == true) {
                    // do action
                } else {
                    // not do action
                    echo "Action was aborted."
                }
            }    
        }  
    }

    stage('Deploy Prod') {
      steps {
          sh 'echo "Deploying to Production"'
          //emailext attachLog: true, body: "${currentBuild.currentResult}: Job ${env.JOB_NAME}, build ${env.BUILD_NUMBER}\n More info at: ${env.BUILD_URL}", recipientProviders: [[$class: 'CulpritsRecipientProvider']], subject: "Jenkins Build - ${currentBuild.currentResult}: Job ${env.JOB_NAME}"
            azureWebAppPublish appName: "middleware-production",
            azureCredentialsId: "production-deploy",
            publishType: "file",
            filePath: "**/*.*",
            resourceGroup: "bits-assignment"
      }
    }
  }
post {
        always {
            echo 'Deployed to Production'
            emailext attachLog: true, body: "${currentBuild.currentResult}: Job ${env.JOB_NAME}, build ${env.BUILD_NUMBER}\n More info at: ${env.BUILD_URL}", recipientProviders: [[$class: 'CulpritsRecipientProvider']], subject: "Jenkins Build - ${currentBuild.currentResult}: Job ${env.JOB_NAME}"
    }
}