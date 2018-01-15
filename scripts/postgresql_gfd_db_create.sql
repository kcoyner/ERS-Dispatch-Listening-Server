DROP TABLE IF EXISTS calls CASCADE;

CREATE TABLE "calls" (
        "call_id" serial NOT NULL UNIQUE,
        "UnitList" varchar NOT NULL, -- first element is radio channel, all that follows are apparatus
        "apt_no" varchar,
        "call_category" varchar NOT NULL,
        "call_description" varchar NOT NULL,
        "call_type" varchar NOT NULL,
        "cfs_no" varchar NOT NULL,
        "cfs_remark" varchar,
        "city" varchar NOT NULL,
        "dispatch_fire" varchar NOT NULL,
        "latitude" varchar NOT NULL,
        "location" varchar NOT NULL,
        "longitude" varchar NOT NULL,
        "premise_name" varchar NOT NULL,
        "priority_amb" varchar,
        "priority_fire" varchar NOT NULL,
        "priority_pol" varchar,
        "rec_dt" varchar NOT NULL,
        "x_street_name" varchar NOT NULL,
        "zip" varchar
) WITH (
  OIDS=FALSE
);

