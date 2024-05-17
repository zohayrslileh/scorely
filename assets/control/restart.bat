@echo off
call cd ../..
call npx pm2 kill
call npx pm2 start index.js