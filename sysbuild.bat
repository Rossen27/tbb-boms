@echo off

:: 本機測試

for /f "tokens=2 delims==" %%I in ('wmic os get localdatetime /value') do set "timestamp=%%I"
set "timestamp=%timestamp:~0,4%%timestamp:~4,2%%timestamp:~6,2%%timestamp:~8,2%%timestamp:~10,2%%timestamp:~12,2%"

echo Running BSOMS Frontend Building...

:: 安裝專案套件
call npm install --legacy-peer-deps > npm_install_output_%timestamp%.txt 2>&1
echo npm install
move npm_install_output_%timestamp%.txt C:\Users\ASUS\Desktop\Shani\TBB\tbb-boms\logs
echo Finish install

:: 根據環境不同進行打包前端程式碼
:: for Syspower UAT

if "%1%" == "dev20" (
    echo Building for syspower20 development
    call npm start > npm_start_output_%timestamp%.txt 2>&1
	echo Start building
) else (
    ::環境參數錯誤
    echo Error: The first command line argument does not exist.
    echo Entering command again.
    pause
    exit /b 1
)

echo Finish building

:: Output文件若有successfully，設定errorlevel=0
findstr /C:"successfully" npm_start_output_%timestamp%.txt > nul
set findstr_result=%errorlevel%
echo result code  %findstr_result%
:: errorlevel 等於0 Build成功   
if %findstr_result% equ 0 (
    echo Build succeeded.
    type npm_start_output_%timestamp%.txt
	:: 移動檔案到指定文件夾  
    move npm_start_output_%timestamp%.txt C:\Users\ASUS\Desktop\Shani\TBB\tbb-boms\logs
	echo Frontend Build Complete.
) else (
    type npm_start_output_%timestamp%.txt
	:: 移動檔案到指定文件夾  
    move npm_start_output_%timestamp%.txt C:\Users\ASUS\Desktop\Shani\TBB\tbb-boms\logs
	echo Frontend Build Failed.
    pause
)


timeout /t 5 /nobreak


