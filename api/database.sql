CREATE ROLE kolpomail WITH
    LOGIN
    NOSUPERUSER
    NOCREATEDB
    NOCREATEROLE
    INHERIT
    NOREPLICATION
    NOBYPASSRLS
    PASSWORD 'kolpomail';

CREATE DATABASE kolpomail
    WITH
    OWNER = kolpomail
    ENCODING = 'UTF8'
    LOCALE_PROVIDER = 'libc'
    IS_TEMPLATE = False;

CREATE TABLE public.users (
    "id" bigint NOT NULL GENERATED ALWAYS AS IDENTITY (INCREMENT 1 START 1),
    "email" text NOT NULL,
    "password" text NOT NULL,
    PRIMARY KEY ("id")
);

ALTER TABLE IF EXISTS public.users
    OWNER to kolpomail;

CREATE TABLE public.mails (
    "id" bigint NOT NULL GENERATED ALWAYS AS IDENTITY (INCREMENT 1 START 1),
    "from" text NOT NULL,
    "to" bigint NOT NULL,
    "date" timestamp without time zone NOT NULL,
    "content" text NOT NULL,
    PRIMARY KEY ("id", "from", "to", "date", "content"),
    FOREIGN KEY ("to")
        REFERENCES public.users ("id") MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
);

ALTER TABLE IF EXISTS public.mails
    OWNER to kolpomail;
