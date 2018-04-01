DROP DATABASE if EXISTS "disc_golf_db";

CREATE DATABASE "disc_golf_db";

USE "disc_gold_db";

CREATE TABLE "user_info" (
  "id" INT(10) NOT NULL auto_increment,
  "user_id" INT(10) NOT NULL,
  "user_name" VARCHAR(255) NOT NULL,
  "email" VARCHAR(255) NOT NULL,
  "password" VARCHAR(255) NOT NULL
)

CREATE TABLE "user_rounds" (
  "user_id" INT(10) NOT NULL,
  "course_id" INT(10) NOT NULL,
  "score" INT(10) NOT NULL,
  "tosses" INT(10) NOT NULL
)

CREATE TABLE "courses" (
  "course_id" INT(10) NOT NULL,
  "course_address" VARCHAR(255) NOT NULL,
  "number_of_holes" INT(10) NOT NULL,
  "rating" INT(10) NOT NULL
)

CREATE TABLE "holes" (
  "course_id" INT(10) NOT NULL,
  "course_hole" INT(10) NOT Null,
  "par" INT(10) NOT NULL,
  "distance" INT(10) NOT NULL,
  "comments" VARCHAR(255)
)

SELECT user_info.user_id
FROM user_rounds
INNER JOIN user_info ON user_info.user_id=user_rounds.user_id;