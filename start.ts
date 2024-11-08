const { spawn } = require('child_process');
const path = require('path');

// 启动 nodemon 进程
const child = spawn('node', ['--inspect', path.resolve(__dirname, 'index.js')], {
  stdio: 'inherit',
  shell: true,
  env: {
    PORT: 8080,
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