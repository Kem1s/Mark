@echo off

:: @echo ѹ���ļ�����  /y��ʾ�ļ�����ʱ�Զ�����д�� /nĬ�ϲ����� /?������ʾ
:: xcopy /y C:\Users\�ףɣΣģϣף�\Desktop\��ʱ\node-copy\b\*.rar  C:\Users\�ףɣΣģϣף�\Desktop\��ʱ\node-copy\c\

:: ����rar��ѹ���ļ� �ο�https://blog.csdn.net/lingling1420q/article/details/18360593
:: �÷�:  rar <����> -<���� 1> -<���� N> <ѹ���ļ�> <�ļ�...> <@�б��ļ�...> <��ѹ·��\>
:: �����������cmd rar -?

@echo ��ѹ�ļ���-or��ʾ�ļ���ѹ�����������ļ��Զ������������ȼ��Ŀ¼���Ƿ����.rar���ļ�
if  exist C:\Users\�ףɣΣģϣף�\Desktop\��ʱ\node-copy\b\*.zip (
    rar x -or C:\Users\�ףɣΣģϣף�\Desktop\��ʱ\node-copy\b\*.zip C:\Users\�ףɣΣģϣף�\Desktop\��ʱ\node-copy\e\
	::@echo Ҳ����д������     "C:\Program Files\WinRAR\rar.exe" e -or "D:\ѹ��������·��\*.zip" "D:\��ѹ����·����"
	pause
)

:: @echo ɾ��ԭѹ�����ļ�
:: del /f /s /q /a C:\Users\�ףɣΣģϣף�\Desktop\��ʱ\node-copy\b\*.zip


pause