import { spawn } from 'child_process';
import path from 'path';

// 启动 nodemon 进程
const child = spawn('ts-node', ['--inspect', path.resolve(__dirname, 'index.ts')], {
  stdio: 'inherit',
  shell: true,
  env: {
    PORT: 8080,
    HTTPS: true,
    MYSQL_USERNAME: 'root',
    MYSQL_PASSWORD: 'x372208219y'
  }
});

child.on('close', (code) => {
  console.log(`Nodemon process exited with code ${code}`);
});

child.on('error', (err) => {
  console.error(`Failed to start process: ${err}`);
});