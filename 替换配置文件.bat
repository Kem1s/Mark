
:: %~dp0可以表示批处理文件自身所在目录

:: /s 复制非空的目录和子目录。如果省略 /s，xcopy 将在一个目录中工作。 
:: /e 复制所有子目录，包括空目录。同时使用 /e、/s 和 /t 命令行选项。 
:: 参考https://www.jb51.net/article/49588.htm


:: 复制配置文件到ios目录下
xcopy /y %~dp0ios\jquery.param.js %~dp0ios\static\script\

:: 复制配置文件到m目录下
xcopy /y %~dp0m\jquery.param.js %~dp0m\static\script\


pause