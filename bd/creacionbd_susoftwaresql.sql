

--DROP TABLE public.tarea;


CREATE TABLE public.area (
	id_area serial4 NOT NULL,
	nombre varchar NOT NULL,
	descripcion varchar NOT NULL,
	CONSTRAINT area_pkey PRIMARY KEY (id_area)
);


CREATE TABLE public.sede (
	id_sede serial4 NOT NULL,
	nombre varchar(255) NOT NULL,
	ubicacion varchar(255) NOT NULL,
	CONSTRAINT sede_unique UNIQUE (id_sede)
);

CREATE TABLE public.departamento (
	id_departamento serial4 NOT NULL,
	nombre varchar(255) NOT NULL,
	id_sede int4 NOT NULL,
	descripcion varchar NOT NULL,
	id_area int4 NOT NULL,
	CONSTRAINT departamento_unique UNIQUE (id_departamento)
);


ALTER TABLE public.departamento ADD CONSTRAINT departamento_area_fk FOREIGN KEY (id_area) REFERENCES public.area(id_area);
ALTER TABLE public.departamento ADD CONSTRAINT departamento_sede_fk FOREIGN KEY (id_sede) REFERENCES public.sede(id_sede);




CREATE TABLE public.usuarios (
	id_usuario serial4 NOT NULL,
	nombre varchar(255) NOT NULL,
	rol varchar(100) NULL,
	cedula numeric NOT NULL,
	email varchar(255) NULL,
	id_sede int4 NULL,
	id_departamento int4 NULL,
	contrasena varchar NOT NULL,
	CONSTRAINT usuarios_pkey PRIMARY KEY (id_usuario)
);


-- public.usuarios foreign keys

ALTER TABLE public.usuarios ADD CONSTRAINT usuarios_departamento_fk FOREIGN KEY (id_departamento) REFERENCES public.departamento(id_departamento);
ALTER TABLE public.usuarios ADD CONSTRAINT usuarios_sede_fk FOREIGN KEY (id_sede) REFERENCES public.sede(id_sede);

CREATE TABLE public.tarea (
	id_tarea serial4 NOT NULL,
	descripcion varchar(255) NOT NULL,
	fecha_inicio date NOT NULL,
	fecha_fin date NOT NULL,
	id_usuario int4 NOT NULL,
	titulo varchar NULL,
	estado bool DEFAULT false NULL,
	CONSTRAINT "Tarea_pkey" PRIMARY KEY (id_tarea)
);


ALTER TABLE public.tarea ADD CONSTRAINT tarea_usuarios_fk FOREIGN KEY (id_usuario) REFERENCES public.usuarios(id_usuario);

INSERT INTO public.sede
(nombre, ubicacion)
VALUES('CALI', 'VALLE'),
('MEDELLIN', 'ANTIOQUIA'),
('BOGOTA', 'CUNDINAMARCA');

INSERT INTO public.area
(nombre, descripcion)
VALUES('TICS', 'TECH'),
('PLANEACION', 'PLANNING');


INSERT INTO public.departamento
(nombre, id_sede, descripcion, id_area)
VALUES('INFRAESTRUCTURA', 1, 'INFRA', 1);

INSERT INTO public.usuarios
(nombre, rol, cedula, email, id_sede, id_departamento)
VALUES('FELIPE JIMENEZ', 'DESARROLLADOR', 11111, 'FELIPE@GMAIL.COM', 1, 1);

INSERT INTO public.tarea (descripcion, fecha_inicio, fecha_fin, id_usuario)
VALUES ('Revisar reportes', '2025-02-01', '2025-02-05', 1);

select * from public.usuarios