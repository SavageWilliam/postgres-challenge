BEGIN;

DROP TABLE IF EXISTS users cascade;

CREATE TABLE users (
  firstname    VARCHAR(100)  NOT NULL,
  surname      VARCHAR(100)  NOT NULL,
  type         VARCHAR(100)  NOT NULL,
  age          SMALLINT      NOT NULL
);

INSERT INTO users(firstname, surname, type, age) VALUES (
  'Marko', 'Polo', 'trader', 17);
INSERT INTO users(firstname, surname, type, age) VALUES (
  'Dan', 'Sofa', 'OUR LEADER', 40);
INSERT INTO users(firstname, surname, type, age) VALUES (
  'Will', 'Savage', 'Fac9', 24);
INSERT INTO users(firstname, surname, type, age) VALUES (
  'Tommy', 'barret', 'Fac9', 27);

COMMIT;
