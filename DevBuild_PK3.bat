@echo off
ECHO.
ECHO Compiling SMMP Dev Build...
ECHO.

move /Y .\pk3_extras\Maps\*.backup* .\backups >nul 2>&1
move /Y .\pk3_extras\Maps\*.dbs .\backups >nul 2>&1
move /Y .\pk3_extras\Maps\*.bak .\backups >nul 2>&1
ECHO.
del SMMP_Core_DEV.pk3
del SMMP_MapsAndExtras_DEV.pk3

cd pk3
..\Tools\7za a -y -tzip -mx=0 -mmt -x!.svn ..\SMMP_Core_DEV.pk3 .\

cd ..\pk3_extras
..\Tools\7za a -y -tzip -mx=0 -mmt -x!.svn ..\SMMP_MapsAndExtras_DEV.pk3 .\

pause
goto Leave

:LEAVE