pipeline {
    agent any

    options {
        timestamps()
        timeout(time: 30, unit: 'MINUTES')
    }

    environment {
        CI = 'true'
        PLAYWRIGHT_HTML_OPEN = 'never'
        PLAYWRIGHT_JUNIT_OUTPUT_NAME = 'test-results/junit.xml'
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
                dir('playwright-report') {
                    deleteDir()
                }
                dir('test-results') {
                    deleteDir()
                }
                script {
                    env.TESTS_STARTED = 'true'
                }
                bat 'npm test -- --reporter=html,junit'
            }
        }
    }

    post {
        always {
            script {
                if (env.TESTS_STARTED == 'true') {
                    catchError(buildResult: 'FAILURE', catchInterruptions: false) {
                        publishHTML(target: [
                            reportDir: 'playwright-report',
                            reportFiles: 'index.html',
                            reportName: 'Playwright Report',
                            keepAll: true,
                            alwaysLinkToLastBuild: true,
                            allowMissing: false
                        ])
                    }
                    catchError(buildResult: 'FAILURE', catchInterruptions: false) {
                        junit testResults: 'test-results/junit.xml'
                    }
                }
            }
            archiveArtifacts artifacts: 'test-results/**', allowEmptyArchive: true
        }
    }
}
