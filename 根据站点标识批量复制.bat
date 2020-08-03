
:: 从站点标识.txt中获取站点标识，复制文件到指定目录站点标识文件夹下

for /f "delims=" %%i in (站点标识.txt) do (
	echo %%i
	xcopy /y C:\Users\ＷＩＮＤＯＷＳ\Desktop\临时\node-copy\b\*.* E:\git仓库\资源服务器\m\%%i\tempQq4\ /s /e  
)
pause