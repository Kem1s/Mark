MySQL
复习mysql

mysql 修改密码(管理员权限)
1. 切换到mysql的bin路径 (配置环境变量就不需要)
2. mysqld --initialize 初始化msyql
3. mysqld install 创建mysql 服务

4. net start mysql 启动服务(必须管理员权限)
5. net stop mysql 关闭服务

6. 关闭服务后 输入 mysqld --skip-grant-tables 跳过授权表认证 不需要密码直接登录
直接输入 mysql 就进入 mysql 控制台

mysql -hlocalhost -uroot -p 主机 用户名 密码
0
mysql -uroot -proot 直接登录

update user set authentication_string=password("root") where user="root"
update user set password=password(“newpassword“) where user=”root”
flush privileges;

update user set authentication_string=password("root") where user="root"
update user set password=password("root") where user="root"
flush privileges;

step 1: SET PASSWORD = PASSWORD('your new password');

step 2: ALTER USER 'root'@'localhost' PASSWORD EXPIRE NEVER;

step 3: flush privileges;

mysql 基本语句
show databases; 显示当前数据库
use mysql 使用当前数据库
show tables; 显示当前数据库下的表
desc user; 查看表结构
create database cd1706 创建数据库

创建表
-> create table if not exists person(
-> id int not null auto_increment,
-> name varchar(20),
-> age int,
-> primary key(id)
-> );

create table chengdu1706(
id int not null auto_increment,
stdno int,
name varchar(12),
age int,
birthday date,
salary int,
word varchar(20),
primary key(id)
);

增删改查

1.插入 添加数据 insert into
insert into userinfo (id,username,password) values (1,"zuozuo","root");
insert into userinfo (username,password) values ("mingming","abc123");
insert into userinfo va lues (3,"xiaohua","qwer12");

insert into article values (1,"mingming","abc","daydayup",now());
insert into article values (4,"zuozuomu","eat","go to eat huoguo",timestamp());
表示当前时间戳
now() timestamp() CURRENT_TIMESTAMP()

2. 修改 update set
update userinfo set password = root123" where username = "zuozuo";
mysql> update userinfo set username = "zuozuomu" where id = 1 and password = "r
oot123";
update user set password = "abc123" where id > 3; //批量修改
update 1809_user set age = age + 10 where id = 4;

3. 删除 数据
delete from userinfo;
delete from userinfo where id = 1;

drop table userinfo; 删表
drop database cd1706 删除数据库
truncate table userinfo 清空数据表

4. 查询 select
select * from userinfo;
select username ,password from userinfo;
select * from article order by author; 排序 默认升序
select * from article order by id desc; 排序 降序 desc 表示降序
select * from article order by author desc,content desc; author 降序 content 降序
select * from person order by age desc limit 3,2;
select * from article limit 3; 限制3条数据
select * from article where author = "mingming" order by enterdate limit 1;
select * from userInfo where id > 2 limit 2;
select * from userInfo limit 1,2;

select count(*),author from article group by author; 分组查询
select min(enterdate),author from article group by author;
select max(salary),department from emp group by department;
select avg(salary),department from emp group by department;
mysql> select * from emp where salary in (select max(salary) from emp group by
department);


select * from emp where age in (select max(age) from emp group by department);

mysql> select * from emp where salary in (10000,12000); 或者

select * from emp where age in (22,28);

select * from emp where age = 22 or age = 28;

select * from emp where age > 20 and age < 26; select * from person where age < 20 or age> 30;


    关联表查询

    select * from emp , userinfo where emp.name = userinfo.username;
    select * from emp e,userinfo u where e.name = u.username;
    select * from article a ,emp e where e.name = a.author and e.age > 24 and a.id<5; 
    select * from article where author=(select name from emp order by age desc limit 1); 
    
    模糊查询  like %% 
    开头 select * from article where author like "ming%" ; 
    包含 select * from article where author like "%zuo%" ; 
    结束 select * from article where author like "%hua" ; 
     
    
    集合拼接 
    select * from article ,emp; inner join 内连接查询 
    left join 左连接 
    right join 右连接查询 
    select * from article inner join emp on article.author=emp.name; 求2个集合的交集 
    select * from article left join emp on article.author=emp.name; 求2个表的相交部分 左表全部查出, 右表不相交部分为null 
    select * from article right join emp on article.author=emp.name; 求2个表的相交部分 右表全部查出, 左表不相交部分为null