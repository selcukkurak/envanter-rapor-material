/**
 * React projesi için pipeline ayarları
 *
 * Aşamalar:
 *   - kodları derle
 *   - imaj oluştur
 *   - imajı nexus'a gönder
 *   - yerel imajları sil (jenkinste durmasına gerek yok)
 *   - rocket chat'e mesaj gönder
 *
 * Projeye göre değiştirilecekler:
 *   - grup: rocket chat mesajlarının gideceği grup adı
 * */
 @Library('docker-shared-lib@master') _

pipeline {
  environment {
    imageName = ''
    imageVersion = ''
    grup = 'ybs_envanter'
    CI = 'true'
  }
  agent any

  triggers {
    gitlab(triggerOnPush: true)
  }

  post {
    success {
      roket(grup: grup, imaj: "$imageName:$imageVersion")
    }

    failure {
      roket(grup: grup, fail: true)
    }
  }

  stages {
    stage('Build') {
      steps {
        script {
          def properties = projectProperties(npm: true)
          imageName = 'tuik/' + properties.name
          imageVersion = properties.version + "-$BUILD_NUMBER"
        }
        npmBuild()
      }
    }

    stage('Docker') {
      steps {
        dockerBuild(imageName: imageName, version: imageVersion)
      }
    }
  }
}
