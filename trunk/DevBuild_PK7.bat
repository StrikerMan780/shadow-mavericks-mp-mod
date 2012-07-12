@echo off
ECHO.
ECHO Compiling SMMP Dev Build...
ECHO.

move /Y .\pk3\Maps\*.backup* .\backups >nul 2>&1
move /Y .\pk3\Maps\*.dbs .\backups >nul 2>&1
move /Y .\pk3\Maps\*.bak .\backups >nul 2>&1
ECHO.
del SMMP-DEV.pk3

cd pk3
..\Tools\7za a -y -t7z -mx=0 -mmt -x!.svn ..\SMMP-DEV.pk7 .\

pause
goto Leave

:ERRORFAIL
ECHO.
ECHO.     BUILD FAILED (Tool returned error)
ECHO.
PAUSE > NUL
GOTO LEAVE

:FILEFAIL
ECHO.
ECHO.     BUILD FAILED (Output file was not built)
ECHO.
PAUSE > NUL
GOTO LEAVE

:LEAVE