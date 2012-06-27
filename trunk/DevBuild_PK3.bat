@echo off
ECHO.
ECHO Compiling SMMP Dev Build...
ECHO.

move /Y .\pk3\Maps\*.backup* .\backups >nul 2>&1
move /Y .\pk3\Maps\*.dbs .\backups >nul 2>&1
move /Y .\pk3\Maps\*.bak .\backups >nul 2>&1
ECHO.

cd pk3
del smmp-dev.pk3.tmp
..\Tools\7za u -y -tzip -mx=0 -mmt -x!.svn ..\SMMP-DEV.pk3 .\

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