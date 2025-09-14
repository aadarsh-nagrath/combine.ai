#!/usr/bin/env node

const { spawn } = require('child_process');
const path = require('path');

console.log('🚀 Starting AI Desktop Wrapper development server...\n');

// Start Vite dev server
const vite = spawn('npm', ['run', 'dev:renderer'], {
  stdio: 'inherit',
  shell: true
});

// Wait for Vite to start, then start Electron
setTimeout(() => {
  console.log('\n⚡ Starting Electron...\n');
  
  const electron = spawn('npx', ['electron', '.'], {
    stdio: 'inherit',
    shell: true,
    env: {
      ...process.env,
      NODE_ENV: 'development'
    }
  });

  electron.on('close', (code) => {
    console.log(`\n📱 Electron process exited with code ${code}`);
    vite.kill();
    process.exit(code);
  });

  vite.on('close', (code) => {
    console.log(`\n🌐 Vite process exited with code ${code}`);
    electron.kill();
    process.exit(code);
  });

}, 3000);

// Handle process termination
process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down development server...');
  vite.kill();
  process.exit(0);
});
