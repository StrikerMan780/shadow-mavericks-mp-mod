@echo off
SET PATH=%PATH%;%~dp0\Tools
set WorkingCopyPath=%~dp0
cls

echo ------------------------------
echo Retrieving SVN Revision Number
echo ------------------------------
for /f "tokens=5" %%i in ('"SubWCRev "%WorkingCopyPath%.""') do set REVISIONNUMBER=%%i

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
echoj " Development and SVN Build Compiler "
chgcolor 0a
echoj $ba $0a
echo 藩様様様様様様様様様様様様様様様様様夕

chgcolor 07
echo.
echoj "Current Path Is: "
chgcolor 0b
echo %~dp0
chgcolor 07
echoj "Current SVN Revision: "
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
echoj "Build SVN Release Core Module "
chgcolor 0a
echoj "(FULL)" $0a
chgcolor 0f
echoj "4. "
chgcolor 06
echoj "Build SVN Release Extras Module "
chgcolor 0a
echoj "(FULL)" $0a

echo.
chgcolor 0f
echoj "5. "
chgcolor 0e
echoj "Build SVN Release Core Module "
chgcolor 0d
echoj "(QUICK)" $0a
chgcolor 0f
echoj "6. "
chgcolor 06
echoj "Build SVN Release Extras Module "
chgcolor 0d
echoj "(QUICK)" $0a
echo.
chgcolor 0f
echoj "7. "
chgcolor 03
echo Quit
chgcolor 07

echo.
CHOICE /C 1234567 /N /M "Choose Option (Number Keys):"
IF ERRORLEVEL 7 GOTO LEAVE
IF ERRORLEVEL 6 GOTO SVNEXTRASQUICK
IF ERRORLEVEL 5 GOTO SVNCOREQUICK
IF ERRORLEVEL 4 GOTO SVNEXTRASFULL
IF ERRORLEVEL 3 GOTO SVNCOREFULL
IF ERRORLEVEL 2 GOTO DEVEXTRAS
IF ERRORLEVEL 1 GOTO DEVCORE

:DEVCORE
echo Compiling SMMP Development Core Module...
del SMMP_Core_DEV.pk3

cd pk3
..\Tools\7za a -y -tzip -mx=0 -mmt -x!.svn ..\SMMP_Core_DEV.pk3 .\

pause
goto MENU

:DEVEXTRAS
echo Compiling SMMP Development Extras Module...
del SMMP_MapsAndExtras_DEV.pk3
move /Y .\pk3_extras\Maps\*.backup* .\backups >nul 2>&1
move /Y .\pk3_extras\Maps\*.dbs .\backups >nul 2>&1
move /Y .\pk3_extras\Maps\*.bak .\backups >nul 2>&1

cd pk3_extras
..\Tools\7za a -y -tzip -mx=0 -mmt -x!.svn ..\SMMP_MapsAndExtras_DEV.pk3 .\

pause
goto MENU

:SVNCOREFULL
echo Compiling SMMP SVN Core Module Rev#: %REVISIONNUMBER% (Full Compression)...
del SMMP_Core_r%REVISIONNUMBER%.pk3

cd pk3
..\Tools\7za a -y -tzip -mx=9 -mmt -x!.svn ..\SMMP_Core_r%REVISIONNUMBER%.pk3 .\

pause
goto MENU

:SVNEXTRASFULL
echo Compiling SMMP SVN Extras Module Rev#: %REVISIONNUMBER% (Full Compression)...
del SMMP_MapsAndExtras_r%REVISIONNUMBER%.pk3
move /Y .\pk3_extras\Maps\*.backup* .\backups >nul 2>&1
move /Y .\pk3_extras\Maps\*.dbs .\backups >nul 2>&1
move /Y .\pk3_extras\Maps\*.bak .\backups >nul 2>&1

cd pk3_extras
..\Tools\7za a -y -tzip -mx=9 -mmt -x!.svn ..\SMMP_MapsAndExtras_r%REVISIONNUMBER%.pk3 .\

pause
goto MENU

:SVNCOREQUICK
echo Compiling SMMP SVN Core Module Rev#: %REVISIONNUMBER% (No Compression)...
del SMMP_Core_r%REVISIONNUMBER%.pk3

cd pk3
..\Tools\7za a -y -tzip -mx=0 -mmt -x!.svn ..\SMMP_Core_r%REVISIONNUMBER%.pk3 .\

pause
goto MENU

:SVNEXTRASQUICK
echo Compiling SMMP SVN Extras Module Rev#: %REVISIONNUMBER% (No Compression)...
del SMMP_MapsAndExtras_r%REVISIONNUMBER%.pk3
move /Y .\pk3_extras\Maps\*.backup* .\backups >nul 2>&1
move /Y .\pk3_extras\Maps\*.dbs .\backups >nul 2>&1
move /Y .\pk3_extras\Maps\*.bak .\backups >nul 2>&1

cd pk3_extras
..\Tools\7za a -y -tzip -mx=0 -mmt -x!.svn ..\SMMP_MapsAndExtras_r%REVISIONNUMBER%.pk3 .\

pause
goto MENU

:LEAVE
echo.
echo Thanks for trying SMMP! - Jordon Moss (aka. Striker The Hedgefox)
echo Found any bugs? E-Mail me at mossj32@gmail.com