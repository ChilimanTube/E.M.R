cd C:\Users\Vojtěch\Desktop\Own Projects\E.M.R\E.M.R\apps\web\emr

REM Run cloc and capture the exit code
FOR /F "tokens=*" %i IN ('cloc src 2^&1') DO (
  IF %i EQUALS 1 (
    ECHO An error occurred while running cloc. (code: %i)
  ) ELSE (
    ECHO cloc execution successful. Output: %i
  )
)