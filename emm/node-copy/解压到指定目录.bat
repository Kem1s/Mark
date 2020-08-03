@echo off

:: @echo 压缩文件备份  /y表示文件重名时自动覆盖写成 /n默认不覆盖 /?界面提示
:: xcopy /y C:\Users\ＷＩＮＤＯＷＳ\Desktop\临时\node-copy\b\*.rar  C:\Users\ＷＩＮＤＯＷＳ\Desktop\临时\node-copy\c\

:: 利用rar解压缩文件 参考https://blog.csdn.net/lingling1420q/article/details/18360593
:: 用法:  rar <命令> -<开关 1> -<开关 N> <压缩文件> <文件...> <@列表文件...> <解压路径\>
:: 具体命令可以cmd rar -?

@echo 解压文件，-or表示文件解压后遇到重名文件自动重命名，首先检测目录下是否存在.rar的文件
if  exist C:\Users\ＷＩＮＤＯＷＳ\Desktop\临时\node-copy\b\*.zip (
    rar x -or C:\Users\ＷＩＮＤＯＷＳ\Desktop\临时\node-copy\b\*.zip C:\Users\ＷＩＮＤＯＷＳ\Desktop\临时\node-copy\e\
	::@echo 也可以写成这样     "C:\Program Files\WinRAR\rar.exe" e -or "D:\压缩包所在路径\*.zip" "D:\解压到该路径下"
	pause
)

:: @echo 删除原压缩包文件
:: del /f /s /q /a C:\Users\ＷＩＮＤＯＷＳ\Desktop\临时\node-copy\b\*.zip


pause