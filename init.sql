CREATE DATABASE IF NOT EXISTS puzmage;
use puzmage;

-- drop table users;
create table users(
	usu_id int auto_increment,
	usu_email varchar(100) not null,
    usu_password varchar(100) not null,
    usu_estado int not null,
    
    primary key(usu_id)
);

-- drop table images;
create table images(
	img_id int auto_increment,
	img_usuario int not null,
	img_content text not null,
    img_estado int not null,
    
    primary key(img_id),
    foreign key(img_usuario) references users(usu_id)
);

-- drop table
-- drop table salas;
create table salas(
	sal_id int auto_increment,
    sal_usuario int not null,
    sal_img int not null,
    sal_code varchar(50) not null,
	sal_level int not null,
    sal_estado int not null,
    
    primary key(sal_id),
    foreign key(sal_usuario) references users(usu_id),
    foreign key(sal_img) references images(img_id)
);
