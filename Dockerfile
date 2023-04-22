FROM maven

WORKDIR /app
COPY . .
RUN mvn clean install
RUN mvn package

EXPOSE 9090
CMD mvn spring-boot:run