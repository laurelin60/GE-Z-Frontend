CREATE TABLE "articulation_course" (
	"articulation_id" integer NOT NULL,
	"course_id" integer NOT NULL,
	CONSTRAINT "articulation_course_articulation_id_course_id_pk" PRIMARY KEY("articulation_id","course_id")
);
--> statement-breakpoint
CREATE TABLE "articulation_cvc_course" (
	"articulation_id" integer NOT NULL,
	"cvc_course_id" integer NOT NULL,
	CONSTRAINT "articulation_cvc_course_articulation_id_cvc_course_id_pk" PRIMARY KEY("articulation_id","cvc_course_id")
);
--> statement-breakpoint
CREATE TABLE "articulation" (
	"id" serial PRIMARY KEY NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"assist_path" text NOT NULL,
	"from_college" varchar(255) NOT NULL,
	"to_institution_name" varchar(255) NOT NULL,
	"from_courses_strings" text[] NOT NULL,
	"to_courses_strings" text[] NOT NULL,
	"to_institution_id" integer
);
--> statement-breakpoint
CREATE TABLE "course_ge_category" (
	"course_id" integer NOT NULL,
	"ge_category_id" integer NOT NULL,
	CONSTRAINT "course_ge_category_course_id_ge_category_id_pk" PRIMARY KEY("course_id","ge_category_id")
);
--> statement-breakpoint
CREATE TABLE "course" (
	"id" serial PRIMARY KEY NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"course_code" varchar(255) NOT NULL,
	"course_department" varchar(255) NOT NULL,
	"course_number" varchar(255) NOT NULL,
	"course_name" text DEFAULT '',
	"institution_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "cvc_course" (
	"id" serial PRIMARY KEY NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"college" varchar(255) NOT NULL,
	"course_code" varchar(255) NOT NULL,
	"course_name" text NOT NULL,
	"cvc_id" varchar(255) NOT NULL,
	"nice_to_haves" text[],
	"units" numeric,
	"start_date" timestamp with time zone NOT NULL,
	"end_date" timestamp with time zone NOT NULL,
	"async" boolean NOT NULL,
	"has_open_seats" boolean NOT NULL,
	"has_prereqs" boolean NOT NULL,
	"instant_enrollment" boolean NOT NULL,
	"tuition" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "cvc_fulfills_ge" (
	"id" serial PRIMARY KEY NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"count" integer DEFAULT 1 NOT NULL,
	"cvc_course_id" integer NOT NULL,
	"ge_category_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "ge_category" (
	"id" serial PRIMARY KEY NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"category" varchar(255) NOT NULL,
	"institution_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "institution" (
	"id" serial PRIMARY KEY NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"name" varchar(255) NOT NULL,
	"code" varchar(255) NOT NULL
);
--> statement-breakpoint
ALTER TABLE "articulation_course" ADD CONSTRAINT "articulation_course_articulation_id_articulation_id_fk" FOREIGN KEY ("articulation_id") REFERENCES "public"."articulation"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "articulation_course" ADD CONSTRAINT "articulation_course_course_id_course_id_fk" FOREIGN KEY ("course_id") REFERENCES "public"."course"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "articulation_cvc_course" ADD CONSTRAINT "articulation_cvc_course_articulation_id_articulation_id_fk" FOREIGN KEY ("articulation_id") REFERENCES "public"."articulation"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "articulation_cvc_course" ADD CONSTRAINT "articulation_cvc_course_cvc_course_id_cvc_course_id_fk" FOREIGN KEY ("cvc_course_id") REFERENCES "public"."cvc_course"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "articulation" ADD CONSTRAINT "articulation_to_institution_id_institution_id_fk" FOREIGN KEY ("to_institution_id") REFERENCES "public"."institution"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "course_ge_category" ADD CONSTRAINT "course_ge_category_course_id_course_id_fk" FOREIGN KEY ("course_id") REFERENCES "public"."course"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "course_ge_category" ADD CONSTRAINT "course_ge_category_ge_category_id_ge_category_id_fk" FOREIGN KEY ("ge_category_id") REFERENCES "public"."ge_category"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "course" ADD CONSTRAINT "course_institution_id_institution_id_fk" FOREIGN KEY ("institution_id") REFERENCES "public"."institution"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "cvc_fulfills_ge" ADD CONSTRAINT "cvc_fulfills_ge_cvc_course_id_cvc_course_id_fk" FOREIGN KEY ("cvc_course_id") REFERENCES "public"."cvc_course"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "cvc_fulfills_ge" ADD CONSTRAINT "cvc_fulfills_ge_ge_category_id_ge_category_id_fk" FOREIGN KEY ("ge_category_id") REFERENCES "public"."ge_category"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ge_category" ADD CONSTRAINT "ge_category_institution_id_institution_id_fk" FOREIGN KEY ("institution_id") REFERENCES "public"."institution"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "articulation_from_to_courses_unique" ON "articulation" USING btree ("from_college","to_institution_name","from_courses_strings","to_courses_strings");--> statement-breakpoint
CREATE UNIQUE INDEX "course_institution_coursecode_unique" ON "course" USING btree ("institution_id","course_code");--> statement-breakpoint
CREATE UNIQUE INDEX "cvccourse_cvcid_coursecode_unique" ON "cvc_course" USING btree ("cvc_id","course_code");--> statement-breakpoint
CREATE UNIQUE INDEX "cvcfulfillsge_cvc_ge_unique" ON "cvc_fulfills_ge" USING btree ("cvc_course_id","ge_category_id");--> statement-breakpoint
CREATE UNIQUE INDEX "gecategory_institution_category_unique" ON "ge_category" USING btree ("institution_id","category");--> statement-breakpoint
CREATE UNIQUE INDEX "institution_name_unique" ON "institution" USING btree ("name");--> statement-breakpoint
CREATE UNIQUE INDEX "institution_code_unique" ON "institution" USING btree ("code");