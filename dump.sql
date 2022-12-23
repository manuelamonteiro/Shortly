--
-- PostgreSQL database dump
--

-- Dumped from database version 12.12 (Ubuntu 12.12-0ubuntu0.20.04.1)
-- Dumped by pg_dump version 12.12 (Ubuntu 12.12-0ubuntu0.20.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: sessions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.sessions (
    id integer NOT NULL,
    token text NOT NULL,
    "userId" integer NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: sessions_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.sessions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: sessions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.sessions_id_seq OWNED BY public.sessions.id;


--
-- Name: urls; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.urls (
    id integer NOT NULL,
    "shortUrl" text NOT NULL,
    url text NOT NULL,
    "visitCount" bigint DEFAULT 0 NOT NULL,
    "userId" integer NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: urls_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.urls_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: urls_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.urls_id_seq OWNED BY public.urls.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name character varying(50) NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: sessions id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions ALTER COLUMN id SET DEFAULT nextval('public.sessions_id_seq'::regclass);


--
-- Name: urls id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urls ALTER COLUMN id SET DEFAULT nextval('public.urls_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: sessions; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.sessions VALUES (1, '83358adc-b693-430e-8ff9-5fc022bcfec4', 1, '2022-12-21 19:56:29.201065');
INSERT INTO public.sessions VALUES (2, '91a027e1-5833-4dc1-ad77-21df50fb1572', 2, '2022-12-21 20:41:03.891872');
INSERT INTO public.sessions VALUES (3, '7b2a2df0-f6a5-4821-a450-7c82dd45b0b2', 1, '2022-12-22 20:49:27.869837');


--
-- Data for Name: urls; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.urls VALUES (19, 'MBREQwls', 'https://www.globo.com/', 0, 2, '2022-12-21 20:41:32.11662');
INSERT INTO public.urls VALUES (20, 'UR47leqq', 'https://www.globo.com/', 0, 2, '2022-12-21 20:41:32.311232');
INSERT INTO public.urls VALUES (21, 'MrrlriQh', 'https://www.globo.com/', 0, 2, '2022-12-21 20:41:32.619094');
INSERT INTO public.urls VALUES (22, 'svzwvd4q', 'https://www.globo.com/', 0, 2, '2022-12-21 20:41:32.788624');
INSERT INTO public.urls VALUES (24, '-brfU1Tj', 'https://www.globo.com/', 0, 2, '2022-12-22 20:45:39.515137');
INSERT INTO public.urls VALUES (27, 'i_je0a81', 'https://google.com', 0, 1, '2022-12-23 01:23:55.928349');
INSERT INTO public.urls VALUES (28, 'orxnd9Z1', 'https://google.com', 0, 1, '2022-12-23 01:23:56.252056');
INSERT INTO public.urls VALUES (29, 'ACeVaJRx', 'https://google.com', 0, 1, '2022-12-23 01:23:56.751604');
INSERT INTO public.urls VALUES (30, 'QIHTWRgX', 'https://google.com', 0, 1, '2022-12-23 01:23:56.952919');
INSERT INTO public.urls VALUES (31, 'P7DYKoxH', 'https://google.com', 0, 1, '2022-12-23 01:23:57.100117');
INSERT INTO public.urls VALUES (32, 'wQ0fixFU', 'https://google.com', 0, 1, '2022-12-23 01:23:57.268081');
INSERT INTO public.urls VALUES (33, 'lj4geXEJ', 'https://google.com', 0, 1, '2022-12-23 01:23:57.441415');
INSERT INTO public.urls VALUES (34, 'WhpHndfp', 'https://google.com', 0, 1, '2022-12-23 01:23:57.595922');
INSERT INTO public.urls VALUES (35, '1MhZmm6i', 'https://google.com', 0, 1, '2022-12-23 01:23:57.747717');


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.users VALUES (1, 'João', 'joão@gmail.com', '$2b$10$QZ.eQ7srP8QwwF.E2SZ1O.e82OhQk1NXyR4m0dQlG6S9wRyUQWYOG', '2022-12-21 19:05:37.672918');
INSERT INTO public.users VALUES (2, 'Lucas', 'lucas@gmail.com', '$2b$10$BdI5l.FSr5wsBfbg2T1NJ.61okyXlsjRLNg4RLnm6okmI.9mNs/qy', '2022-12-21 19:07:42.286532');


--
-- Name: sessions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.sessions_id_seq', 3, true);


--
-- Name: urls_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.urls_id_seq', 35, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.users_id_seq', 2, true);


--
-- Name: sessions sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_pkey PRIMARY KEY (id);


--
-- Name: urls urls_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urls
    ADD CONSTRAINT urls_pkey PRIMARY KEY (id);


--
-- Name: urls urls_shortUrl_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urls
    ADD CONSTRAINT "urls_shortUrl_key" UNIQUE ("shortUrl");


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: sessions sessions_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT "sessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id);


--
-- Name: urls urls_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urls
    ADD CONSTRAINT "urls_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id);


--
-- PostgreSQL database dump complete
--

