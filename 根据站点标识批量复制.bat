
:: ��վ���ʶ.txt�л�ȡվ���ʶ�������ļ���ָ��Ŀ¼վ���ʶ�ļ�����

for /f "delims=" %%i in (վ���ʶ.txt) do (
	echo %%i
	xcopy /y C:\Users\�ףɣΣģϣף�\Desktop\��ʱ\node-copy\b\*.* E:\git�ֿ�\��Դ������\m\%%i\tempQq4\ /s /e  
)
pause