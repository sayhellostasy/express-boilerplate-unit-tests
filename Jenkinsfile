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
    stage('Preprod') {
        
        def userAborted = false
        emailext body: "Please go to the console output of ${env.BUILD_URL} input to approve or reject."
        mimeType: 'text/html'
        subject: "[Jenkins] Build - ${currentBuild.currentResult}: Job ${env.JOB_NAME}"
        to: 'pourab.karchaudhuri@gmail.com'
        recipientProviders: [[$class: 'CulpritsRecipientProvider']]

        try{
            userInput = input submitter = 'vagrant', message: "Do you Approve?"
        }
        catch (org.jenkinsci.plugins.workflow.steps.FlowInterruptedException e){
            cause = e.causes.get(0)
            echo "Aborted by " + cause.getUser().toString()
                userAborted = true
                echo = "SYSTEM aborted, but looks like timeout period didnt complete. Aborting..."
        }
        if(userAborted){
            currentBuild.result = "ABORTED"
        }
        else{
            echo 'Working....'
        }
    }
      steps {
        sh 'echo "Deploying to Production"'
        emailext body: "${currentBuild.currentResult}: Job ${env.JOB_NAME}, build ${env.BUILD_NUMBER}\n More info at: ${env.BUILD_URL}", recipientProviders: [[$class: 'CulpritsRecipientProvider']], subject: "Jenkins Build - ${currentBuild.currentResult}: Job ${env.JOB_NAME}"
        echo sh(returnStdout: true, script: 'env')
        sh 'node -v'
      }
    }
  }
}