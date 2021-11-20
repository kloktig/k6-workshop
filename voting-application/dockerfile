# https://hub.docker.com/_/microsoft-dotnet
FROM mcr.microsoft.com/dotnet/sdk:6.0-focal as build

# copy everything else and build app
COPY . /.
RUN dotnet publish -c release -o /app -r linux-x64 --self-contained true

# final stage/image
FROM mcr.microsoft.com/dotnet/runtime-deps:6.0-focal-amd64
COPY --from=build /app ./

EXPOSE 80
EXPOSE 7240
EXPOSE 5135

ENTRYPOINT ["./vote"]