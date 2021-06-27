DROP TABLE IF EXISTS session;
DROP TABLE IF EXISTS customer;
DROP TABLE IF EXISTS visit;
DROP TABLE IF EXISTS visit_holder;
DROP TABLE IF EXISTS day_schedule;
DROP TABLE IF EXISTS week_schedule;
DROP TABLE IF EXISTS staff_member;
DROP TABLE IF EXISTS user;

CREATE TABLE session(
  sid                     VARCHAR(100) PRIMARY KEY NOT NULL,   
  session                 VARCHAR(2048) DEFAULT '{}',   
  lastSeen                DATETIME DEFAULT NOW() 
);

CREATE TABLE user (
    id INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(50) UNIQUE,
    passwd VARCHAR(255)
);

CREATE TABLE staff_member (
    id TINYINT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50),
    description VARCHAR(4000),
    user_id INT UNSIGNED NOT NULL,
    FOREIGN KEY (user_id) REFERENCES user(id)
);

CREATE TABLE week_schedule (
    id INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
    staff_member_id TINYINT UNSIGNED NOT NULL,
    FOREIGN KEY (staff_member_id) REFERENCES staff_member(id)
);

CREATE TABLE day_schedule (
    id INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
    day_id TINYINT UNSIGNED NOT NULL,
    start SMALLINT UNSIGNED NOT NULL,
    end SMALLINT UNSIGNED NOT NULL,
    active BOOLEAN NOT NULL,
    week_schedule_id INT UNSIGNED NOT NULL,
    FOREIGN KEY (week_schedule_id) REFERENCES week_schedule(id)
);

CREATE TABLE visit_holder (
    id INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
    day SMALLINT NOT NULL,
    week_schedule_id INT UNSIGNED NOT NULL,
    FOREIGN KEY (week_schedule_id) REFERENCES week_schedule(id)
);

CREATE TABLE visit (
    id INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
    start SMALLINT UNSIGNED NOT NULL,
    end SMALLINT UNSIGNED NOT NULL,
    type TINYINT UNSIGNED NOT NULL,
    visit_holder_id INT UNSIGNED NOT NULL,
    FOREIGN KEY (visit_holder_id) REFERENCES visit_holder(id)
);

CREATE TABLE customer (
    id INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50),
    email VARCHAR(50),
    phone VARCHAR(20),
    visit_id INT UNSIGNED NOT NULL,
    FOREIGN KEY (visit_id) REFERENCES visit(id)
);