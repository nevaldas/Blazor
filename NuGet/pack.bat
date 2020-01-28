cd ../Build

call build.cmd

cd ../NuGet

del *.nupkg

dotnet pack ../src/NEvaldas.Blazor.Select2/NEvaldas.Blazor.Select2.csproj -o . -c Release