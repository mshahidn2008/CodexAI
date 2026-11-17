pipeline {
  agent any
  options {
    timestamps()
    timeout(time: 30, unit: 'MINUTES')
  }
  environment {
    CI = 'true'
  }
  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }
    stage('Install') {
      steps {
        bat 'npm ci'
        bat 'npx playwright install'
      }
    }
    stage('Typecheck') {
      steps {
        bat 'npm run typecheck'
      }
    }
    stage('Test') {
      steps {
        // Credentials are only injected here; the build fails if either is missing.
        withCredentials([
          string(credentialsId: 'LOGIN_USERNAME', variable: 'LOGIN_USERNAME'),
          string(credentialsId: 'LOGIN_PASSWORD', variable: 'LOGIN_PASSWORD')
        ]) {
          bat 'npm test'
        }
      }
    }
  }
  post {
    always {
      publishHTML(target: [
        reportDir: 'playwright-report',
        reportFiles: 'index.html',
        reportName: 'Playwright Report',
        keepAll: true,
        alwaysLinkToLastBuild: true,
        allowMissing: true
      ])
      archiveArtifacts artifacts: 'test-results/**', allowEmptyArchive: true
    }
  }
}
