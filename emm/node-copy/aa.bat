
:: ��վ���ʶ.txt�л�ȡվ���ʶ�������ļ���ָ��Ŀ¼վ���ʶ�ļ�����

for /f "delims=" %%i in (վ���ʶ.txt) do (
	echo %%i
	xcopy /y E:\git�ֿ�\��Դ������\m\%%i\logo\logo.png C:\Users\�ףɣΣģϣף�\Desktop\��ʱ\node-copy\b\%%i\ /s /e  
)
pause