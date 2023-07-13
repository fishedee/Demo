create table operator(
	id serial not null,
	name varchar(32) not null,
	primary key(id)
);
/*lately raise error until committing if having 'derrable initialy deferred'*/
/*alter table operator add constraint name_unique unique(name) deferrable initially deferred;*/
/*immediately raise error if having no 'derrable initialy deferred'*/
alter table operator add constraint name_unique unique(name);
