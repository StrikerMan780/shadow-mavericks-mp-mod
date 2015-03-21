@echo off
SET PATH=%PATH%;%~dp0\Tools
set WorkingCopyPath=%~dp0
cls

:GITRefresh
echo ------------------------------
echo Retrieving GIT Revision Number
echo ------------------------------
for /f "delims=" %%i in ('git rev-list HEAD --count') do set REVISIONNUMBER=%%i

:MENU
cd /d %~dp0
cls

chgcolor 0a
echo 浜様様様様様様様様様様様様様様様様様融
echoj $ba
chgcolor 0f
echoj " Shadow Mavericks Multi-Purpose Mod "
chgcolor 0a
echoj $ba $0a
echoj $ba
chgcolor 0f
echoj " Development and GIT Build Compiler "
chgcolor 0a
echoj $ba $0a
echo 藩様様様様様様様様様様様様様様様様様夕

chgcolor 07
echo.
echoj "Current Path Is: "
chgcolor 0b
echo %~dp0
chgcolor 07
echoj "Current GIT Revision: "
chgcolor 0c
echo %REVISIONNUMBER%
echo.
chgcolor 0f
echoj "1. "
chgcolor 0e
echo Build Development Core Module
chgcolor 0f
echoj "2. "
chgcolor 06
echo Build Development Extras Module

echo.
chgcolor 0f
echoj "3. "
chgcolor 0e
echoj "Build GIT Release Core Module "
chgcolor 0a
echoj "(FULL)" $0a
chgcolor 0f
echoj "4. "
chgcolor 06
echoj "Build GIT Release Extras Module "
chgcolor 0a
echoj "(FULL)" $0a

echo.
chgcolor 0f
echoj "5. "
chgcolor 0e
echoj "Build GIT Release Core Module "
chgcolor 0d
echoj "(QUICK)" $0a
chgcolor 0f
echoj "6. "
chgcolor 06
echoj "Build GIT Release Extras Module "
chgcolor 0d
echoj "(QUICK)" $0a
echo.
chgcolor 0f
echoj "7. "
chgcolor 02
echo Refresh GIT Revision
chgcolor 0f
echoj "8. "
chgcolor 03
echo Quit
chgcolor 07

echo.
CHOICE /C 12345678 /N /M "Choose Option (Number Keys):"
IF ERRORLEVEL 8 GOTO LEAVE
IF ERRORLEVEL 7 GOTO GITREFRESH
IF ERRORLEVEL 6 GOTO GITEXTRASQUICK
IF ERRORLEVEL 5 GOTO GITCOREQUICK
IF ERRORLEVEL 4 GOTO GITEXTRASFULL
IF ERRORLEVEL 3 GOTO GITCOREFULL
IF ERRORLEVEL 2 GOTO DEVEXTRAS
IF ERRORLEVEL 1 GOTO DEVCORE

:DEVCORE
echo Compiling SMMP Development Core Module...
del .\builds\SMMP_Core_DEV.pk3 /q
move /Y .\pk3\*.bak .\backups >nul 2>&1

cd pk3
7za a -y -tzip -mx=0 -mmt -xr!.GIT -xr!*.dbs ..\builds\SMMP_Core_DEV.pk3 .\

pause
goto MENU

:DEVEXTRAS
echo Compiling SMMP Development Extras Module...
del .\builds\SMMP_MapsAndExtras_DEV.pk3 /q
move /Y .\pk3_extras\Maps\*.backup* .\backups >nul 2>&1
move /Y .\pk3_extras\Maps\*.bak .\backups >nul 2>&1

cd pk3_extras
7za a -y -tzip -mx=0 -mmt -xr!.GIT -xr!*.dbs ..\builds\SMMP_MapsAndExtras_DEV.pk3 .\

pause
goto MENU

:GITCOREFULL
echo Compiling SMMP GIT Core Module Rev#: %REVISIONNUMBER% (Full Compression)...
del .\builds\SMMP_Core_r%REVISIONNUMBER%.pk3 /q
move /Y .\pk3\*.bak .\backups >nul 2>&1

cd pk3
7za a -y -tzip -mx=9 -mmt -xr!.GIT -xr!*.dbs ..\builds\SMMP_Core_r%REVISIONNUMBER%.pk3 .\

pause
goto MENU

:GITEXTRASFULL
echo Compiling SMMP GIT Extras Module Rev#: %REVISIONNUMBER% (Full Compression)...
del .\builds\SMMP_MapsAndExtras_r%REVISIONNUMBER%.pk3 /q
move /Y .\pk3_extras\Maps\*.backup* .\backups >nul 2>&1
move /Y .\pk3_extras\Maps\*.bak .\backups >nul 2>&1

cd pk3_extras
7za a -y -tzip -mx=9 -mmt -xr!.GIT -xr!*.dbs ..\builds\SMMP_MapsAndExtras_r%REVISIONNUMBER%.pk3 .\

pause
goto MENU

:GITCOREQUICK
echo Compiling SMMP GIT Core Module Rev#: %REVISIONNUMBER% (No Compression)...
del .\builds\SMMP_Core_r%REVISIONNUMBER%.pk3 /q
move /Y .\pk3\*.bak .\backups >nul 2>&1

cd pk3
7za a -y -tzip -mx=0 -mmt -xr!.GIT -xr!*.dbs ..\builds\SMMP_Core_r%REVISIONNUMBER%.pk3 .\

pause
goto MENU

:GITEXTRASQUICK
echo Compiling SMMP GIT Extras Module Rev#: %REVISIONNUMBER% (No Compression)...
del .\builds\SMMP_MapsAndExtras_r%REVISIONNUMBER%.pk3 /q
move /Y .\pk3_extras\Maps\*.backup* .\backups >nul 2>&1
move /Y .\pk3_extras\Maps\*.bak .\backups >nul 2>&1

cd pk3_extras
7za a -y -tzip -mx=0 -mmt -xr!.GIT -xr!*.dbs ..\builds\SMMP_MapsAndExtras_r%REVISIONNUMBER%.pk3 .\

pause
goto MENU

:LEAVE
cls
echo.
chgcolor 0a
echo Thanks for trying SMMP! - Jordon Moss (aka. Striker The Hedgefox)
chgcolor 0b
echo Found any bugs? E-Mail me at mossj32@gmail.com
echo or post @ http://shadowmavericks.com/forums/
chgcolor 0e
timeout 5