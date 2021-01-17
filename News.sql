CREATE TABLE IF NOT EXISTS "news" 
(
    "id"   SERIAL , 
    "link" VARCHAR(255), 
    "title" VARCHAR(255), 
    "img" VARCHAR(255), 
    "text" TEXT, 
    PRIMARY KEY ("id")
);
