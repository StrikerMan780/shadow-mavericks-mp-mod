@echo off
setlocal
setlocal EnableDelayedExpansion
SET PATH=%PATH%;%~dp0\Tools;%~dp0\Tools\ACC;%~dp0\Tools\GDCC

cd pk3
cd ACS
del compile_log.log
for %%f in (*.acs) do (
	echo %%~nf
	acc.exe "%%~nf.acs" "%%~nf.o" 1>> compile_log.log 2>&1
)
echo Compiling ACSX Scripts...
for %%f in (*.acsx) do (
	echo %%~nf
	gdcc-acc.exe "%%~nf.acsx" "%%~nf.o" 1>> compile_log.log 2>&1
)
pause
goto MENU