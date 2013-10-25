@echo off
set WorkingCopyPath=%~dp0

ECHO.
ECHO Looking up current repository revision numbers...
ECHO.
for /f "tokens=5" %%i in ('"SubWCRev "%WorkingCopyPath%.""') do set REVISIONNUMBER=%%i
echo Found Revision Number: %REVISIONNUMBER%

ECHO.
ECHO Full Compiling SMMP Build Rev#: %REVISIONNUMBER%...
ECHO.

move /Y .\pk3_extras\Maps\*.backup* .\backups >nul 2>&1
move /Y .\pk3_extras\Maps\*.dbs .\backups >nul 2>&1
move /Y .\pk3_extras\Maps\*.bak .\backups >nul 2>&1
ECHO.

cd pk3
..\Tools\7za a -y -tzip -mx=9 -mmt -x!.svn ..\SMMP_Core_r%REVISIONNUMBER%.pk3 .\

cd ..\pk3_extras
..\Tools\7za a -y -tzip -mx=9 -mmt -x!.svn ..\SMMP_MapsAndExtras_r%REVISIONNUMBER%.pk3 .\

pause
goto Leave

:LEAVE