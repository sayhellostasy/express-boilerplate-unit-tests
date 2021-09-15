#!/usr/bin/env groovy
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
    stage("Stage with input") {
    steps {
      
        script {
            def userInput = false
            userInput = input(id: 'Proceed1', message: 'Promote build?', parameters: [[$class: 'BooleanParameterDefinition', defaultValue: true, description: '', name: 'Please confirm you agree with this']])
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
    stage('prod') {
      steps {
        sh 'echo "Deploying to Production"'
        emailext body: "${currentBuild.currentResult}: Job ${env.JOB_NAME}, build ${env.BUILD_NUMBER}\n More info at: ${env.BUILD_URL}", recipientProviders: [[$class: 'CulpritsRecipientProvider']], subject: "Jenkins Build - ${currentBuild.currentResult}: Job ${env.JOB_NAME}"
        echo sh(returnStdout: true, script: 'env')
        sh 'node -v'
      }
    }
  }
}