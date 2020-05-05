/**
 * React projesi için pipeline ayarları
 *
 * Aşamalar:
 *   - kodları derle
 *   - eğer commit etiketliyse (git tag)
 *     * imaj oluştur
 *     * imajı nexus'a gönder
 *     * yerel imajları sil (jenkinste durmasına gerek yok)
 *   - rocket chat'e mesaj gönder
 *
 * Projeye göre değiştirilecekler:
 *   - imageName: imajın grubu ve adı
 *   - channel: rocket chat mesajlarının gideceği grup adı
 * */
pipeline {
  environment {
    registry = 'dockerhub.tuik.gov.tr'
    imageName = "tuik/envanter-rapor"
    imageVersion = ''
    registryCredentials = 'nexus-gelistirici'
    dockerImage = ''
    channel = 'ybs_envanter'
    CI = 'true'
  }

  agent any

  triggers {
    gitlab(triggerOnPush: true)
  }

  post {
    success {
      script {
        updateGitlabCommitStatus name: 'build', state: 'success'
        rocketSend channel: "$channel",
                  rawMessage: true,
                  message: """
  :white_check_mark: `$registry/$imageName:$imageVersion` imajı hazırlandı
  `:latest` olarak işaretlendi
  İş Numarası: <$RUN_DISPLAY_URL|$BUILD_NUMBER>
"""
      }
    }

    failure {
      script {
        updateGitlabCommitStatus name: 'build', state: 'failed'
        rocketSend channel: "$channel",
                rawMessage: true,
                message: """
  :no_entry: Derleme başarısız oldu: $imageName
  İş Numarası: <$RUN_DISPLAY_URL|$BUILD_NUMBER>
"""
      }
    }
  }

  stages {
    stage('build') {
      steps {
        script {
          docker.image('dockerhub.tuik.gov.tr/jenkins-node:12-alpine-tuikcert')
                  .inside('-v /var/lib/jenkins/yarn-cache:/home/jenkins/.cache/yarn -u jenkins') {
                    sh 'yarn && yarn build'
                  }
        }
      }
    }

    stage('prepare image') {
      steps {
        script {
          def json = readJSON file: 'package.json'
          def jsonVersion = json.version
          imageVersion = "$jsonVersion-$BUILD_NUMBER"
          dockerImage = docker.build imageName + ":$imageVersion"
        }
      }
    }

    stage('deploy image') {
      steps {
        script {
          docker.withRegistry("http://$registry:5000", registryCredentials) {
            dockerImage.push()
            dockerImage.push('latest')
          }
        }
      }
    }

    stage('remove unused image') {
      steps {
        script {
          try {
            sh "docker image rm $registry:5000/$imageName:$imageVersion"
            sh "docker image rm $registry:5000/$imageName:latest"
            sh "docker image rm $imageName:$imageVersion"
          } catch (err) {
            echo err.message
          }
        }
      }
    }
  }
}
