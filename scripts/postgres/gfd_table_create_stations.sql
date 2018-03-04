DROP TABLE IF EXISTS apparatus CASCADE;
CREATE TABLE "stations" (
        "stationId" varchar NOT NULL UNIQUE,
        "apparatusName" varchar NOT NULL,
        "enabled" boolean NOT NULL DEFAULT true
) WITH (
  OIDS=FALSE
);

