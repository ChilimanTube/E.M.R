cd /d "%~dp0..\..\..\apps\web\emr"

REM Run cloc and capture the exit code
FOR /F "tokens=*" %%i IN ('cloc src 2^>^&1') DO (
    IF %%i EQU 1 (
        ECHO An error occurred while running cloc. (code: %%i)
    ) ELSE (
        ECHO cloc execution successful. Output: %%i
    )
)
