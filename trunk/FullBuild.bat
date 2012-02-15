@echo off
SET PATH=.\tools\bin

ECHO.
ECHO Looking up current repository revision numbers...
ECHO.
IF EXIST "setenv.bat" DEL /F /Q "setenv.bat" > NUL
VersionFromSVN.exe "PK3\DECORATE.TXT" "PK3\MAPINFO.TXT" -O "setenv.bat"
IF %ERRORLEVEL% NEQ 0 GOTO ERRORFAIL
IF NOT EXIST "setenv.bat" GOTO FILEFAIL

CALL "setenv.bat"
DEL /F /Q "setenv.bat"

ECHO.
ECHO Full Compiling SMMP Build Rev#: %REVISIONNUMBER%...
ECHO.

move /Y .\pk3\Maps\*.backup* .\backups >nul 2>&1
move /Y .\pk3\Maps\*.dbs .\backups >nul 2>&1
ECHO.

cd pk3
..\Tools\7za a -y -tzip -mx=9 -x!.svn ..\SMMP-r%REVISIONNUMBER%.pk3 .\

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