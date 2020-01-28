call pack.bat

dotnet nuget push *.nupkg -s https://api.nuget.org/v3/index.json

del *.nupkg