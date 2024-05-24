# 베이스 이미지로 Amazon Corretto 17 사용
FROM amazoncorretto:17

# 컨테이너 내부에서 사용할 포트를 공개
EXPOSE 80
EXPOSE 8080
EXPOSE 443

# JAR 파일을 컨테이너 내부로 복사
ARG JAR_FILE=build/libs/*.jar
COPY ${JAR_FILE} app.jar

# SSL 키 저장소 파일을 컨테이너 내부로 복사
COPY src/main/resources/ssl/keystore.p12 /app/resources/ssl/keystore.p12

# 컨테이너가 시작될 때 실행할 명령어를 지정
# Java로 app.jar 파일을 실행하며, 활성 프로파일로 'prod'를 설정 [배포용]
ENTRYPOINT ["java", "-jar", "app.jar", "--spring.profiles.active=prod"]
