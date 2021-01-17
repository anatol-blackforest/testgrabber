CREATE TABLE IF NOT EXISTS "news" 
(
    "__id"   SERIAL , 
    "link" VARCHAR(255), 
    "title" VARCHAR(255), 
    "img" VARCHAR(255), 
    "text" TEXT, 
    "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL, 
    "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL, 
    PRIMARY KEY ("__id")
);
