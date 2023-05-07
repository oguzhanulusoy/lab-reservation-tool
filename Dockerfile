FROM maven

WORKDIR /app
COPY . .
RUN mvn clean install
RUN mvn package

EXPOSE 8080
CMD mvn spring-boot:run